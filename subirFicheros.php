<?php


function insertarObjetoCulturaNoValidado($_idObj, $_enlace, $_tipo, $_usuario) {
    include('conection.php');
    
    $sql = "INSERT INTO `objetocultura`(`enlacecontenido`, `tipocontenido`, `id_usuario`, `qr_asociado`) VALUES ('". $_enlace ."','".$_tipo."','".$_usuario."',".$_idObj.");";
    $result = $enlace->query($sql);
    if(!$result){
      die('There was an error running the query [' . $enlace->error . ']');
    }
    mysqli_close($enlace);

}
$usuario = $_POST['usuario'];
$id = $_POST['id'];
$tipo = $_POST['tipoSubida'];
if($tipo == 'txt') {
    $subDir = 'txt/';
    $tipoContBD = "texto";
} else if($tipo == 'pdf') {
    $subDir = 'pdf/';
    $tipoContBD = "archivo";
} else if($tipo == 'voz') {
    $subDir = 'voz/';
    $tipoContBD = "audio";
} else {
    $subDir = 'foto/';
    $tipoContBD = "imagen";
}

$dir_subida = './uploads/' . $subDir;
$fichero_subido = $dir_subida . basename($_FILES['file']['name']);

$dirBD = '/uploads/' . $subDir . basename($_FILES['file']['name']);

$allowedIMG =  array('gif','png' ,'jpg');
$allowedVoz =  array('wav','mp3', 'amr');
$txt = 'txt';
$pdf = 'pdf';
$respuesta = array(
  'subida' => array(
    'subido' => false,
    'msj' => "default"
  )
);

$filename = $_FILES['file']['name'];


$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));



if(!in_array($ext,$allowedIMG) && !in_array($ext,$allowedVoz) && ($ext != $pdf) && ($ext != $txt) ) { 
        $respuesta["subida"]["subido"] = false;
        $respuesta["subida"]["msj"] = "Extensión " . $ext . " no válida";
} else {
    if((($tipo == 'pdf') && ($ext != $pdf)) || (($tipo == 'txt') && ($ext != $txt)) || (($tipo == 'voz') && !in_array($ext,$allowedVoz)) || (($tipo == 'foto') && !in_array($ext,$allowedIMG))) {
        $respuesta["subida"]["subido"] = false;
        $respuesta["subida"]["msj"] = "El tipo de archivo marcado es " . $tipo . " y la extensi&oacute;n del archivo es " . $ext . " no coinciden coherentemente";
    } else  {
        if (move_uploaded_file($_FILES['file']['tmp_name'], $fichero_subido)) {
            $respuesta["subida"]["subido"] = true;
            $respuesta["subida"]["msj"] = $filename . " subido con éxito.";
            // $respuesta["subida"]["msj"] = 
            insertarObjetoCulturaNoValidado($id, $dirBD, $tipoContBD, $usuario);
        } else {
            $respuesta["subida"]["subido"] = false;
            $respuesta["subida"]["msj"] = "¡Posible ataque de subida de ficheros!";
        }
    }
    
}


echo json_encode($respuesta);

?>

