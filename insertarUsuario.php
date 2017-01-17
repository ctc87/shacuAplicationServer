<?php

function existeUsuario($_idusu) {
    $existe = false;
    include('conection.php');
    $sql = "SELECT `idgoogle` FROM `usuario` WHERE `idgoogle` = '".$_idusu."';";
    $result = $enlace->query($sql);
    if(!$result){
      die('There was an error running the query [' . $enlace->error . ']');
    }
    $contenido = array();
    while($row = $result->fetch_assoc()){
      $contenido[] = $row;
    }
    if(count($contenido) > 0)
        $existe = true;
    mysqli_close($enlace);
    return $existe;
}

function insertarUsuario($_nombre, $_mail, $_usuarioID) {
    include('conection.php');
    $sql = "INSERT INTO `usuario`(`nombre`, `idgoogle`, `email`) VALUES ('". $_nombre ."','".$_usuarioID."','".$_mail."');";
    $result = $enlace->query($sql);
    if(!$result){
      die('There was an error running the query [' . $enlace->error . ']');
    }
    mysqli_close($enlace);
}



$user = json_decode($_POST["data"]);
if(!existeUsuario($user->id)) {
    insertarUsuario($user->usuario, $user->mail, $user->id);
    echo "insertado";
} else {
    echo "ya existeUsuario";   
}


?>