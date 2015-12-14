//////////////////////////////////////////////////////////////////////////////////
//
// For this techmashup, I created a performance piece that reminds players of how much the phone is an extremly personal object. A large group of participants are asked to put their device in a bit of danger, and swing it around at arms length, while sounds and colours eminate from their devices based on the accelerometer sensor input, and from realtime server sent events. Directly inspired by the work Speaker Swinging (1982), produced by expermimental sound composer Gordon Monahan (https://www.youtube.com/watch?v=delDUry0_eo), my work, Mobile Swinging could quickly scale from a few particpants upwards (considerations, such as a QR code for quick relay to the site, have been implemented to allow many people quick access). Although I have not been able to assemble a large crowd, I have included video documentation of the proof of concept.
//  There are two ways to experience Mobile Swinging, as a participant, or as controller (and anyone can become the controller through a simple password login). The controller has a choice of which colour to send, and the rate at which that colour flashes (for a synchronized colour effect amongst all devices) or to switch Colour With Compass to True and have the colours flash based on the device's orientation. To see the control board simply type in Ocad2015 in the password input field.
//  For this project, although the UI is quite minimal, it is fluid through use of Bootstrap, and I've utilized PubNub for the first time (it was introduced in class by Demi) to send and recieve messages. Because no information needed to be stored, this presented an efficient alternative to php. I've seen real-time controlled web projects used to control a large number of devices before, and I took this opportunity to try and make my own, as the potential to communicate simultaneously with a large number of devices without going through a native app is quite exciting. This has been an invaluable learning experience in sending and recieving data, and will likely be something I continue and expand on in my future work.
//Thank you for your time,
//Luke
//
//*Important to note that although basic functionality of this project should work on any device with an internet connection, I am targeting hand held devices with accelerometers that support MP3 playback (which for some reference, should be most devices released after the iPhone4S).
///////////////////////////////////////////////////////////////////////////////////

//--SUBSCRIBING TO PUBNUB
var pubnub = PUBNUB({
    subscribe_key: 'sub-c-03f3177c-9c7e-11e5-b829-02ee2ddab7fe',
    publish_key: 'pub-c-8c19144e-3d5a-4e5b-8442-f56d8721b99c'
});



//---RECIEVE THE OBJECT AND USE ITS VALUES

pubnub.subscribe({
    channel: 'GMflash',
    message: function (m) {
        var colourRecieved = m.colour
        var flashRate = m.flashRate
        var flashBasedOnDirection = m.flashDirection
        
        if(!m.callreload == true){
        //-------THIS CODE ADAPTED FROM http://www.html5rocks.com/en/tutorials/device/orientation/  
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function (eventData) {
                var tiltLR = Math.round(eventData.gamma)
                var tiltFB = Math.round(eventData.beta)
                var dir = Math.round(eventData.alpha)

                //--ORIENTATION HANDLER
                if (flashBasedOnDirection == "false") {
                    deviceOrientationSound(tiltLR, tiltFB, dir)
                } else {
                    deviceOrientationSoundandColour(tiltLR, tiltFB, dir)
                }

            }, false);
        } else {
            console.log("Orientation not supported");
        }
        //---------------------------
        if (flashBasedOnDirection == "false") {
            //---IF FLASH BASED ON DIRECTION = FALSE, SCREEN FLASHES COLOUR AT A CONSTANT RATE (EITHER SLOW,MEDIUM, OR FAST DEPENDING ON THE CONTROL BOARD INPUT)
            setInterval(function () {
                document.body.style.backgroundColor = document.body.style.backgroundColor == "black" ? colourRecieved : "black";
            }, flashRate);
        }

        function deviceOrientationSound(tiltLR, tiltFB, dir) {
            document.getElementById("doDirection").innerHTML = dir

            if (dir > 90 && dir < 200) {
                CurrentTone.play()

            } else {
                CurrentTone.pause()
            }
        }

        //---OR IF FLASH BASED ON DIRECTION = TRUE, HAVE COLOUR RECIEVED FLASH WHEN PHONE IS AT A CERTAIN ANGLE
        function deviceOrientationSoundandColour(tiltLR, tiltFB, dir) {
            document.getElementById("doDirection").innerHTML = dir

            if (dir > 90 && dir < 200) {
                CurrentTone.play()
                document.body.style.backgroundColor = colourRecieved

            } else {
                CurrentTone.pause()
                document.body.style.backgroundColor = "black";
            }
        }
    } else {
        location.reload()
    }
       
    },
    error: function (error) {
        //--IN CASE OF ERROR
        console.log(JSON.stringify(error));
    }
});
 



//--PUBLISH SENDS OUT AN OBJECT CALLED flashcontrol WITH VALUES PULLED FROM THE CONTROL BOARD
function publish() {
    $("#submitbutton").css("visibility","hidden");
    $("#refreshbutton").css("visibility","visible");
    pubnub.publish({
        channel: 'GMflash',
        message: flashcontrol = {
            colour: $("#control-colour").val(),
            flashRate: $("#control-action").val(),
            flashDirection: $("#control-compass").val()
        },
        callback: function (m) {
            console.log("publish " + flashcontrol.colour)
        }
    });
}

function reload(){
    pubnub.publish({
        channel:'GMflash',
        message: flashcontrol = {
            callreload: true
        },
        callback: function (n) {
            console.log("publish " + reload.callreload)
        }
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
LowTone.src = 'sound/LowTone.mp3'
LowTone.preload = "none"


//--RANDOMLY ASSIGN EACH DEVICE TO A DIFFERENT GROUP SO THAT EACH GROUP GETS A DIFFERENT AUDIO TRACK
var groupNumber = Math.round(Math.random() * (3 - 1) + 1);
console.log(groupNumber);


//---ASSINGS A TONE TO EACH GROUP AND SETS THAT TO CurrentTone AS TO LOAD, PLAY, AND PAUSE ONLY THAT AUDIO FILE
var CurrentTone;
switch (groupNumber) {
case 1:
    CurrentTone = HighTone
    break;
case 2:
    CurrentTone = MidTone
    break;
case 3:
    CurrentTone = LowTone
    break;
default:
    console.log("something went wrong with group assignment")

}



//--USER INITITATION IS REQUIRED FOR AUDIO TO PLAY
function ready() {
    CurrentTone.load()
    $("#readybutton").css("visibility", "hidden")
    $("#passcode").css("visibility", "hidden")

}

//--SHOW CONTROL BOARD AFTER A PASSWORD IS PUT IN
function showControls() {
    console.log($("#pwd").val())
    var pass = $("#pwd").val()
    if (pass === "Ocad2015") {
        $("#container").css("visibility", "visible")
        $("#passcode").css("visibility", "hidden")
    } else {
        $("#pwd").val("")
        $("#pwd").attr('placeholder', 'Incorrect passcode');
    }
}