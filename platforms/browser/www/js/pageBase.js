// Actua como base para las páginas que vayan a usar el mismo tipo de estructuras.
var servidorPHP = 'https://servidorshacu-alu0100886870.c9users.io'
// Esta funcion crea un header superior fijo, con menú
function buildBaseHeader(title) {
     var page = document.querySelectorAll("[data-role=\"page\"]");
     // console.log(page);
     page[0].innerHTML = '<div data-role=\"header\" class=\"header\" data-position=\"fixed\" role=\"banner\"><h1 id=\"customTitle\">' + title + '</h1><a href=\"#nav-panel\" data-icon=\"bars\" data-iconpos=\"notext\">Menu</a><a href=\"#add-form\" data-icon=\"gear\" data-iconpos=\"notext\">Add</a></div>' + page[0].innerHTML;
     // console.log("Hola");
}

function buildNavPanel() {
     var page = document.querySelectorAll("[data-role=\"page\"]");
     // console.log(page);
     page[0].innerHTML = page[0].innerHTML + 
     '\
      <div data-role="panel" data-position-fixed="true" data-display="push" data-theme="a" id="nav-panel"> \
        <ul data-role="listview"> \
            <li data-icon="delete"><a href="#" data-rel="close">Cerrar</a></li> \
            <li><a href="index.html" data-ajax="false">Inicio</a></li> \
            <li><a href="details.html" data-ajax="false">Detalles y especificaciones</a></li> \
            <li><a href="map.html" data-ajax="false"  id="map-button">Ver mapa</a></li> \
            <li><a href="accel.html" data-ajax="false">Acelerometro</a></li> \
            <li><a href="barcoder.html" data-ajax="false">QR</a></li> \
            <li><a href="index.html" data-ajax="false">Contenido subido</a></li> \
            <li><a href="index.html" data-ajax="false">Contenido descargado</a></li> \
            <li><a href="index.html" data-ajax="false">Página de ShaCu</a></li> \
            <li><a href="subirContenido.html" data-ajax="false">Contenido Leido(cad)</a></li> \
            <li><a href="index.html" data-ajax="false">Contenido Leido(Nocad)</a></li> \
            <li><a href="terms.html" data-ajax="false">Términos y Condiciones</a></li> \
        </ul> \
    </div> \
    ';
}
