// Get elements
const flipBtn = document.getElementById('flip-btn');
const resetBtn = document.getElementById('reset-btn');
const coin = document.getElementById('coin');
const result = document.getElementById('result');
const totalEl = document.getElementById('total');
const headsEl = document.getElementById('heads');
const tailsEl = document.getElementById('tails');

// Counters
let totalFlips = 0;
let headsCount = 0;
let tailsCount = 0;

// Flip coin function
flipBtn.addEventListener('click', () => {
    const isHeads = Math.random() < 0.5; // 50/50 chance

    // Animation
    coin.style.transform = "rotateY(720deg)";

    setTimeout(() => {
        if (isHeads) {
            coin.src = "assets/coin-head.png";
            result.textContent = "Heads!";
            headsCount++;
        } else {
            coin.src = "assets/coin-tail1.png";
            result.textContent = "Tails!";
            tailsCount++;
        }

        totalFlips++;
        updateCounters();

        // Reset animation
        coin.style.transform = "rotateY(0deg)";
    }, 600);
});

// Reset function
resetBtn.addEventListener('click', () => {
    totalFlips = 0;
    headsCount = 0;
    tailsCount = 0;
    result.textContent = "";
    coin.src = "assets/coin-head.png";
    updateCounters();
});

// Update counter display
function updateCounters() {
    totalEl.textContent = totalFlips;
    headsEl.textContent = headsCount;
    tailsEl.textContent = tailsCount;
}
