
// Subscribing to pubNub in order to send messages.
var pubnub = PUBNUB({
    subscribe_key: 'sub-c-03f3177c-9c7e-11e5-b829-02ee2ddab7fe', // always required
    publish_key: 'pub-c-8c19144e-3d5a-4e5b-8442-f56d8721b99c'    // only required if publishing
});

//---receive messages
pubnub.subscribe({
    channel: 'GMflash',
    message: function(m){var colourRecieved = m.colour
                        //var bodyColour = document.body.style.backgroundColor
                //---this flashes screen based on rate and colour received
                        console.log(m.flashDirection);
                      if(m.flashDirection == "false"){ 
                        setInterval(function(){
                        document.body.style.backgroundColor = document.body.style.backgroundColor == "black" ? colourRecieved: "black";}, m.flashRate);
                     } else if(m.flashDirection == "true") {
                          
                          if (window.DeviceOrientationEvent) {
  
  // Listen for the deviceorientation event and handle the raw data
  window.addEventListener('deviceorientation', function(eventData) {
    // gamma is the left-to-right tilt in degrees
    var tiltLR = Math.round(eventData.gamma)

    // beta is the front-to-back tilt in degrees
     var tiltFB = Math.round(eventData.beta)

    // alpha is the compass direction the device is facing in degrees
    var dir = Math.round(eventData.alpha)

    //--ORIENTATION HANDLER
    
    deviceOrientationHandler(tiltLR, tiltFB, dir)
    
  }, false);
} else {
  console.log("Orientation not supported");
}
//---------------------------
    

function deviceOrientationHandler(tiltLR, tiltFB, dir){
            document.getElementById("doDirection").innerHTML = dir

            if(dir > 90 && dir < 180){
                CurrentTone.play()
                document.body.style.backgroundColor = colourRecieved
                
            } else {
                CurrentTone.pause()
                document.body.style.backgroundColor = "black";
            }
    }
                          
                      }
                        
                                
                        console.log(m.flashRate)},
    error: function (error) {
      // Handle error here
      console.log(JSON.stringify(error));
    }
 });

console.log(pubnub.subscribe.message);
//--send messages for different colors
function publish() {
pubnub.publish({
    channel: 'GMflash',        
    message: flashcontrol = {
                colour: $("#control-colour").val(),
                flashRate: $("#control-action").val(),
                flashDirection:$("#control-compass").val()
                }
    ,
    callback : function(m){console.log("publish " + flashcontrol.colour)}
});
}


//---Set up audio files
var HighTone = document.createElement('audio')
HighTone.src = 'sound/audiocheckM4.mp3'
HighTone.preload = "none"

var MidTone = document.createElement('audio')
MidTone.src = 'sound/MidTone.mp3'
MidTone.preload = "none"

var LowTone = document.createElement('audio')
LowTone.src ='sound/LowTone.mp3'
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

//-------------------adpated code from http://www.html5rocks.com/en/tutorials/device/orientation/
//if (window.DeviceOrientationEvent) {
//  
//  // Listen for the deviceorientation event and handle the raw data
//  window.addEventListener('deviceorientation', function(eventData) {
//    // gamma is the left-to-right tilt in degrees
//    var tiltLR = Math.round(eventData.gamma)
//
//    // beta is the front-to-back tilt in degrees
//     var tiltFB = Math.round(eventData.beta)
//
//    // alpha is the compass direction the device is facing in degrees
//    var dir = Math.round(eventData.alpha)
//
//    //--ORIENTATION HANDLER
//    
//    deviceOrientationHandler(tiltLR, tiltFB, dir)
//    
//  }, false);
//} else {
//  console.log("Orientation not supported");
//}
////---------------------------
//    
//
//function deviceOrientationHandler(tiltLR, tiltFB, dir){
//            document.getElementById("doDirection").innerHTML = dir
//
//            if(dir > 90 && dir < 180){
//                CurrentTone.play()
//                
//            } else {
//                CurrentTone.pause()
//            }
//    }

//--USER INITITATION IS REQUIRED FOR AUDIO PLAY
    function ready() {
        CurrentTone.load()
    }