<?php
    include('conection.php');
    
    // Si todo fue bien, recuperar la informacion de la BDD de ese QR.
    $sql = "SELECT longitud, latitud, enlacecontenido, tipocontenido, id_usuario, descripcionlocalizacion FROM puntoqr, objetocultura WHERE objetocultura.id = puntoqr.id_objetocultura";
    $result = $enlace->query($sql);
    
    if(!$result){
         die('There was an error running the query [' . $enlace->error . ']');
    }
    
    // Si se pudo procesar la consulta, codificarla en formato JSON
    $codigosqr = array();
    while($row = $result->fetch_assoc()){
        $codigosqr[] = $row;
    }
    
    print json_encode($codigosqr);
    
    mysqli_close($enlace);
?>