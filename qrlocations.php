<?php
    //$qr_id = $_GET["id"];   //www.shacu.com/loadqr.php?id=qr01af2
    
    // Conectar a MySQL
    $enlace = mysqli_connect("127.0.0.1", "root", "", "shacu");

    if (!$enlace) {
        echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
        echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
        echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
    
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