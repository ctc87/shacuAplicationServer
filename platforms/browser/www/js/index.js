var app = {
    // Application Constructor
    initialize: function() {
        console.log("init");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        console.log("bind");
        // navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        // console.log(this.onDeviceReady)
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    // app.receivedEvent('deviceready');
        console.log("ready");
        this.onSuccess();
        app.onSuccess();
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },

    onSuccess: function(position){
       
            var cordenatesArray = JSON.parse(sessionStorage.getItem("cordinates")); 
            var informationArray = JSON.parse(sessionStorage.getItem("contentType"));
            var descriptinArray = JSON.parse(sessionStorage.getItem("description"));
            var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: {lat:  position.coords.latitude, lng: position.coords.longitude},
        });
        
         var markerr = new google.maps.Marker({
              position: {lat:  position.coords.latitude, lng: position.coords.longitude},
              map: map,
              title: 'my location'
          });
        
            google.maps.event.trigger(map, 'resize');
        
        for(var i = 0; i < cordenatesArray.length; i++) {
            
            var content = 
              '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">Punto '  + (i+1) + '</h1>'+
              '<div id="bodyContent">'+
              '<p><b>Punto '  + (i+1) + ': </b><br/>'+
              'Situaci&oacute;n : ' +  descriptinArray[i] +
              '<br/>Tiene un contenido del tipo: ' + informationArray[i] +
              '</div>'+
              '</div>'
            ;
    
            var marker = new google.maps.Marker({
              position: cordenatesArray[i],
              map: map,
              title: 'Punto '  + (i+1),
              clickable: true
            });
            
    
            var infowindow = new google.maps.InfoWindow();           
            
            google.maps.event.addListener(
                marker,
                'click', 
                (function(marker,content,infowindow){ 
                    return function() {
                        infowindow.setContent(content);
                        infowindow.open(map,marker);
                    };
                })(marker,content,infowindow)
            ); 
            
   
            
            }  
            
        
        google.maps.event.trigger(map, 'resize');
    },
    
    onError: function(error){
        console.log("fail");
        console.error("the code is " + error.code + ". \n" + "message: " + error.message);
    }
};

app.initialize();