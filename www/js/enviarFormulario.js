$(function(){
    $("#formuploadajax").on("submit", function(e){
        e.preventDefault();
        var f = $(this);
        var formData = new FormData(document.getElementById("formuploadajax"));
        $("#msg_res").css("color", 'blue').html("Subiendo el archivo.").enhanceWithin();
        formData.append("dato", "valor");
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
            var colorMsj = resObject.subida.subido ? "green" : "red";
            console.log(resObject.subida.msj);
            $("#msg_res").css("color", colorMsj).html(resObject.subida.msj).enhanceWithin();
        }).fail(function(err){
            $("#msg_res").css("color", 'red').html("Error en la conexión con el servidor.").enhanceWithin();
            console.log(resObject.subida.msj);
        });
    });
});
    
$(document).ready(function(){
    
    $("#id_google").val(JSON.parse(sessionStorage.usuarioGoogle).userId);
    
    if(sessionStorage.result) {
        var obj = JSON.parse(sessionStorage.result);
        $("#id_qr").attr("value", obj.id);
        var listaContenido = "<li class='ui-li-static ui-body-inherit ui-first-child'>fecha: " + obj.fecha_validacion + "</li>" + 
                             "<li class='ui-li-static ui-body-inherit'>tipo: " + obj.tipocontenido + "</li>" +
                             "<li class='ui-li-static ui-body-inherit'>localizaci&oacute;n: " + obj.descripcionlocalizacion + "</li>" +
                             "<li class='ui-li-static ui-body-inherit ui-last-child'><a  data-ajax='false' id='ext-link' href='#'>"+ obj.enlacecontenido.split('/')[obj.enlacecontenido.split('/').length - 1] +"</a></li>"; 
        $("#lista-contenido").html(listaContenido).enhanceWithin();
        $("#ext-link").on("click", function() {
            openFile(servidorPHP + obj.enlacecontenido);
        });
    }
    function openFile(file) {
        cordova.InAppBrowser.open(file, '_system', 'location=yes');
    }
    
    $('input[type="radio"]').on('change', function(){
        if($(this).attr("id") == 'radio_voz')
            $("#audioCapture").show(400);
        else 
            $("#audioCapture").hide(400);
        
    });
    $("#audioCapture").click(function(e){
        e.preventDefault();
        audioCapture();
    });
    
    
    function audioCapture() {
        var options = {
            limit: 1
        };
        navigator.device.capture.captureAudio(onSuccess, onError, options);
    
        function onSuccess(mediaFiles) {
            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i ++)
                path = mediaFiles[i].fullPath;
            createF(mediaFiles[0].localURL, mediaFiles[0].name);
        }
    
        function onError(error) {
            console.log('Error code: ' + error.code, null, 'Capture Error');
            $("#msg_res").css("color", 'red').html("Error en la captura del audio.").enhanceWithin();
        }
    	
    }
    
    function createF(_fileToMove, _name) {
        var rfsu = window.resolveLocalFileSystemURL
        rfsu(cordova.file.externalRootDirectory, function(fileSystem) {
            fileSystem.getDirectory("Records", {create: true, exclusive: false},
                function(destination) {
                    rfsu(_fileToMove, function(file) {
                        file.moveTo(destination,_name);
                        $("#msg_res").css("color", 'blue').html("Tu audio ha sido guardado en la carpeta Records de la tarjeta SD.").enhanceWithin();   
                    },fail);
            }, fail);
        }, fail);
        var fail = function(err) {
            console.log(err);
            $("#msg_res").css("color", 'red').html("Error en el guardado en la tarjeta SD. " + JSON.stringify(err)).enhanceWithin(); 
        }
    }

    
});