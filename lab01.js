var matrix;
$(document).ready(function() {
    var isplaying=0;
    var num_tracks=6;
    var length = 16;
    matrix = new Array(num_tracks);
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

        });

        $("#pattern_play").click(function(){
            isplaying=(isplaying+1)%2;
            if (isplaying==1)
                {
                    playBtnPressed();
                    $(this).html("Stop");

            // $(".cellstep").removeClass('active'); - HOW TO ACTIVATE A DECATIVE THE STEP
            // $("#step").find("th").eq(step+1).find("button").addClass('active');
                }
            else
                {
                    //alert("stop");
                    stopBtnPressed();
                    $(this).html("Play");
                }
              }
           );


    MIDI.loadPlugin({
        soundfontUrl: "./midi-js/soundfont/",
        instruments: [
            "drum"
            //
            // You can optionally list the instruments here to preload the
            // instruments; alternatively, each instrument will be loaded
            // when you send the program change event
            //
        ],
        onprogress: function(state, progress) {
            console.log(state, progress);
        },
        onsuccess: function() {
            // Resuming the AudioContext when there is user interaction
            $("body").click(function() {
                if (MIDI.getContext().state != "running") {
                    MIDI.getContext().resume().then(function() {
                        console.log("Audio Context is resumed!");
                    });
                }
            });

            // At this point the MIDI system is ready to be used
            MIDI.setVolume(0, 127);     // Set the volume level
            MIDI.programChange(0, 0);  // Use the General MIDI 'trumpet' number

            // Set up the event handlers for all the buttons
            //$("button").on("mousedown", handlePianoKeyPress);
            //$("button").on("mouseup", handlePianoKeyRelease);

            //
            // You probably need to set up an event for your instrument change
            //
            // $("#instrument").change(function(){
            // 	var instrumentNumber = parseInt($("#instrument").val());
            // 	//console.log(instrumentNumber);
            // 	MIDI.programChange(0, instrumentNumber);
            // });


        }
    });
});
