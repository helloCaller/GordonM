
//--SUBSCRIBING TO PUBNUB
var pubnub = PUBNUB({
    subscribe_key: 'sub-c-03f3177c-9c7e-11e5-b829-02ee2ddab7fe', // always required
    publish_key: 'pub-c-8c19144e-3d5a-4e5b-8442-f56d8721b99c'    // only required if publishing
});

//---RECIEVE THE OBJECT AND USE ITS VALUES
pubnub.subscribe({
    channel: 'GMflash',
    message: function(m){var colourRecieved = m.colour
            if (window.DeviceOrientationEvent) {
//-------CODE ADAPTED FROM http://www.html5rocks.com/en/tutorials/device/orientation/  
  
  window.addEventListener('deviceorientation', function(eventData) {
    var tiltLR = Math.round(eventData.gamma)
    var tiltFB = Math.round(eventData.beta)
    var dir = Math.round(eventData.alpha)

    //--ORIENTATION HANDLER
    deviceOrientationHandler(tiltLR, tiltFB, dir)
    
  }, false);
} else {
  console.log("Orientation not supported");
}
//---------------------------
                      if(m.flashDirection == "false"){
        //---IF FLASH BASED ON DIRECTION = FALSE, SCREEN FLASHES COLOUR AT A CONSTANT RATE (EITHER SLOW,MEDIUM, OR FAST DEPENDING ON THE CONTROL BOARD INPUT)
                        setInterval(function(){
                        document.body.style.backgroundColor = document.body.style.backgroundColor == "black" ? colourRecieved: "black";}, m.flashRate);

//---OR IF FLASH BASED ON DIRECTION = TRUE, HAVE COLOUR RECIEVED FLASH WHEN PHONE IS AT A CERTAIN ANGLE
                     } else if(m.flashDirection == "true") {
                        
    
            function deviceOrientationHandler(tiltLR, tiltFB, dir){
                document.getElementById("doDirection").innerHTML = dir

                if(dir > 90 && dir < 200){
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
      //--IN CASE OF ERROR
      console.log(JSON.stringify(error));
    }
 });




//--PUBLISH SENDS OUT AN OBJECT CALLED flashcontrol WITH VALUES PULLED FROM THE CONTROL BOARD
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
    


//---ESTABLISH AUDIO FILES AND THEIR SOURCES
var HighTone = document.createElement('audio')
HighTone.src = 'sound/audiocheckM4.mp3'
HighTone.preload = "none"

var MidTone = document.createElement('audio')
MidTone.src = 'sound/MidTone.mp3'
MidTone.preload = "none"

var LowTone = document.createElement('audio')
LowTone.src ='sound/LowTone.mp3'
LowTone.preload = "none"


//--RANDOMLY ASSIGN EACH DEVICE TO A DIFFERENT GROUP SO THAT EACH GROUP GETS A DIFFERENT AUDIO TRACK
var groupNumber = Math.round(Math.random() * (3 - 1) + 1);
console.log(groupNumber);


//---ASSINGS A TONE TO EACH GROUP AND SETS THAT TO CurrentTone AS TO LOAD, PLAY, AND PAUSE ONLY THAT AUDIO FILE
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



//--USER INITITATION IS REQUIRED FOR AUDIO TO PLAY
    function ready() {
        CurrentTone.load()
        $("#readybutton").css("visibility", "hidden")
        $("#passcode").css("visibility", "hidden")
       document.body.style.backgroundColor = "black"
    }

//--SHOW CONTROL BOARD AFTER A PASSWORD IS PUT IN
 function showControls(){
     console.log($("#pwd").val())
    var pass = $("#pwd").val()
    if(pass === "Ocad2015"){
        $("#container").css("visibility", "visible")
        $("#passcode").css("visibility", "hidden")
    }else {
        $("#pwd").val("")
        $("#pwd").attr('placeholder', 'Incorrect passcode');
    }
 }
