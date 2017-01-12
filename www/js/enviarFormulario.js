$(function(){
        $("#formuploadajax").on("submit", function(e){
            e.preventDefault();
            var f = $(this);
            var formData = new FormData(document.getElementById("formuploadajax"));
            formData.append("dato", "valor");
            //formData.append(f.attr("name"), $(this)[0].files[0]);
            $.ajax({
                url: "https://servidorshacu-alu0100886870.c9users.io/subirFicheros.php",
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
	            processData: false
            })
                .done(function(res){
                    var resObject = JSON.parse(res)
                    console.log();
                    var colorMsj = resObject.subida.subido ? "green" : "red";
                    $("#msg_res").css("color", colorMsj).html(resObject.subida.msj);
                });
        });
    });
    
$(document).ready(function(){
    if(sessionStorage.result) {
        var obj = JSON.parse(sessionStorage.result);
        var listaContenido = "<li class='ui-li-static ui-body-inherit ui-first-child'>fecha: " + obj.fecha_validacion + "</li>" + 
                             "<li class='ui-li-static ui-body-inherit'>tipo: " + obj.tipocontenido + "</li>" +
                             "<li class='ui-li-static ui-body-inherit'>localizaci&oacute;n: " + obj.descripcionlocalizacion + "</li>" +
                             "<li class='ui-li-static ui-body-inherit ui-last-child'><a  data-ajax='false' id='ext-link' href='" + servidorPHP + obj.enlacecontenido + "' download='des' target='_blank'>Visualizar</a></li>"; 
        $("#lista-contenido").html(listaContenido);
        
        $("#ext-link").on("click", function() {
            // window.open(servidorPHP + obj.enlacecontenido, "_blank", 'location=yes');
            downloadFile(servidorPHP + obj.enlacecontenido);
        });
    }
    
    function onFileSystemSuccess(fileSystem) {
        console.log(fileSystem.name);
        console.log(JSON.stringify(fileSystem.root));
    }

    function fail(error) {
        console.log(error.code);
    }
    
    function downloadFile(file) {
     
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        
      var fileTransfer = new FileTransfer();
      var uri = encodeURI('https://www.tutorialspoint.com/cordova/images/cordova-file-transfer-download.jpg');
      var fileURL =  fileSystem.root.toURL() + 'archivo.jpg';
      
      fileTransfer.download(
          uri, fileURL, function(entry) {
             console.log("download complete: " + entry.toURL());
          },
    		
          function(error) {
             console.log("download error source " + error.source);
             console.log("download error target " + error.target);
             console.log("download error code " + error.code);
             console.log(JSON.stringify(error));
          },
    		
          false, {
             headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
             }
          }
        );
        
        }, fail);
}
    
});