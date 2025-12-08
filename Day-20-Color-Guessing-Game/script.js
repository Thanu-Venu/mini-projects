const rgbDisplay = document.getElementById("rgbDisplay");
const colorBoxes = document.querySelectorAll(".colorBox");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");
const timerToggle = document.getElementById("timerToggle");
const timerBox = document.getElementById("timer");
const timeValue = document.getElementById("time");

let colors = [];
let pickedColor;
let numberOfBoxes = 6;

let gameLocked = false;   // ⭐ Prevent actions after correct answer
let score = 0;
let streak = 0;

let timeLeft = 10;
let timerEnabled = false;
let timerInterval;

// Load best score
let bestScore = localStorage.getItem("bestScore") || 0;
document.getElementById("bestScore").textContent = bestScore;

// Start game
init();

function init() {
    gameLocked = false; // 🔓 Unlock game at the start of each round
    message.textContent = "";

    generateColors(numberOfBoxes);
    setColors();
    resetTimer();
}

function resetTimer() {
    if (!timerEnabled) return;

    clearInterval(timerInterval);
    timeLeft = 10;
    timeValue.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timeValue.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            message.textContent = "⏳ Time's Up!";
            revealCorrect();
            gameLocked = true; // Lock game if time finishes
        }
    }, 1000);
}

// ⭐ Mode Buttons
easyBtn.onclick = () => {
    numberOfBoxes = 3;
    easyBtn.classList.add("active");
    hardBtn.classList.remove("active");

    colorBoxes.forEach((box, i) => {
        box.style.display = i < 3 ? "block" : "none";
    });

    init();
};

hardBtn.onclick = () => {
    numberOfBoxes = 6;
    hardBtn.classList.add("active");
    easyBtn.classList.remove("active");

    colorBoxes.forEach(box => box.style.display = "block");

    init();
};

// Timer toggle
timerToggle.onclick = () => {
    timerEnabled = !timerEnabled;
    timerToggle.textContent = timerEnabled ? "Timer ON" : "Timer OFF";

    if (timerEnabled) {
        timerBox.classList.remove("hidden");
        resetTimer();
    } else {
        timerBox.classList.add("hidden");
        clearInterval(timerInterval);
    }
};

// Reset button
resetBtn.onclick = init;

// 🎨 Generate random colors
function generateColors(num) {
    colors = [];
    for (let i = 0; i < num; i++) {
        colors.push(randomColor());
    }
    pickedColor = colors[Math.floor(Math.random() * num)];
    rgbDisplay.textContent = pickedColor.toUpperCase();
}

// 🎯 Set colors on boxes
function setColors() {
    colorBoxes.forEach((box, index) => {
        if (colors[index]) {
            box.style.backgroundColor = colors[index];
            box.style.opacity = "1";

            box.onclick = function () {
                if (gameLocked) return; // ⛔ Prevent any clicks after win/timeout

                if (this.style.backgroundColor === pickedColor) {
                    correctAnswer();
                } else {
                    wrongAnswer(this);
                }
            };
        }
    });
}

// ✔ Correct Answer Logic
function correctAnswer() {
    message.textContent = "Correct 🎉";

    clearInterval(timerInterval);
    gameLocked = true; // stop further clicks

    score++;
    streak++;
    updateScoreboard();

    revealCorrect();

    colorBoxes.forEach(box => {
        box.classList.add("correct-animation");
        setTimeout(() => box.classList.remove("correct-animation"), 600);
    });

    // ⭐ Automatically load new colors after 1.5 seconds
    setTimeout(() => {
        init();
    }, 1500);
}


// ✖ Wrong Answer Logic
function wrongAnswer(box) {
    if (gameLocked) return;

    message.textContent = "Try Again ❌";
    streak = 0;

    updateScoreboard();
    box.style.opacity = "0";
}

// Update Score Panel
function updateScoreboard() {
    document.getElementById("score").textContent = score;
    document.getElementById("streak").textContent = streak;

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        document.getElementById("bestScore").textContent = bestScore;
    }
}

// Make all boxes show correct color
function revealCorrect() {
    colorBoxes.forEach(box => {
        if (box.style.display !== "none") {
            box.style.backgroundColor = pickedColor;
            box.style.opacity = "1";
        }
    });
}

// Generate RGB color
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
