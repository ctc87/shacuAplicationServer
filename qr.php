<?php
    // Validar ID del QR después de haberlo leido.
    // Verificaremos si está caducado o no (o si hay contenido pendiente de validar)
    // Hacemos esto para saber si se debe mostrar "cambiar contenido" o solo "mostrar"
    
    include("conection.php");
    include("funcions.php");
    $id = $_GET["qr"];
    $sql = "SELECT * FROM `objetocultura` INNER JOIN `puntoqr` on objetocultura.id = puntoqr.id_objetocultura WHERE puntoqr.id = " . $id . ";";
    $result = $enlace->query($sql);
    
    if(!$result){
       die('There was an error running the query [' . $enlace->error . ']');
    }
    
    $info = array();
    while($row = $result->fetch_assoc()){
      $info[] = $row;
    }
    mysqli_close($enlace);
    
    // Deberia ser "NoCaducado" pero tal y como está funciona (es solo error semantico)
    $info[0]["caducado"] = (!caducadoContendio($info[0]["id"]) && !hayContendioAsociadoQRValidar($id));
    echo json_encode($info[0]);
?>