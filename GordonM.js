var pubnub = PUBNUB({
    subscribe_key: 'sub-c-03f3177c-9c7e-11e5-b829-02ee2ddab7fe', // always required
    publish_key: 'pub-c-8c19144e-3d5a-4e5b-8442-f56d8721b99c'    // only required if publishing
});
var Flashcolor;
pubnub.subscribe({
    channel: 'GMflash',
    message: function(m){document.getElementById("container").style.backgroundColor = m.color},
    error: function (error) {
      // Handle error here
      console.log(JSON.stringify(error));
    }
 });

function publish() {
pubnub.publish({
    channel: 'GMflash',        
    message: flashcontrol = {
                color: "red"}
    ,
    callback : function(m){console.log("publish " + flashcontrol.color)}
});
}





if (window.DeviceOrientationEvent) {
  document.getElementById("title").innerHTML = "Device Orientation";
  // Listen for the deviceorientation event and handle the raw data
  window.addEventListener('deviceorientation', function(eventData) {
    // gamma is the left-to-right tilt in degrees, where right is positive
    var tiltLR = Math.round(eventData.gamma)

    // beta is the front-to-back tilt in degrees, where front is positive
    var tiltFB = Math.round(eventData.beta)

    // alpha is the compass direction the device is facing in degrees
    var dir = Math.round(eventData.alpha)

    // call our orientation event handler
    deviceOrientationHandler(tiltLR, tiltFB, dir)
  }, false);
} else {
  document.getElementById("doDirection").innerHTML = "Not supported."
}

function deviceOrientationHandler(tiltLR, tiltFB, dir){
document.getElementById("doDirection").innerHTML = dir

if(dir > 90 && dir < 180){
   document.getElementById("container").style.backgroundColor = "red"
} else {
    document.getElementById("container").style.backgroundColor = "white"
}
};

