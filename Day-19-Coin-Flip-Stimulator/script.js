// Elements
const flipBtn = document.getElementById('flip-btn');
const resetBtn = document.getElementById('reset-btn');
const coin = document.getElementById('coin');
const resultEl = document.getElementById('result');
const totalEl = document.getElementById('total');
const headsEl = document.getElementById('heads');
const tailsEl = document.getElementById('tails');
const probabilityEl = document.getElementById('probability');
const streakEl = document.getElementById('streak');
const historyEl = document.getElementById('history');

// Audio
const flipSound = new Audio('assets/coin-flip.mp3');

// Counters
let totalFlips = 0;
let headsCount = 0;
let tailsCount = 0;
let currentStreak = 0;
let lastFlip = '';
let history = [];

// Flip coin
flipBtn.addEventListener('click', () => {
    const isHeads = Math.random() < 0.5;
    const flipResult = isHeads ? 'Heads' : 'Tails';

    // Play sound
    flipSound.play();

    // Animation
    coin.style.transform = "rotateY(720deg)";

    setTimeout(() => {
        coin.src = isHeads ? "assets/coin-head.png" : "assets/coin-tail1.png";
        resultEl.textContent = flipResult;

        // Update counters
        totalFlips++;
        if(isHeads) headsCount++; else tailsCount++;

        // Update streak
        if(flipResult === lastFlip) {
            currentStreak++;
        } else {
            currentStreak = 1;
            lastFlip = flipResult;
        }

        // Update history
        history.unshift(flipResult);
        if(history.length > 5) history.pop();

        // Update display
        totalEl.textContent = totalFlips;
        headsEl.textContent = headsCount;
        tailsEl.textContent = tailsCount;
        streakEl.textContent = `Current Streak: ${currentStreak} ${flipResult}s`;
        historyEl.textContent = history.join(' | ');

        // Probability
        const headsProb = ((headsCount / totalFlips) * 100).toFixed(1);
        const tailsProb = ((tailsCount / totalFlips) * 100).toFixed(1);
        probabilityEl.textContent = `Heads: ${headsProb}% | Tails: ${tailsProb}%`;

        // Reset animation
        coin.style.transform = "rotateY(0deg)";
    }, 800);
});

// Reset
resetBtn.addEventListener('click', () => {
    totalFlips = 0;
    headsCount = 0;
    tailsCount = 0;
    currentStreak = 0;
    lastFlip = '';
    history = [];

    resultEl.textContent = '';
    coin.src = "assets/coin-head.png";
    totalEl.textContent = 0;
    headsEl.textContent = 0;
    tailsEl.textContent = 0;
    streakEl.textContent = `Current Streak: 0`;
    probabilityEl.textContent = `Heads: 0% | Tails: 0%`;
    historyEl.textContent = '';
});
