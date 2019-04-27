// // The pitch of the currently playing note
// var this_pitch;

// // The MIDI pitch number for the first (left) keyboard key
// var lowest_pitch = 60;

// var MIN_PITCH = 21;
// var MAX_PITCH = 108;

// var MIN_AMPLITUDE = 0;
// var MAX_AMPLITUDE = 127;

// var current_chord_type;

// function handlePianoKeyPress(evt) {

// 	current_chord_type = $(":radio[name=play-mode]:checked").val();

//     var this_key, this_amplitude;

//     // Determine which piano key has been pressed.
//     // 'evt.target' tells us exactly which item triggered this function.

//     // The piano key number is taken from the 'data-piano-key-number' attribute of each button.
//     // The piano key number is a value in the range 0 to 23 inclusive.
//     this_key = $(evt.target).data("pianoKeyNumber");

//     lowest_pitch = parseInt($("#pitch").val());

//     this_pitch = lowest_pitch + parseInt(this_key);

//     // Extract the amplitude value from the slider
//     this_amplitude = $("#amplitude").val();

//     // Convert the string into actual values
//     this_amplitude = parseInt(this_amplitude);

//     // Use the two numbers to start a MIDI note
//     MIDI.noteOn(0, this_pitch, this_amplitude);

//     //
//     // You need to handle the chord mode here
//     //


//     switch(current_chord_type){
//     	case "major":
// 	    	if((this_pitch+4 <= MAX_PITCH) && (this_pitch+4 >= MIN_PITCH)){
// 	    		 MIDI.noteOn(0, this_pitch+4, this_amplitude);
// 	    	}
// 	    	if((this_pitch+7 <= MAX_PITCH) && (this_pitch+7 >= MIN_PITCH)){
// 	    		 MIDI.noteOn(0, this_pitch+7, this_amplitude);
// 	    	}
// 	    	break;
//     	case "minor":
// 	    	if((this_pitch+3 <= MAX_PITCH) && (this_pitch+3 >= MIN_PITCH)){
// 	    		 MIDI.noteOn(0, this_pitch+3, this_amplitude);
// 	    	}
// 	    	if((this_pitch+7 <= MAX_PITCH) && (this_pitch+7 >= MIN_PITCH)){
// 	    		 MIDI.noteOn(0, this_pitch+7, this_amplitude);
// 	    	}
//     		break;
//     }

  
//     // Show a simple message in the console
//     console.log("Key press event for key " + this_pitch + "!");
// }

// function handlePianoKeyRelease(evt) {
//     // Send the note off message to match the pitch of the current note on event

//     MIDI.noteOff(0, this_pitch); 

//     //
//     // You need to handle the chord mode here
//     //

//     switch(current_chord_type){
//     	case "major":
// 	    	if((this_pitch+4 <= MAX_PITCH) && (this_pitch+4 >= MIN_PITCH)){
// 	    		 MIDI.noteOff(0, this_pitch+4);
// 	    	}
// 	    	if((this_pitch+7 <= MAX_PITCH) && (this_pitch+7 >= MIN_PITCH)){
// 	    		 MIDI.noteOff(0, this_pitch+7);
// 	    	}
// 	    	break;
//     	case "minor":
// 	    	if((this_pitch+3 <= MAX_PITCH) && (this_pitch+3 >= MIN_PITCH)){
// 	    		 MIDI.noteOff(0, this_pitch+3);
// 	    	}
// 	    	if((this_pitch+7 <= MAX_PITCH) && (this_pitch+7 >= MIN_PITCH)){
// 	    		 MIDI.noteOff(0, this_pitch+7);
// 	    	}
//     		break;
//     }


//     // Show a simple message in the console
//     console.log("Key release event for key " + this_pitch + "!");
// }

$(document).ready(function() {
    var isplaying=0;
    var num_tracks=6;
    var length = 16;
    var matrix = new Array(num_tracks);
    for(var col=0; col< num_tracks; col++){
            matrix[col] = new Array(length);
    }

    for(var col=0; col< length;col++){
        for(var row=0;row< num_tracks; row++){
            matrix[row][col]=0;
        }
    }
   //MATRIX GOES [ROW][COL]
    //debugger;

        $(".cell").click(function() {
            //get index of the cell
            var col = parseInt($(this).parent().parent().children().index($(this).parent()))-1;
            var row = parseInt($(this).parent().parent().parent().children().index($(this).parent().parent()));
            //update matrix
            value=!$(this).hasClass("active");
            if(value==true){
                value=1;
            } else {
                value=0;
            }
            //alert("col: " +col + " row: " + row + " value: " + value);
            matrix[row][col]=value;
            debugger;

        });

        $("#pattern_play").click(function(){
            isplaying=(isplaying+1)%2;
            if (isplaying==1)
                {
                    //alert("play");
                    $(this).html("Stop");

            // $(".cellstep").removeClass('active'); - HOW TO ACTIVATE A DECATIVE THE STEP
            // $("#step").find("th").eq(step+1).find("button").addClass('active');
                }
            else
                {
                    //alert("stop");
                    $(this).html("Play");
                }
              }
           );

    // MIDI.loadPlugin({
    //     soundfontUrl: "./midi-js/soundfont/",
    //     instruments: [
    //         "trumpet"
    //         //
    //         // You can optionally list the instruments here to preload the
    //         // instruments; alternatively, each instrument will be loaded
    //         // when you send the program change event
    //         //
    //     ],
    //     onprogress: function(state, progress) {
    //         console.log(state, progress);
    //     },
    //     onsuccess: function() {
    //         // Resuming the AudioContext when there is user interaction
    //         $("body").click(function() {
    //             if (MIDI.getContext().state != "running") {
    //                 MIDI.getContext().resume().then(function() {
    //                     console.log("Audio Context is resumed!");
    //                 });
    //             }
    //         });

    //         // At this point the MIDI system is ready to be used
    //         MIDI.setVolume(0, 127);     // Set the volume level
    //         MIDI.programChange(0, 56);  // Use the General MIDI 'trumpet' number

    //         // Set up the event handlers for all the buttons
    //         $("button").on("mousedown", handlePianoKeyPress);
    //         $("button").on("mouseup", handlePianoKeyRelease);

    //         //
    //         // You probably need to set up an event for your instrument change
    //         //
    //         $("#instrument").change(function(){
    //         	var instrumentNumber = parseInt($("#instrument").val());
    //         	//console.log(instrumentNumber);
    //         	MIDI.programChange(0, instrumentNumber);
    //         });


    //     }
    // });
});
