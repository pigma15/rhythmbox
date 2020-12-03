//DATA
const seq = document.querySelector('div.seq > form');
const hat = new Audio('./audio/hh.mp3')
let stepInput = document.querySelector('input[name="stepcount"]');
const playButton = document.querySelector('.controls button');



let BPM = 0;
let tempo = 0;
let stepAmount = 0;
let steps = [];




//STEP COUNT
function stepCount() {
    stepInput = document.querySelector('input[name="stepcount"]');
    stepAmount = parseFloat(stepInput.value);
    let HTML = '';
    for (i = 1; i <= stepAmount; i++) {
        HTML += `<label class="step">
        <input type="checkbox" value="${i}">
        <span></span>
    </label>`
    }
    seq.innerHTML = HTML;
    steps = document.querySelectorAll('label.step');
}

//RUN SEQ LOOP
function runSeq() {
    stepInput.setAttribute("disabled", true);
    playButton.setAttribute("disabled", true);
    BPM = document.querySelector('.controls input').value;
    tempo = (240 / BPM) * 1000;
    stepCount();
    let stepTime = tempo / stepAmount
    let currentStep = 0;
    let prevStep = 0;
        setInterval(
            function() {
                let step = document.querySelectorAll('label.step > input');
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
                    hat.play();
                        setTimeout(() => {
                            hat.pause();
                            hat.load();
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
}
