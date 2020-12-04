//AUDIO
const primaAudio = new Audio('./audio/prima.mp3');
const minTertiaAudio = new Audio('./audio/minTertia.mp3');
const majTertiaAudio = new Audio('./audio/majTertia.mp3');
const quintaAudio = new Audio('./audio/quinta.mp3');
const minSeptimaAudio = new Audio('./audio/minSeptima.mp3');
const majSeptimaAudio = new Audio('./audio/majSeptima.mp3');
const kickAudio = new Audio('./audio/kick.mp3');
const snareAudio = new Audio('./audio/snare.mp3');
const hatAudio = new Audio('./audio/hat.mp3');

//DATA COMMON DIRECTORIES
const playButton = document.querySelector('.controls button[name="play"]');
const stopButton = document.querySelector('.controls button[name="stop"]');
const tempoInput = document.querySelector('.tempo input');
const tonalityInput = document.querySelector('.tonality select');
let playState = false;


// DATA INDIVIDUAL DIRECTORIES
const primaSeq = document.querySelector('#prima div.seq > form');
const primaStepInput = document.querySelector('#prima .parameters input');
const tertiaSeq = document.querySelector('#tertia div.seq > form');
const tertiaStepInput = document.querySelector('#tertia .parameters input');
const quintaSeq = document.querySelector('#quinta div.seq > form');
const quintaStepInput = document.querySelector('#quinta .parameters input');
const septimaSeq = document.querySelector('#septima div.seq > form');
const septimaStepInput = document.querySelector('#septima .parameters input');
const kickSeq = document.querySelector('#kick div.seq > form');
const kickStepInput = document.querySelector('#kick .parameters input');
const snareSeq = document.querySelector('#snare div.seq > form');
const snareStepInput = document.querySelector('#snare .parameters input');
const hatSeq = document.querySelector('#hat div.seq > form');
const hatStepInput = document.querySelector('#hat .parameters input');
const primaMultiplierInput = document.querySelector('#prima .multiplier select');
const tertiaMultiplierInput = document.querySelector('#tertia .multiplier select');
const quintaMultiplierInput = document.querySelector('#quinta .multiplier select');
const septimaMultiplierInput = document.querySelector('#septima .multiplier select');
const kickMultiplierInput = document.querySelector('#kick .multiplier select');
const snareMultiplierInput = document.querySelector('#snare .multiplier select');
const hatMultiplierInput = document.querySelector('#hat .multiplier select');
let primaStepAmount = 4;
let tertiaStepAmount = 4;
let quintaStepAmount = 4;
let septimaStepAmount = 4;
let kickStepAmount = 4;
let snareStepAmount = 4;
let hatStepAmount = 4;

//STEPCOUNT
function stepCount(track, trackSeq) {
    let stepAmountBefore = 0;
    if (track === 'prima') {
        stepAmountBefore = primaStepAmount;
    };
    if (track === 'tertia') {
        stepAmountBefore = tertiaStepAmount;
    };
    if (track === 'quinta') {
        stepAmountBefore = quintaStepAmount;
    };
    if (track === 'septima') {
        stepAmountBefore = septimaStepAmount;
    };
    if (track === 'kick') {
        stepAmountBefore = kickStepAmount;
    };
    if (track === 'snare') {
        stepAmountBefore = snareStepAmount;
    };
    if (track === 'hat') {
        stepAmountBefore = hatStepAmount;
    };
    const form = document.querySelector(`#${track} div.seq form`)
    stepInput = document.querySelector(`#${track} input[name="stepcount"]`);
    stepAmount = parseFloat(stepInput.value);
    if (stepAmountBefore < stepAmount) {
        form.insertAdjacentHTML('beforeend',    `<label class="prob">
                                                    <input type="checkbox" value="${stepAmount}">
                                                    <span></span>
                                                </label>
                                                <label class="step">
                                                    <input type="checkbox" value="${stepAmount}">
                                                    <span></span>
                                                </label>`);
    };
    if (stepAmountBefore > stepAmount) {
        trackSeq.removeChild(trackSeq.lastElementChild);
        trackSeq.removeChild(trackSeq.lastElementChild);
    };
    if (stepAmountBefore === stepAmount) {};
    steps = document.querySelectorAll(`#${track} label.step`);
    if (track === 'prima') {
        primaStepAmount = stepAmount;
    };
    if (track === 'tertia') {
        tertiaStepAmount = stepAmount;
    };
    if (track === 'quinta') {
        quintaStepAmount = stepAmount;
    };
    if (track === 'septima') {
        septimaStepAmount = stepAmount;
    };
    if (track === 'kick') {
        kickStepAmount = stepAmount;
    };
    if (track === 'snare') {
        snareStepAmount = stepAmount;
    };
    if (track === 'hat') {
        hatStepAmount = stepAmount;
    };
};

//INDIVIDUAL STEP COUNTS
function primaStepCount() {
    stepCount('prima', primaSeq);
};
function tertiaStepCount() {
    stepCount('tertia', tertiaSeq);
};
function quintaStepCount() {
    stepCount('quinta', quintaSeq);
};
function septimaStepCount() {
    stepCount('septima', septimaSeq);
};
function kickStepCount() {
    stepCount('kick', kickSeq);
};
function snareStepCount() {
    stepCount('snare', snareSeq);
};
function hatStepCount() {
    stepCount('hat', hatSeq);
};

//SEQUENCER
function runSeq(track, audio) {
    let multiplier = parseFloat(document.querySelector(`#${track} .multiplier select`).value);
    let BPM = document.querySelector('.controls input').value;
    let tempo = (240 / BPM) * 1000;
    const stepInput = document.querySelector(`#${track} input[name="stepcount"]`);
    let stepAmount = parseInt(stepInput.value);
    let steps = document.querySelectorAll(`#${track} label.step`);
    let step = document.querySelectorAll(`#${track} label.step input`);
    let probStep = document.querySelectorAll(`#${track} label.prob input`);
    let stepTime = tempo / stepAmount / multiplier;
    if (step[0].checked) {
        audio.pause();
        audio.load();
        audio.play();
    }
    steps[0].style.backgroundColor = 'orange';
    let currentStep = 1;
    let prevStep = 1;
    function time() {
        multiplier = parseFloat(document.querySelector(`#${track} .multiplier select`).value);
        BPM = document.querySelector('.controls input').value;
        tempo = (240 / BPM) * 1000;
        stepAmount = parseInt(stepInput.value);
        steps = document.querySelectorAll(`#${track} label.step`);
        step = document.querySelectorAll(`#${track} label.step input`);
        probStep = document.querySelectorAll(`#${track} label.prob input`);
        stepTime = tempo / stepAmount / multiplier;
        let sequencer =        
            setTimeout(
                function() {
                    let probability = Math.random();
                    if (currentStep === 0) {
                        prevStep = stepAmount - 1;
                    }
                    if(currentStep > 0) {
                        prevStep = currentStep - 1;
                    }
                    if (steps[prevStep] === undefined || steps[currentStep] === undefined) {
                        stepAmount = parseInt(stepInput.value);
                        for (i = 1; i < stepAmount; i++) {
                            steps[i].style.backgroundColor = 'black';
                        }
                        prevStep = stepAmount - 1;
                        currentStep = 0;
                    }
                    steps[currentStep].style.backgroundColor = 'orange';
                    steps[prevStep].style.backgroundColor = 'black';
                    if (step[currentStep].checked) {
                        if(probStep[currentStep].checked === false) {
                            audio.pause();
                            audio.load();
                            audio.play();
                        }
                        if (probStep[currentStep].checked && probability < 0.5) {
                            audio.pause();
                            audio.load();
                            audio.play();
                        }
                    }
                    currentStep += 1;
                    if (currentStep > stepAmount - 1) {
                        currentStep = 0;
                    }
                    if (playState === false ) {
                        for (i = 1; i < stepAmount; i++) {
                            steps[i].style.backgroundColor = 'black';
                        }
                        clearTimeout(sequencer);
                    } else {
                        time();
                    }
                },
                stepTime
            );
    }
    time();
};

//INDIVIDUAL SEQUENCERS
function prima() {
    runSeq('prima', primaAudio);
};
function minTertia() {
    runSeq('tertia', minTertiaAudio);
};
function majTertia() {
    runSeq('tertia', majTertiaAudio);
};
function quinta() {
    runSeq('quinta', quintaAudio);
};
function minSeptima() {
    runSeq('septima', minSeptimaAudio);
};
function majSeptima() {
    runSeq('septima', majSeptimaAudio);
};
function kick() {
    runSeq('kick', kickAudio);
};
function snare() {
    runSeq('snare', snareAudio);
};
function hat() {
    runSeq('hat', hatAudio);
};

//TRANSPORT
function play() {
    playButton.setAttribute("disabled", true);
    stopButton.removeAttribute("disabled");
    tonalityInput.setAttribute("disabled", true);
    playState = true;
    prima();
    quinta();
    if (tonalityInput.value === 'minor') {
        minTertia();
        minSeptima();
    };
    if (tonalityInput.value === 'major') {
        majTertia();
        majSeptima();
    };
    kick();
    snare();
    hat();
};

function stop() {
    stopButton.setAttribute("disabled", true);
    playButton.removeAttribute("disabled");
    tonalityInput.removeAttribute('disabled');
    playState = false;
};
