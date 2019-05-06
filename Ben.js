const timeoutTime = 500;
const MAX_BEAT = 16;
const DRUMS_LENGTH = 9;
var isLoop = true;
var isPlay = false;         // Is-Loop flag
//var matrix = [];            // Boolean data array
var instrument = [];        // Channel 10th with key note (35~81)
var beat = 0;               // Store the time domain iterator of matrix

var MIN_AMPLITUDE = 0;
var MAX_AMPLITUDE = 127;

// Drum instrument play back function
// with NoteOff
//  |   (drumType, amplitude)
function playDrum(drumType, panning, amplitude) {
    // Prompt the amplitude
    amplitude = (amplitude > MAX_AMPLITUDE) ? MAX_AMPLITUDE : (amplitude < MIN_AMPLITUDE) ? MIN_AMPLITUDE : amplitude;
    // Drum chaanel  = 9
    MIDI.noteOn(0, drumType, amplitude, 0, panning);
    // Note off the drum
    setTimeout(function functionName() {
        MIDI.noteOff(0, drumType);
    }, timeoutTime);
}

// How to play?
// Play one beat[t] for each drum instrument
function playOneBeat(spb) {

    if (beat >= MAX_BEAT) {
        beat = 0;
    }

    $(".cellstep").removeClass('active');
    $("#step").find("th").eq(beat+1).find("button").addClass('active');

    // Play each instrument in one beat
    for (var i = 0; i < DRUMS_LENGTH; i++) {
        if (matrix[i][beat]) {
            //alert("in here" + " beat: "+ beat + "i: " + i); //WORKING NOW
            var volume = $('#volume'+i).val(); //get infomation for that instrument
            var panning = $('#panning'+i).val();
            panning = panning/5-1;
            var instrument = $('#track'+i).data("num");
            playDrum(instrument, panning, volume);
            //playDrum(instrument[i], pannings[i], amplitude); //COMMENTED OUT FOR THE MOMENT AS DON'T HAVE ANY VALS
        }
    }

    // Move to next beat
    beat++;

    if (isPlay && (beat < MAX_BEAT || isLoop)) {
        setTimeout(function () {
            playOneBeat(spb);
        }, spb);
    }
}

// Function after "PLAY" button is pressed
function playBtnPressed() {
    // Grap those variables from front end
    //const tempo = 80;    // Tempo: Need to grap from front-end
    const tempo = $('#pattern_tempo').val();
    //matrix = [];        // Grapped front-end info
    isPlay = true;

    // Calculate the how many second for 1 beat (Second per Beat)
    const spb = 1.0 / (tempo / 60.0) * 1000.0;  // Change second to ms
    // Auto play full beats
    playOneBeat(spb);
}

// Function after "STOP" button is pressed
function stopBtnPressed() {
    beat = 0;
    isPlay = false;
}
