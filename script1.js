const timerDisplay = document.querySelector('.timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsList');

let msec = 0, secs = 0, mins = 0;
let timerId = null;

function updateButtonStates(running) {
    if (running) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        lapBtn.disabled = false;
        resetBtn.disabled = false;
    } else {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        lapBtn.disabled = true;
        // Keep reset enabled if there's time on the clock
        resetBtn.disabled = (msec === 0 && secs === 0 && mins === 0);
    }
}

startBtn.onclick = function() {
    if (timerId !== null) clearInterval(timerId);
    timerId = setInterval(startTimer, 10);
    startBtn.innerText = "Resume";
    updateButtonStates(true);
};

stopBtn.onclick = function() {
    clearInterval(timerId);
    timerId = null;
    updateButtonStates(false);
};

resetBtn.onclick = function() {
    clearInterval(timerId);
    timerId = null;
    msec = secs = mins = 0;
    timerDisplay.innerHTML = "00 : 00 : 00";
    lapsContainer.innerHTML = "";
    startBtn.innerText = "Start";
    updateButtonStates(false);
};

lapBtn.onclick = function() {
    if (timerId !== null) {
        const li = document.createElement('li');
        const lapCount = lapsContainer.childElementCount + 1;
        li.innerHTML = `
            <span style="color: #94a3b8;">Lap ${lapCount}</span>
            <span style="font-weight: bold;">${timerDisplay.innerHTML}</span>
        `;
        lapsContainer.prepend(li);
    }
};

function startTimer() {
    msec++;
    if (msec == 100) {
        msec = 0;
        secs++;
        if (secs == 60) {
            secs = 0;
            mins++;
        }
    }
    
    const ms = msec < 10 ? `0${msec}` : msec;
    const s = secs < 10 ? `0${secs}` : secs;
    const m = mins < 10 ? `0${mins}` : mins;
    
    timerDisplay.innerHTML = `${m} : ${s} : ${ms}`;
}
