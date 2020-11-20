let title = document.getElementById('title');
let body = document.getElementById('body');
let days = document.getElementById('days');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById("seconds");

function setDone() {
    title.innerHTML = 'Happy New Year!';
    body.style.backgroundColor = 'rgb(255, 153, 203)';
    days.innerHTML = 'D';
    hours.innerHTML = 'O';
    minutes.innerHTML = 'N';
    seconds.innerHTML = 'E';
    window.clearInterval(everySec);
}

function update() {
    let current = new Date();
    let newYear = new Date(current.getFullYear() + 1, 1, 1);

    let t = newYear - current;

    seconds.innerHTML = Math.floor( (t/1000) % 60 );
    minutes.innerHTML = Math.floor( (t/1000/60) % 60 );
    hours.innerHTML = Math.floor( (t/(1000*60*60)) % 24 );
    days.innerHTML = Math.floor( t/(1000*60*60*24) );

    if (current.getMonth() == 1 && current.getDay() == 1) {
        setDone();
    }
}

update();

let everySec = window.setInterval(function() {
    update();
}, 1000);
