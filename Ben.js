const timeoutTime = 500;
// Drum instrument play back function
// with NoteOff
//  |   (drumType, amplitude)

function playDrum(drumType, amplitude) {
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
// Idea 1
function playIdeaOne() {
    // Loop time domain first?
    //  matrix -
    //  |   t: 1-way array store all drum instruments flag
    //  |   t, i: each instrument ON flag in time t
    var timeLength = matrix.length;
    for (var t = 0; t < timeLength; t++) {
        var instrumentLength = matrix[t].length;
        for (var i = 0; i < instrumentLength; i++) {
            if (matrix[t][i]) {
                playDrum(instrument[i], amplitude);
            }
        }
    }
}

// Function after "Play" button is pressed
function playBtnPressed() {
    // Grap those variables from front end
    const tempo = 0;        // Tempo
    const isLoop = true;    // Is-Loop flag
    const matrix = [];      // Boolean data array

    // Calculate the how many second for 1 beat
    const secondPerBeat = 1.0 / (tempo / 60);
}
