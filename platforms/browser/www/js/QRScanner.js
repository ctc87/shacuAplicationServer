$(document).ready(function(){
    $("#QR").on("click", function(){
        scan();    
    });
});
function scan()
    {
            
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if(!result.cancelled) {
                    if(result.format == "QR_CODE") {
                        // sessionStorage.link = result.text;
                        followQR(result.text);
                        // alert(result.text);
                    }
                }
            },
            function (error) {
                console.error("Scanning failed: " + error);
            }
       );
    }

 

function followQR(_url) {
     $.ajax({url: _url, 
        success: 
        function(result) {
            sessionStorage.result = result;
            var object = JSON.parse(result)
            if(!object.caducado) {
             $("#resultado").html(result);
             window.location.href = "./subirContenido.html";  
            } else {
             $("#resultado").html("no caducado");
            }
            //AQUI TENEMOS QUE COMPROBAR SI ESTA CADUCADO O NO DEPNDIENDO DE UNO U OTRO REDIRECIONAMOS A CADUCADO O NO CADUCADO
        }
    });   
}