function onDeviceReady() {

}

function onSuccess(acceleration) {
    alert('Acceleration X: ' + acceleration.x + '\n' +
        'Acceleration Y: ' + acceleration.y + '\n' +
        'Acceleration Z: ' + acceleration.z + '\n' +
        'Timestamp: ' + acceleration.timestamp + '\n');
}

function onError() {
    alert('onError!');
}

function showCurrentAcceleration() {
    navigator.accelerometer.clearWatch(watchID);
    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    var element2 = document.getElementById('accelerometer');
    element2.innerHTML = "DETENIDO. HAZ CLICK DE NUEVO PARA REANUDAR";
}

function startWatch() {

    // Update acceleration every 0,5 seconds
    var options = {
        frequency: 500
    };

    watchID = navigator.accelerometer.watchAcceleration(onSuccessWatch, onError, options);
}

function onSuccessWatch(acceleration) {
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
        'Acceleration Y: ' + acceleration.y + '<br />' +
        'Acceleration Z: ' + acceleration.z + '<br />' +
        'Timestamp: ' + acceleration.timestamp + '<br />';
}

$(document).ready(function() {
    $('#lecturacolap').click(function() {
        //alert("watchID " + watchID);
        startWatch();
    });
});