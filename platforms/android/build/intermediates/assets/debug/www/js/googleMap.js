/* 
 * This code creates the map and updates the location dynamically 
 * in addition rotates the icon of the position with the orientation 
 * given by the compass of the device.
 *
*/


// This function initialize map when the device its ready (cordova event)
function deviceReadyBind() {
        console.log("add device")
        document.addEventListener ("deviceready", onDeviceReady, false);
}

// This fuction its called when the device its ready
function onDeviceReady() {
    geolocateUser();
};

// The google mapd API key.
var myKey = "AIzaSyC4N2k6k30wQLebUwzSUQI7mvUxSh93vCA";

// Put the maps script dynamically in the HTML document(called on load event).
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + myKey + "&v=3.exp&callback=deviceReadyBind";
    document.body.appendChild(script);
}

// The circle for the accuracy from positioning.
var circle;
// The marker for location.
var myLocationMarker;
// Boolean variable to check if the map already created
var refresh = true;

  function geolocationSuccess(position) {
    var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if(refresh) {
        refresh = false;
        var myOptions = {
          zoom : 14,
          center : userLatLng,
          mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        // Draw the map
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        // Place the marker
        
            var cordenatesArray = JSON.parse(sessionStorage.getItem("cordinates")); 
            var informationArray = JSON.parse(sessionStorage.getItem("contentType"));
            var descriptinArray = JSON.parse(sessionStorage.getItem("description"));
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
        myLocationMarker = new google.maps.Marker({
            clickable : false,
            icon: {
                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  strokeColor : '#3333FF',
                  strokeWeight : 5,
                  scale: 2.5
                },
            shadow : null,
            zIndex : 999,
            map: map
        });
        
        circle = new google.maps.Circle({
          map: map,
          fillColor: '#0000FF',
          fillOpacity: 0.5,
          strokeColor: '#0000FF',
          strokeOpacity: 1.0
        });
      enableOrientationArrow();
    }
    myLocationMarker.setPosition(userLatLng)
    circle.setCenter(userLatLng);
    circle.setRadius(position.coords.accuracy);
    
    // Draw a circle around the user position to have an idea of the current localization accuracy
    
    // map.fitBounds(circle.getBounds());
    
  }

  function geolocationError(positionError) {
    document.getElementById("map").innerHTML += "Error: " + positionError.message + "<br />";
  }

  function geolocateUser() {
    // If the browser supports the Geolocation API
    if (navigator.geolocation)
    {
      var positionOptions = {
        enableHighAccuracy: true,
        maximumAge : 1000,
        timeout: 1 * 10000 // 10 seconds
      };
    //   navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
      navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, positionOptions);
    }
    else
      document.getElementById("map").innerHTML += "Your browser doesn't support the Geolocation API";
  }
  
function onSuccess(heading) {
    console.log("non error");
    alert (' dirige: ' + heading.magneticHeading);

}

function onError(error) {
    console.log("error");
    alert ('CompassError: '+ error.code);
    
}
    
    function enableOrientationArrow() {
         var watchID = navigator.compass.watchHeading (
            function (heading) {
                var alpha = heading.magneticHeading; 
                var locationIcon = myLocationMarker.get('icon');
                locationIcon.rotation = 360 - alpha;
                myLocationMarker.set('icon', locationIcon);
            },  
            function (error) {
                console.log("error " + error.code);
                // alert ('CompassError: '+ error.code);
            },  
            {
              frequency: 500
            }
        );
    }
    

    function locateByBrowser(location) {
    
        var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        myLocationMarker.setPosition(currentLocation);
    }
