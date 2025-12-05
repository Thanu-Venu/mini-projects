// ==== DOM ELEMENTS ====
const cards = document.querySelectorAll(".card");
const moveDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const bestTimeDisplay = document.getElementById("best-time");
const restartBtn = document.getElementById("restartBtn");

// ==== GAME STATE ====
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let totalSeconds = 0;
let interval;
let firstClick = true;

// ==== FUNCTIONS ====

// Shuffle cards on page load
function shuffleCards() {
    cards.forEach(card => {
        const rand = Math.floor(Math.random() * cards.length);
        card.style.order = rand;
    });
}

// Start game timer
function startTimer() {
    interval = setInterval(() => {
        totalSeconds++;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.textContent =
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds);
    }, 1000);
}

// Reset turn
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Save best time in localStorage
function saveBestTime() {
    let best = localStorage.getItem("bestTime");
    if (!best || totalSeconds < parseInt(best)) {
        localStorage.setItem("bestTime", totalSeconds);
    }
    displayBestTime();
}

// Display best time
function displayBestTime() {
    let best = localStorage.getItem("bestTime");
    if (best) {
        const minutes = Math.floor(best / 60);
        const seconds = best % 60;
        bestTimeDisplay.textContent =
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds);
    } else {
        bestTimeDisplay.textContent = "--:--";
    }
}

// Check if two flipped cards match
function checkMatch() {
    lockBoard = true;

    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        // Show matched glow or special corrected image
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        resetTurn();
    } else {
        // Flip back after a short delay
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 800);
    }

    // Check if all cards are matched
    if (document.querySelectorAll(".card.matched").length === cards.length) {
        clearInterval(interval); // stop timer
        saveBestTime();
        setTimeout(() => {
            alert(`🎉 You won!\nMoves: ${moves}\nTime: ${timerDisplay.textContent}`);
        }, 300);
    }
}

// ==== EVENT LISTENERS ====

// Card click
cards.forEach(card => {
    card.addEventListener("click", () => {
        if (lockBoard) return;
        if (card === firstCard) return;

        // Start timer on first click
        if (firstClick) {
            startTimer();
            firstClick = false;
        }

        card.classList.add("flipped");

        // Increment moves
        moves++;
        moveDisplay.textContent = moves;

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            // Delay match check for smooth flip animation
            setTimeout(() => checkMatch(), 300);
        }
    });
});

// Restart button
restartBtn.addEventListener("click", () => {
    location.reload();
});

// ==== INIT GAME ====
shuffleCards();
displayBestTime();
