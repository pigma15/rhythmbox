//DATA
const seq = document.querySelector('div.seq > form');


let BPM = document.querySelector('.controls input').value;
let tempo = 0;
let stepAmount = 0;
let steps = [];

//STEP COUNT
function stepCount() {
    const stepInput = document.querySelector('input[name="stepcount"]');
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

console.log(parseFloat(document.querySelector('input[name="stepcount"]').value));

//RUN SEQ LOOP
function runSeq() {
    BPM = document.querySelector('.controls input').value;
    tempo = (240 / BPM) * 1000;
    stepCount();
    let currentStep = 0;
    let prevStep = 0;
        setInterval(
            function playLoop() {
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
                currentStep += 1;
                if (currentStep > stepAmount - 1) {
                    currentStep = 0;
                }
                prevStep += 1;
                if (prevStep > stepAmount - 1) {
                    prevStep = 0;
                }
            },
            tempo / stepAmount
        );
}


