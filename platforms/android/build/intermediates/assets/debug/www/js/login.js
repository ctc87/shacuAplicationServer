var appLogin = {
    // start login
    start: function(){
        console.log("start");
        if(!sessionStorage.usuarioGoogle) {
            this.Silentlogin();
            // alert("no exisiste el usuario en el lolcal storage");   
        } else {
            // alert("exisiste el usuario en el local storage");
        }
    },
    // Application Constructor
    initialize: function() {
        console.log("initialize");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        $(document).ready(function(){
             console.log("events");
            document.addEventListener('deviceready', appLogin.onDeviceReady, false);
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // alert("deviceReady");
        appLogin.start();
    },
    // login Function
    Silentlogin: function() {
        window.plugins.googleplus.trySilentLogin({},appLogin.loginSucces,appLogin.login);
    },
    // login Function
    login: function() {
        window.plugins.googleplus.login({},appLogin.loginSucces,appLogin.logginError);
    },
    // login succes
    loginSucces: function(obj) {
        // alert("logeado success");
        sessionStorage.usuarioGoogle = JSON.stringify(obj);
        appLogin.putPictureOnLogin(obj.imageUrl);  
        appLogin.registerUser(obj.displayName, obj.userId, obj.email);
        // alert("logeado final");
    },
    // login error
    logginError: function(error){
        // alert('Error :'+error);
    },
    putPictureOnLogin : function(img) {
        // alert("se cambia la imagen");  
        var icono = '<img src="'+ img + '" border="0" class="icono-cabecera">';
        $(".icono-cabecera-link").html(icono);
    },
    registerUser : function(_usuario, _id, _mail) {
        // alert("Se registra el usuario  " + _usuario + " " + _id + " " + _mail);
        var object = {usuario : _usuario, id : _id, mail : _mail };
        var AjaxURL = servidorPHP + "/insertarUsuario.php";
        var jsonString = JSON.stringify(object);
        $.ajax({
            type: "POST",
            url: AjaxURL,
            data: {data: jsonString},
            success: function(result) {
                console.log(result);
            }
        });   
    }

};

appLogin.initialize();
