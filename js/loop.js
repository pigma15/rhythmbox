const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label')

console.log(labels);

const bak = document.querySelector('.param');

let patternLength = 5

let Seq = 0;
let prevSeq = 2;
setInterval(
    function loop() {
        labels[prevSeq].style.backgroundColor = 'black' ;
        labels[Seq].style.backgroundColor = 'orange' ;
        if (inputs[Seq].checked) {
            console.log('sound');
        }
        if (!inputs[Seq].checked) {
            console.log('sound');
        }
        Seq += 1
        if (Seq === 3) {
            Seq = 0
        }
        prevSeq += 1
        if (prevSeq === 3) {
            prevSeq = 0
        }
    },
    500
);