<?php
/** Devuelve verdadero si el contenido pasado como id supero el $LIMITE_CADUCIDAD fijado **/
    function caducadoContendio($id) {
        $caducado = false;
        $LIMITE_CADUCIDAD = 10; // en dias
        
        // Conectar y recuperar la fecha de validación del contenido pasado por parametro.
        include('conection.php');
        $sql = "SELECT `fecha_validacion` FROM `objetocultura` WHERE id = " . $id . ";";
        $result = $enlace->query($sql);
        
        if(!$result){
           die('There was an error running the query [' . $enlace->error . ']');
        }
        
        $fecha = array();
        while($row = $result->fetch_assoc()){
          $fecha[] = $row;
        }
        
        // Recuperar la fecha actual y hacer la diferencia
        $datetime1 = new DateTime(date("Y-m-d H:i:s"));
        $datetime2 = new DateTime($fecha[0][fecha_validacion]);
        
        $interval = $datetime2->diff($datetime1);
        $diferencia =  intval($interval->format('%R%a'));
        if($diferencia >= $LIMITE_CADUCIDAD)
            $caducado = true;
        mysqli_close($enlace);
        
        return $caducado;
    }
    
    /**
     * Comprobar el contenido asociado al QR indicado por parametro. Si tiene
     * contenido pendiente de validar entonces devolverá true.
    */

    function hayContendioAsociadoQRValidar($id) {
        $hayContendioParaValidar = false;
        include('conection.php');
        $sql = "SELECT * FROM `objetocultura` inner join `puntoqr` on objetocultura.qr_asociado = puntoqr.id WHERE objetocultura.fecha_validacion is NULL and puntoqr.id = ". $id .";";
        $result = $enlace->query($sql);
        
        if(!$result){
           die('There was an error running the query [' . $enlace->error . ']');
        }
        
        $contenido = array();
        while($row = $result->fetch_assoc()){
          $contenido[] = $row;
        }
        
        if(count($contenido) > 0)
            $hayContendioParaValidar = true;
        mysqli_close($enlace);
        return $hayContendioParaValidar;
    }
    
    
/** Cambia el contenido asociado aun QR */
    function cambiarContenidoAsociadoQR($idQr, $idContnidoAsociado) {
        $return = true;
        include('conection.php');
        $sql = "UPDATE  `puntoqr` SET  `id_objetocultura` = ". $idContnidoAsociado ." WHERE  `id` = ". $idQr .";";
        $result = $enlace->query($sql);
        if(!$result){
          $return = false;
        }
        mysqli_close($enlace);
        return $return;
    }
    
/** Devuelve todos los contenidos de un usuario */
    function contenidosUsuario($_id) {
        include('conection.php');
        $sql = "SELECT `fecha_validacion`, `tipocontenido`, `descripcionlocalizacion`, `enlacecontenido`, objetocultura.id  FROM `objetocultura` INNER JOIN `puntoqr` on objetocultura.`qr_asociado` = puntoqr.`id` WHERE `id_usuario` = ".$_id.";";
        $result = $enlace->query($sql);
        if(!$result){
             die('There was an error running the query [' . $enlace->error . ']');
        }
        $_estado = new stdClass();
        $contenidos = array();
        while($row = $result->fetch_assoc()){
            $row['estado'] = estadoDelContendio($row['id']);
            $contenidos[] = $row;
        }
        mysqli_close($enlace);
        print json_encode($contenidos);
    }
    
 /** Devuelve verdadreo o falso si el contenido está activo o no */   
function estaActivo($_id) {
    $estaActivo = false;
    include('conection.php');
    $sql = "SELECT * FROM `puntoqr` WHERE id_objetocultura = ". $_id .";";
    $result = $enlace->query($sql);
    
    if(!$result){
       die('There was an error running the query [' . $enlace->error . ']');
    }
    
    $contenido = array();
    while($row = $result->fetch_assoc()){
      $contenido[] = $row;
    }
    
    if(count($contenido) > 0)
        $estaActivo = true;
    mysqli_close($enlace);
    return $estaActivo;
}

 /** Devuelve verdadreo o falso si el contenido está activo o no */   
function estaPendienteDeValidar($_id) {
    $estaPendienteDeValidar = false;
    include('conection.php');
    $sql = "SELECT * FROM `objetocultura` WHERE objetocultura.fecha_validacion is NULL and objetocultura.id = ". $_id .";";

    $result = $enlace->query($sql);
    
    if(!$result){
       die('There was an error running the query [' . $enlace->error . ']');
    }
    
    $contenido = array();
    while($row = $result->fetch_assoc()){
      $contenido[] = $row;
    }
    
    if(count($contenido) > 0)
        $estaPendienteDeValidar = true;
    mysqli_close($enlace);
    return $estaPendienteDeValidar;
}


/** Devuelve el estado del contendio */
function estadoDelContendio($_id) {
    $_caducado = caducadoContendio($_id);
    $_estado = new stdClass();
    $_activo = estaActivo($_id);
    if(estaPendienteDeValidar($_id)) {
        $_estado -> caducado = false;
        $_estado -> activo = false;
        $_estado -> pendiente = true;
        $_estado -> texto = "<span id='cad' style='color:orange'>Pendiente de validar</span>";
    } else {
        if($_caducado && $_activo) {
            $_estado -> caducado = true;
            $_estado -> activo = true;
            $_estado -> pendiente = false;
            $_estado -> texto = "<span id='cad' style='color:red'>Caducado</span> pero sigue <span id='activo' style='color:green'>activo</span>";
        } else if ($_caducado && !$_activo) {
            $_estado -> caducado = true;
            $_estado -> activo = false;
            $_estado -> pendiente = false;
            $_estado -> texto = "<span id='cad' style='color:red'>Caducado</span> y ya <span id='activo' style='color:red'>no est&aacute; activo</span>";
        } else if(!$_caducado && $_activo) {
            $_estado -> caducado = false;
            $_estado -> activo = true;
            $_estado -> pendiente = false;
            $_estado -> texto = "<span id='cad' style='color:green'>No Caducado</span> el contenido est&aacute; <span id='activo' style='color:green'>activo</span>";
        }
    
    }

    return $_estado;
    
}

?>