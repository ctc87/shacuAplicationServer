<html>
    <head>
        <?php include("cabeceras.php"); ?>
    </head>
    <body>
        <?php include("navBar.php"); ?>
        <?php 
          include('conection.php');
          $sql = "SELECT objetocultura.`id`, objetocultura.`qr_asociado`, objetocultura.`fecha_validacion` , objetocultura.`enlacecontenido` , objetocultura.`tipocontenido` , usuario.nombre, puntoqr.descripcionlocalizacion
                  FROM  `puntoqr` 
                  INNER JOIN  `objetocultura` ON puntoqr.id = objetocultura.qr_asociado
                  INNER JOIN  `usuario` ON usuario.idgoogle = objetocultura.id_usuario
                  WHERE fecha_validacion IS NULL";
                  
          $result = $enlace->query($sql);
          
          if(!$result){
               die('There was an error running the query [' . $enlace->error . ']');
          }
          
          $noValidados = array();
          while($row = $result->fetch_assoc()){
              $noValidados[] = $row;
          }
          
          mysqli_close($enlace);
       
        ?>
        <div class="container">
          <div class="row">
              <table class="table table-sm table-inverse">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>QR</th>
                      <th>Localizai&oacute;n QR</th>
                      <th>Usuario</th>
                      <th>Ruta contenido</th>
                      <th>Tipo contenido</th>
                      <th>Validar Contenido</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                      foreach ($noValidados as $row) {
                        echo "<tr>";
                        echo "<th scope='row'>" . $row["id"] . "</th>";
                        echo "<td>" . $row["qr_asociado"] . "</td>";
                        echo "<td>" . $row["descripcionlocalizacion"] . "</td>";
                        echo "<td>" . $row["nombre"] . "</td>";
                        echo "<td><a href='". $row["enlacecontenido"] ."' target='_blank'>" . $row["enlacecontenido"] . "</a></td>";
                        echo "<td>" . $row["tipocontenido"] . "</td>";
                        echo "<td>";
                        echo '<a href="./validar.php?id_contenido=' . $row["id"] . '&id_qr='.$row["qr_asociado"].'" class="btn btn-success btn-lg">';
                        echo '<span class="glyphicon glyphicon-ok-circle"></span> Validate ';
                        echo "</td>";
                        echo "</tr>";
                      }
                    ?>
                  </tbody>
                </table>
          </div>
        </div>
    </body>
</html>


