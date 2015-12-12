
// Subscribing to pubNub in order to send messages.
var pubnub = PUBNUB({
    subscribe_key: 'sub-c-03f3177c-9c7e-11e5-b829-02ee2ddab7fe', // always required
    publish_key: 'pub-c-8c19144e-3d5a-4e5b-8442-f56d8721b99c'    // only required if publishing
});

//---receive messages
pubnub.subscribe({
    channel: 'GMflash',
    message: function(m){var colourRecieved = m.colour
                        $('body').css({"background-color": colourRecieved})
                        console.log(m.colour)},
    error: function (error) {
      // Handle error here
      console.log(JSON.stringify(error));
    }
 });

//--send messages for different colors
function publishR() {
pubnub.publish({
    channel: 'GMflash',        
    message: flashcontrol = {
                colour: "#ff1a75",
                }
    ,
    callback : function(m){console.log("publish " + flashcontrol.colour)}
});
}

function publishB() {
pubnub.publish({
    channel: 'GMflash',        
    message: flashcontrol = {
                colour: "#99ccff",
                }
    ,
    callback : function(m){console.log("publish " + flashcontrol.colour)}
});
}

function publishP() {
pubnub.publish({
    channel: 'GMflash',        
    message: flashcontrol = {
                colour: "#ff33ff",
                }
    ,
    callback : function(m){console.log("publish " + flashcontrol.colour)}
});
}

//---Set up audio files
var HighTone = document.createElement('audio')
HighTone.src = 'sound/audiocheck.mp3'
HighTone.preload = "none"

var MidTone = document.createElement('audio')
MidTone.src = 'sound/audiocheckM.mp3'
MidTone.preload = "none"

var LowTone = document.createElement('audio')
LowTone.src ='sound/audiocheckL.mp3'
LowTone.preload = "none"



//this randomly assigns each device to a different group
var groupNumber = Math.round(Math.random() * (3 - 1) + 1);
console.log(groupNumber);

//---assigns a tone to each group and sets that to CurrentTone as to load, play and pause only that audio file
var CurrentTone;
    switch(groupNumber){
        case 1:CurrentTone = HighTone
        break;
        
        case 2: CurrentTone = MidTone
        break;
        
        case 3: CurrentTone = LowTone
        break;
        
        default: console.log("something went wrong with group assignment")

}


if (window.DeviceOrientationEvent) {
  
  // Listen for the deviceorientation event and handle the raw data
  window.addEventListener('deviceorientation', function(eventData) {
    // gamma is the left-to-right tilt in degrees, where right is positive
    var tiltLR = Math.round(eventData.gamma)

    // beta is the front-to-back tilt in degrees, where front is positive
    var tiltFB = Math.round(eventData.beta)

    // alpha is the compass direction the device is facing in degrees
    var dir = Math.round(eventData.alpha)

    //--ORIENTATION HANDLER
    deviceOrientationHandler(tiltLR, tiltFB, dir)
  }, false);
} else {
  document.getElementById("doDirection").innerHTML = "Not supported."
}

    function deviceOrientationHandler(tiltLR, tiltFB, dir){
            document.getElementById("doDirection").innerHTML = dir

            if(dir > 90 && dir < 180){
                CurrentTone.play()
                
            } else {
                CurrentTone.pause()
            }
    }

//--USER INITITATION IS REQUIRED FOR AUDIO PLAY
    function ready() {
        CurrentTone.load()
    }