
/** Actua como base para las páginas que vayan a usar el mismo tipo de estructuras. */

/** constante con la dirección del servidor */ 

var servidorPHP = 'http://www.shacu.tk/'
//var servidorPHP = 'https://servidorshacu-alu0100886870.c9users.io'

/** Esta funcion crea un header superior fijo, con menú */
function buildBaseHeader(title) {
     var page = document.querySelectorAll("[data-role=\"page\"]");
     var imgLogin = sessionStorage.usuarioGoogle ? JSON.parse(sessionStorage.usuarioGoogle).imageUrl : "icon.png"
        '<a class="icono-cabecera-link" data-role="button" href="#" data-corners="false" data-shadow="false" data-theme="none">' +
        '<img src="'+ "icon.png" +'" border="0" class="icono-cabecera"> </a>';
     page[0].innerHTML = 
        '<div data-role=\"header\" class=\"header\" data-position=\"fixed\" role=\"banner\">' +
        '<h1 id=\"customTitle\">' + title + '</h1>' + 
        '<a href=\"#nav-panel\" data-icon=\"bars\" data-iconpos=\"notext\">Menu</a>' +
        '<a class="icono-cabecera-link" data-role="button" href="usuario.html" data-ajax="false" data-corners="false" data-shadow="false" data-theme="none">' +
        '<img src="'+ imgLogin + '" border="0" class="icono-cabecera"> </a>' +
        '</div>' +
        page[0].innerHTML;
}

/** crea el menu lateral de navegación */
function buildNavPanel() {
     var page = document.querySelectorAll("[data-role=\"page\"]");
     page[0].innerHTML = page[0].innerHTML + 
     '\
      <div data-role="panel" data-position-fixed="true" data-display="push" data-theme="a" id="nav-panel"> \
        <ul data-role="listview"> \
            <li data-icon="delete"><a href="#" data-rel="close">Cerrar</a></li> \
            <li><a href="index.html" data-ajax="false">Inicio</a></li> \
            <li><a href="usuario.html" data-ajax="false">Informaci&oacute;n de usuario</a></li> \
            <li><a href="details.html" data-ajax="false">Detalles y especificaciones</a></li> \
            <li><a href="map.html" data-ajax="false"  id="map-button">Ver QR\'s en el mapa</a></li> \
            <li><a href="#" id="pag-prin-link">Página de ShaCu</a></li> \
            <li><a href="terms.html" data-ajax="false">Términos y Condiciones</a></li> \
        </ul> \
    </div> \
    ';
    
     /** abre la página del producto en el servidor php */
     $("#pag-prin-link").on("click", function(e) {
        e.preventDefault();
        cordova.InAppBrowser.open(servidorPHP, '_system', 'location=yes');
     });
     
}
          //   <li><a href="index.html" data-ajax="false">Contenido subido</a></li> \
          //   <li><a href="index.html" data-ajax="false">Contenido descargado</a></li> \
          //   <li><a href="subirContenido.html" data-ajax="false">Contenido Leido(cad)</a></li> \
          //   <li><a href="visulizarContenido.html" data-ajax="false">Contenido Leido(Nocad)</a></li> \
