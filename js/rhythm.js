//DIRECTORIES
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