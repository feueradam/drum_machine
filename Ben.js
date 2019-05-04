const timeoutTime = 500;
const MAX_BEAT = 16;
const DRUMS_LENGTH = 6;
var isLoop = false;
var isPlay = false;         // Is-Loop flag
var matrix = [];            // Boolean data array
var instrument = [];        // Channel 10th with key note (35~81)
var beat = 0;               // Store the time domain iterator of matrix

// Drum instrument play back function
// with NoteOff
//  |   (drumType, amplitude)
function playDrum(drumType, panning, amplitude) {
    // Prompt the amplitude
    amplitude = (amplitude > MAX_AMPLITUDE) ? MAX_AMPLITUDE : (amplitude < MIN_AMPLITUDE) ? MIN_AMPLITUDE : amplitude;
    // Drum chaanel  = 9
    MIDI.noteOn(9, drumType, amplitude);
    // Note off the drum
    setTimeout(function functionName() {
        MIDI.noteOff(9, drumType);
    }, timeoutTime);
}

// How to play?
// Play one beat[t] for each drum instrument
function playOneBeat(spb) {
    // Check if 'beat' is larger than MAX_BEAT when looping
    if (beat >= MAX_BEAT) {
        beat = 0;
    }

    // Play each instrument in one beat
    for (var i = 0; i < DRUMS_LENGTH; i++) {
        if (matrix[beat][i]) {
            playDrum(instrument[i], pannings[i], amplitude);
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
    const tempo = 80;    // Tempo: Need to grap from front-end
    matrix = [];        // Grapped front-end info
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
