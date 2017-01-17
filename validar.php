<?php 
    /**
     * Validar el contenido que alguien haya subido a un punto QR.
    */
    
    include('funcions.php');
    $id_contendio = $_GET["id_contenido"];
    $id_qr = $_GET["id_qr"];
    include("conection.php");
    $sql = "UPDATE `objetocultura` SET `fecha_validacion`= '" . date("Y-m-d H:i:s") . "' WHERE id=" . $id_contendio;
    $result = $enlace->query($sql);
    if(!$result){
         die('There was an error running the query [' . $enlace->error . ']');
        echo "<h1 style='color:red'>ERROR en la validaci&oactue;n del contenido con id:" . $id_contendio . " </h1>";  
         
    } else {
        cambiarContenidoAsociadoQR($id_qr, $id_contendio);
        echo "<h1 style='color:green'>VALIDADO el contenido con id:" . $id_contendio . " </h1>";   
    }
    mysqli_close($enlace);
?>
<script>
    setTimeout(function(){
            window.location.href = "./listadoParaValidar.php";
        }, 1000)
</script>

