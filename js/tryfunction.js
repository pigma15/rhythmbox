//DATA COMMON
const playButton = document.querySelector('.controls button[name="play"]');
const stopButton = document.querySelector('.controls button[name="stop"]');
let BPM = 0;
let tempo = 0;
let stepInput = {} ;
let stepAmount = 0;
let steps = [];




//DATA PRIMA
const primaSeq = document.querySelector('#prima div.seq > form');

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

function primaStepCount() {
    stepCount('prima', primaSeq);
};

//PRIMA RUN SEQ LOOP
function primaRunSeq() {
    primaStepCount()
    primaStepInput.setAttribute("disabled", true);
    primaSteps = document.querySelectorAll('#prima label.step');
    const stepTime = tempo / primaStepAmount; 
    let step = document.querySelectorAll('#prima label.step input');
    let currentStep = 0;
    let prevStep = 0;   
        setInterval(
            function() {
                if (currentStep === 0) {
                    prevStep = primaStepAmount - 1;
                }
                if(currentStep > 0) {
                    prevStep = currentStep - 1;
                }
                if (primaSteps[prevStep] === undefined || primaSteps[currentStep] === undefined) {
                    for (i = 1; i < primaStepAmount; i++) {
                        primaSteps[i].style.backgroundColor = 'black';
                    }
                    prevStep = primaStepAmount - 1;
                    currentStep = 0;
                }
                primaSteps[currentStep].style.backgroundColor = 'orange';
                primaSteps[prevStep].style.backgroundColor = 'black';
                if (step[currentStep].checked) {
                    primaAudio.play();
                        setTimeout(() => {
                            primaAudio.pause();
                            primaAudio.load();
                        }, stepTime / 1.5
                    )
                }
                currentStep += 1;
                if (currentStep > primaStepAmount - 1) {
                    currentStep = 0;
                }
                prevStep += 1;
                if (prevStep > primaStepAmount - 1) {
                    prevStep = 0;
                }
            },
            stepTime
        );
}

//TRANSPORT
function play() {
    playButton.setAttribute("disabled", true);
    stopButton.removeAttribute("disabled")
    BPM = document.querySelector('.controls input').value;
    tempo = (240 / BPM) * 1000;
    primaRunSeq();
}