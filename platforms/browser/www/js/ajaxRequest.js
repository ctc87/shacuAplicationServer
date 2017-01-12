$(document).ready(function(){
    $.ajax({url: "https://servidorshacu-alu0100886870.c9users.io/qrlocationsprueba.php", 
    success: 
        function(result) {
            var object = JSON.parse(result);
            var cordenatesArray = [];
            var contentTypeArray = [];
            var descriptionArray = [];
            for(var i = 0; i < object.length; i++) {
                cordenatesArray[i] = 
                {
                    lat:Number(object[i].latitud), 
                    lng:Number(object[i].longitud)
                };
                contentTypeArray[i] = object[i].tipocontenido;
                descriptionArray[i] = object[i].descripcionlocalizacion;
            }
            sessionStorage.setItem("cordinates", JSON.stringify(cordenatesArray));
            sessionStorage.setItem("contentType", JSON.stringify(contentTypeArray));
            sessionStorage.setItem("description", JSON.stringify(descriptionArray));
        }

    });
});

