var appUsuario = {
    // Objeto del usuario 
    usuario:{},
    // objet para contenido del usuario
    contenido:{},
    // Inicialización
    start: function(){
        this.usuario = JSON.parse(sessionStorage.usuarioGoogle);
        // alert('El usuario:' + JSON.stringify(this.usuario));
        this.cargarInofrmacionDeUsuario();
        this.obtenerContenidosUsuario();
    },
    // Carga la inofrmación del usuario en la página
    cargarInofrmacionDeUsuario : function(){
        var informacionHTML = 
            this.enlistarConctenido("Email: " + this.usuario.email) + 
            this.enlistarConctenido("Nombre: " + this.usuario.displayName) + 
            this.enlistarConctenido("Id: " + this.usuario.userId)
        ;
        // alert("el HTML = " + informacionHTML);
        $("#lista-usuario-inofrmacion").html(informacionHTML).enhanceWithin();;
    },
    cargarContenidos : function(array) {
        var size = array.length;
        var information_HTML = "";
        for (var i = 0; i < size; i++) {
            information_HTML += appUsuario.crearListaContenido(array[i]);
        }
        $("#div-contenidos").html(information_HTML).enhanceWithin();
        
        $(".ext-link").click(function(e){
            e.preventDefault();
            var link = $(this).attr("data-to-open")
            // alert("data to open: " + link);
            appUsuario.openFile(servidorPHP + "" + "" + link);    
        });
    },
    enlistarConctenido: function(_contendio) {
        return "<li class='ui-li-static ui-body-inherit'>" + _contendio + '</li>'
    },
    obtenerContenidosUsuario : function(){
        var AjaxURL = servidorPHP + "/contenidosDelUsuario.php";
        $.ajax({
            type: "POST",
            url: AjaxURL,
            data: {usuario:appUsuario.usuario.userId},
            success: function(result) {
                appUsuario.contenido = JSON.parse(result);
                // alert(result);
                appUsuario.cargarContenidos(appUsuario.contenido);
            }
        });   
    },
    crearListaContenido : function(obj) {
        return '<div class="contenido">' +
            '<div data-role="collapsible" data-collapsed-icon="eye" data-expanded-icon="minus">' +
                '<h4>Visualizar contenido</h4>' +
                '<ul data-role="listview" data-inset="false" id="lista-contenido">' +
                         appUsuario.crearListaItems(obj) +
                '</ul>' +
            '</div>' +
        '</div>';   
    },
    crearListaItems : function(obj) {
        return "<li class='ui-li-static ui-body-inherit ui-first-child'>estado: " + obj.estado.texto + "</li>" + 
                             "<li class='ui-li-static ui-body-inherit'>tipo: " + obj.tipocontenido + "</li>" +
                             "<li class='ui-li-static ui-body-inherit'>localizaci&oacute;n: " + obj.descripcionlocalizacion + "</li>" +
                             "<li class='ui-li-static ui-body-inherit ui-last-child'><a  data-ajax='false' data-to-open='" + obj.enlacecontenido + "' class='ext-link' href='"+obj.enlacecontenido+"'>"+ obj.enlacecontenido.split('/')[obj.enlacecontenido.split('/').length - 1] +"</a></li>"; 
    },
    openFile : function(file) {
        // alert("FILE:" + file);
        cordova.InAppBrowser.open(file, '_system', 'location=yes');
    }
};

$(document).ready(function(){
    appUsuario.start();
});