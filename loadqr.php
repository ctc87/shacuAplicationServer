<?php
    $qr_id = $_GET["id"];   //www.shacu.com/loadqr.php?id=qr01af2
    
    // Conectar a MySQL
    $enlace = mysqli_connect("127.0.0.1", "root", "", "shacu");

    if (!$enlace) {
        echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
        echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
        echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
    
    // Si todo fue bien, recuperar la informacion de la BDD de ese QR.
    $sql = "SELECT longitud, latitud, enlacecontenido, tipocontenido, id_usuario FROM puntoqr, objetocultura WHERE puntoqr.enlaceweb = '$qr_id' AND objetocultura.id = puntoqr.id_objetocultura";
    $result = $enlace->query($sql);
    
    if(!$result){
         die('There was an error running the query [' . $enlace->error . ']');
    }
    
    // Si se pudo procesar la consulta, codificarla en formato JSON
    // Sabemos que solo va a devolver 1 única fila, así que el "if" es suficiente.
    if($row = $result->fetch_assoc()){
        echo json_encode($row);
    }
    
    mysqli_close($enlace);
?>