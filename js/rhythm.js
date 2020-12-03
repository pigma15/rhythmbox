//AUDIO
const primaAudio = new Audio('./audio/kik.mp3');
const tertiaAudio = new Audio('./audio/hh.mp3');

//DATA COMMON
const playButton = document.querySelector('.controls button[name="play"]');
const stopButton = document.querySelector('.controls button[name="stop"]');
const tempoInput = document.querySelector('.tempo input');
const tonalityInput = document.querySelector('.tonality select');
let BPM = 0;
let tempo = 0;
let stepInput = {} ;
let stepAmount = 0;
let steps = [];
let playState = false;

//DIRECTORIES
const primaSeq = document.querySelector('#prima div.seq > form');
const primaStepInput = document.querySelector('#prima .parameters input');
const tertiaSeq = document.querySelector('#tertia div.seq > form');
const tertiaStepInput = document.querySelector('#tertia .parameters input');

//STEPCOUNT
function stepCount(track, trackSeq) {
    stepInput = document.querySelector(`#${track} input[name="stepcount"]`);
    stepAmount = parseFloat(stepInput.value);
    let HTML = '';
    for (i = 1; i <= stepAmount; i++) {
        HTML += `<label class="step">
        <input type="checkbox" value="${i}">
        <span></span>
    </label>`
    }
    trackSeq.innerHTML = HTML;
    steps = document.querySelectorAll(`#${track} label.step`);
}

//INDIVIDUAL STEP COUNTS
function primaStepCount() {
    stepCount('prima', primaSeq);
};
function tertiaStepCount() {
    stepCount('tertia', tertiaSeq);
};

//SEQUENCER
function runSeq(track, audio) {
    stepInput = document.querySelector(`#${track} input[name="stepcount"]`);
    stepAmount = parseFloat(stepInput.value);
    steps = document.querySelectorAll(`#${track} label.step`);
    let step = document.querySelectorAll(`#${track} label.step input`);
    const stepTime = tempo / stepAmount;
    let currentStep = 0;
    let prevStep = 0;
    let sequencer =        
        setInterval(
            function() {
                if (currentStep === 0) {
                    prevStep = stepAmount - 1;
                }
                if(currentStep > 0) {
                    prevStep = currentStep - 1;
                }
                if (steps[prevStep] === undefined || steps[currentStep] === undefined) {
                    for (i = 1; i < stepAmount; i++) {
                        steps[i].style.backgroundColor = 'black';
                    }
                    prevStep = stepAmount - 1;
                    currentStep = 0;
                }
                steps[currentStep].style.backgroundColor = 'orange';
                steps[prevStep].style.backgroundColor = 'black';
                if (step[currentStep].checked) {
                    audio.play();
                        setTimeout(() => {
                            audio.pause();
                            audio.load();
                        }, stepTime / 1.5
                    )
                }
                currentStep += 1;
                if (currentStep > stepAmount - 1) {
                    currentStep = 0;
                }
                prevStep += 1;
                if (prevStep > stepAmount - 1) {
                    prevStep = 0;
                }
                if (playState === false ) {
                    clearInterval(sequencer);
                    for (i = 1; i < stepAmount; i++) {
                        steps[i].style.backgroundColor = 'black';
                    }
                }
            },
            stepTime
        );

}

//INDIVIDUAL SEQUENCERS
function prima() {
    runSeq('prima', primaAudio);
}
function tertia() {
    runSeq('tertia', tertiaAudio);
}

//TRANSPORT
function play() {
    playButton.setAttribute("disabled", true);
    stopButton.removeAttribute("disabled");
    tempoInput.setAttribute("disabled", true);
    tonalityInput.setAttribute("disabled", true);
    primaStepInput.setAttribute("disabled", true);
    tertiaStepInput.setAttribute("disabled", true);
    BPM = document.querySelector('.controls input').value;
    tempo = (240 / BPM) * 1000;
    playState = true;
    prima()
    tertia();
}

function stop() {
    stopButton.setAttribute("disabled", true);
    playButton.removeAttribute("disabled");
    tempoInput.removeAttribute('disabled');
    tonalityInput.removeAttribute('disabled');
    primaStepInput.removeAttribute('disabled');
    tertiaStepInput.removeAttribute('disabled');
    playState = false;
}

