// ======= VARIABLES =======
let countdown;
let remainingTime = 0;
let totalTime = 0;
let isPaused = false;

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const dateInput = document.getElementById("dateInput");
const alarmSound = new Audio("alarm.mp3"); // Add your alarm sound in the project folder

// ======= LOAD SAVED TIMER =======
window.addEventListener("load", () => {
    const saved = localStorage.getItem("savedTime");
    if (saved) {
        dateInput.value = saved;
        const savedTarget = new Date(saved).getTime();
        const now = new Date().getTime();

        if (savedTarget > now) {
            totalTime = savedTarget - now;
            remainingTime = totalTime;
            startCountdown(remainingTime);
        }
    }
});

// ======= START BUTTON =======
startBtn.addEventListener("click", () => {
    clearInterval(countdown);
    const selectedTime = new Date(dateInput.value).getTime();

    if (!selectedTime) {
        alert("Please select a valid date/time");
        return;
    }

    localStorage.setItem("savedTime", dateInput.value);

    totalTime = selectedTime - new Date().getTime();
    remainingTime = totalTime;

    startCountdown(remainingTime);

    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
});

// ======= COUNTDOWN FUNCTION =======
function startCountdown(timeLeft) {
    clearInterval(countdown);

    countdown = setInterval(() => {
        if (!isPaused) {
            timeLeft -= 1000;
            remainingTime = timeLeft;

            if (remainingTime <= 0) {
                clearInterval(countdown);
                updateTimer(0, 0, 0, 0);
                document.getElementById("message").innerText = "🎉 Time's Up!";
                alarmSound.play();
                localStorage.removeItem("savedTime");
                document.getElementById("progressBar").style.width = "0%";
                return;
            }

            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            updateTimer(days, hours, minutes, seconds);

            // Update progress bar
            const progress = (remainingTime / totalTime) * 100;
            document.getElementById("progressBar").style.width = progress + "%";
        }
    }, 1000);
}

// ======= PAUSE BUTTON =======
pauseBtn.addEventListener("click", () => {
    isPaused = true;
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
});

// ======= RESUME BUTTON =======
resumeBtn.addEventListener("click", () => {
    isPaused = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
});

// ======= RESET BUTTON =======
resetBtn.addEventListener("click", () => {
    clearInterval(countdown);
    dateInput.value = "";
    localStorage.removeItem("savedTime");
    document.getElementById("message").innerText = "";
    document.getElementById("progressBar").style.width = "100%";
    updateTimer(0, 0, 0, 0);
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
});

// ======= UPDATE TIMER DISPLAY =======
function updateTimer(days, hours, minutes, seconds) {
    document.getElementById("days").innerText = pad(days);
    document.getElementById("hours").innerText = pad(hours);
    document.getElementById("minutes").innerText = pad(minutes);
    document.getElementById("seconds").innerText = pad(seconds);
}

// ======= PAD NUMBERS =======
function pad(n) {
    return n < 10 ? "0" + n : n;
}
