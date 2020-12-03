//AUDIO
const primaAudio = new Audio('./audio/hh.mp3')

//DATA COMMON
const playButton = document.querySelector('.controls button[name="play"]');
const stopButton = document.querySelector('.controls button[name="stop"]');
let BPM = 0;
let tempo = 0;
let stepInput = {} ;
let stepAmount = 0;
let steps = [];
let playState = false;

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
function runSeq(track, audio) {
    playState = true;
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

//TRANSPORT
function play() {
    playButton.setAttribute("disabled", true);
    stopButton.removeAttribute("disabled")
    BPM = document.querySelector('.controls input').value;
    tempo = (240 / BPM) * 1000;
    runSeq('prima', primaAudio)
}

function stop() {
    stopButton.setAttribute("disabled", true);
    playButton.removeAttribute("disabled")    
    playState = false
}



/*
//PRIMA RUN SEQ LOOP
function runSeq(track, audio,) {
    stepInput = document.querySelector(`#${track} input[name="stepcount"]`);
    stepAmount = parseFloat(stepInput.value);
    steps = document.querySelectorAll(`#${track} label.step`);
    let step = document.querySelectorAll(`#${track} label.step input`);
    const stepTime = tempo / stepAmount;
    let currentStep = 0;
    let prevStep = 0;
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
            },
            stepTime
        );
} */