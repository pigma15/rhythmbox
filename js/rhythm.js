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

//DATA COMMON
const playButton = document.querySelector('.controls button[name="play"]');
const stopButton = document.querySelector('.controls button[name="stop"]');
const tempoInput = document.querySelector('.tempo input');
const tonalityInput = document.querySelector('.tonality select');
let tempo = 0;
let playState = false;


//DIRECTORIES
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
    HTML += `<div class="none"></div>`
    trackSeq.innerHTML = HTML;
    steps = document.querySelectorAll(`#${track} label.step`);
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
    const multiplier = parseFloat(document.querySelector(`#${track} .multiplier select`).value);
    const BPM = document.querySelector('.controls input').value;
    const tempo = (240 / BPM) * 1000;
    const stepInput = document.querySelector(`#${track} input[name="stepcount"]`);
    const stepAmount = parseInt(stepInput.value);
    const steps = document.querySelectorAll(`#${track} label.step`);
    const step = document.querySelectorAll(`#${track} label.step input`);
    const stepTime = tempo / stepAmount / multiplier;
    if (step[0].checked) {
        audio.play();
            setTimeout(() => {
                audio.pause();
                audio.load();
            }, stepTime / 1.5
        )
    };
    steps[0].style.backgroundColor = 'orange';
    let currentStep = 1;
    let prevStep = 1;
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
                    for (i = 1; i < stepAmount; i++) {
                        steps[i].style.backgroundColor = 'black';
                    }
                    clearInterval(sequencer);
                }
            },
            stepTime
        );
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
    tempoInput.setAttribute("disabled", true);
    tonalityInput.setAttribute("disabled", true);
    primaStepInput.setAttribute("disabled", true);
    tertiaStepInput.setAttribute("disabled", true);
    quintaStepInput.setAttribute("disabled", true);
    septimaStepInput.setAttribute("disabled", true);
    kickStepInput.setAttribute("disabled", true);
    snareStepInput.setAttribute("disabled", true);
    hatStepInput.setAttribute("disabled", true);
    primaMultiplierInput.setAttribute("disabled", true);
    tertiaMultiplierInput.setAttribute("disabled", true);
    quintaMultiplierInput.setAttribute("disabled", true);
    septimaMultiplierInput.setAttribute("disabled", true);
    kickMultiplierInput.setAttribute("disabled", true);
    snareMultiplierInput.setAttribute("disabled", true);
    hatMultiplierInput.setAttribute("disabled", true);
    playState = true;
    prima()
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
    tempoInput.removeAttribute('disabled');
    tonalityInput.removeAttribute('disabled');
    primaStepInput.removeAttribute('disabled');
    tertiaStepInput.removeAttribute('disabled');
    quintaStepInput.removeAttribute('disabled');
    septimaStepInput.removeAttribute('disabled');
    kickStepInput.removeAttribute('disabled');
    snareStepInput.removeAttribute('disabled');
    hatStepInput.removeAttribute('disabled');
    primaMultiplierInput.removeAttribute('disabled');
    tertiaMultiplierInput.removeAttribute('disabled');
    quintaMultiplierInput.removeAttribute('disabled');
    septimaMultiplierInput.removeAttribute('disabled');
    kickMultiplierInput.removeAttribute('disabled');
    snareMultiplierInput.removeAttribute('disabled');
    hatMultiplierInput.removeAttribute('disabled');
    playState = false;
};
