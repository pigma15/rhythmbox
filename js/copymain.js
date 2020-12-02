//DATA
const seq = document.querySelector('div.seq > form');





//STEP COUNT
function stepCount() {
    const stepInput = document.querySelector('input[name="stepcount"');
    const stepAmount = parseFloat(stepInput.value);
    let HTML = '';
    for (i = 1; i <= stepAmount; i++) {
        HTML += `<label class="step">
        <input type="checkbox" value="${i}">
        <span></span>
    </label>`
    }
    seq.innerHTML = HTML;
}

//RUN SEQ LOOP
function runSeq() {
    const BPM = document.querySelector('.controls input').value;
    const tempo = (240 / BPM) * 1000;
    const stepAmount = parseFloat(document.querySelector('input[name="stepcount"').value);
    let currentStep = 0;
    let prevStep = stepAmount - 1;
    const steps = document.querySelectorAll('label.step');
        setInterval(
            function playLoop() {
                console.log(`cur: ${currentStep}`);
                steps[currentStep].style.backgroundColor = 'orange';
                steps[prevStep].style.backgroundColor = 'black';
                console.log(`prev: ${prevStep}`);
                currentStep += 1;
                if (currentStep === stepAmount) {
                    currentStep = 0;
                }
                prevStep += 1;
                if (prevStep === stepAmount) {
                    prevStep = 0;
                }
            },
            tempo / stepAmount
        );
}


