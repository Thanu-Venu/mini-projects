// ---------------- Rock Paper Scissors Game ----------------
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultMessage = document.getElementById("result-message");
const choiceButtons = document.querySelectorAll(".choice");
const resetBtn = document.getElementById("reset-btn");
const bestOfSelect = document.getElementById("best-of");
const historyList = document.getElementById("history-list");

const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
let bestOf = parseInt(bestOfSelect.value);
let history = [];

const sounds = {
    win: new Audio("https://freesound.org/data/previews/320/320181_5260878-lq.mp3"),
    lose: new Audio("https://freesound.org/data/previews/320/320184_5260878-lq.mp3"),
    tie: new Audio("https://freesound.org/data/previews/320/320182_5260878-lq.mp3")
};

// Get Computer Choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Decide winner
function decideWinner(player, computer) {
    if (player === computer) return "tie";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) return "player";
    return "computer";
}

// Update history
function updateHistory(playerChoice, computerChoice, result) {
    history.unshift(`${playerChoice} vs ${computerChoice} → ${result}`);
    if (history.length > 5) history.pop();
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    history.forEach(h => {
        const li = document.createElement("li");
        li.textContent = h;
        historyList.appendChild(li);
    });
}

// Play round
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = decideWinner(playerChoice, computerChoice);

    roundsPlayed++;

    let msg = "";
    if (winner === "player") {
        playerScore++;
        msg = `You Win! ${playerChoice} beats ${computerChoice}`;
        sounds.win.play();
    } else if (winner === "computer") {
        computerScore++;
        msg = `You Lose! ${computerChoice} beats ${playerChoice}`;
        sounds.lose.play();
    } else {
        msg = `It's a Tie! Both chose ${playerChoice}`;
        sounds.tie.play();
    }

    resultMessage.textContent = msg;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;

    updateHistory(playerChoice, computerChoice, winner.toUpperCase());

    checkBestOf();
}

// Check best-of-N
function checkBestOf() {
    const targetWins = Math.ceil(bestOf / 2);
    if (playerScore === targetWins) {
        alert(`🎉 You won the Best of ${bestOf}!`);
        resetGame();
    } else if (computerScore === targetWins) {
        alert(`💻 Computer won the Best of ${bestOf}!`);
        resetGame();
    }
}

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    history = [];
    playerScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    resultMessage.textContent = "Make your move!";
    renderHistory();
}

// Button click
choiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        const playerChoice = button.getAttribute("data-choice");
        animateButton(button);
        playRound(playerChoice);
    });
});

// Keyboard control
document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "R") playRound("rock");
    if (key === "P") playRound("paper");
    if (key === "S") playRound("scissors");
});

// Animate button
function animateButton(button) {
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 150);
}

// Change best-of value
bestOfSelect.addEventListener("change", () => {
    bestOf = parseInt(bestOfSelect.value);
    resetGame();
});

// Reset button
resetBtn.addEventListener("click", resetGame);

// ---------------- Chatbot ----------------
function addUserMessage(text) {
    const div = document.createElement("div");
    div.classList.add("message", "user-msg");
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addBotMessage(text) {
    const div = document.createElement("div");
    div.classList.add("message", "bot-msg");
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Basic fun bot reply
function botResponse(msg) {
    const text = msg.toLowerCase();

    // Greetings
    if (text.includes("hi") || text.includes("hello")) {
        const greetings = [
            "Hello! Ready to play? 😎",
            "Hey there! Let's see if you can beat me! ✌️",
            "Hi! Choose your move wisely 🪨📄✂️"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Asking about winning
    if (text.includes("win") || text.includes("victory")) {
        const winReplies = [
            "You think you can beat me? 😏",
            "Haha, I won't make it easy for you! 😎",
            "Winning is fun, but losing is also part of the game 😜"
        ];
        return winReplies[Math.floor(Math.random() * winReplies.length)];
    }

    // Asking about score
    if (text.includes("score") || text.includes("points")) {
        return `Score → You: ${playerScore}, Computer: ${computerScore}`;
    }

    // Asking for help or hint
    if (text.includes("hint") || text.includes("help") || text.includes("tip")) {
        const hints = [
            "Hmm… I think you might choose Rock next 😏",
            "Paper beats Rock, Scissors beats Paper… choose wisely! ✌️",
            "Trust your instincts!"
        ];
        return hints[Math.floor(Math.random() * hints.length)];
    }

    // Asking about rounds/history
    if (text.includes("history") || text.includes("rounds")) {
        if (history.length === 0) return "No rounds played yet!";
        return "Last rounds:\n" + history.slice(0, 5).join("\n");
    }

    // Compliments / Fun
    if (text.includes("good") || text.includes("nice") || text.includes("well done")) {
        const compliments = [
            "Thanks! You're a tough opponent 😎",
            "Haha, you're doing great! Keep going ✌️",
            "I like your style! 🪨📄✂️"
        ];
        return compliments[Math.floor(Math.random() * compliments.length)];
    }

    // Losing / Frustration
    if (text.includes("lost") || text.includes("no") || text.includes("bad")) {
        const frustrations = [
            "Don't worry! You'll get me next time 😏",
            "Losing is just a way to learn 😉",
            "Haha, I'm tough! Keep trying ✌️"
        ];
        return frustrations[Math.floor(Math.random() * frustrations.length)];
    }

    // Saying bye
    if (text.includes("bye") || text.includes("see you") || text.includes("exit")) {
        const bye = [
            "Bye! Come back soon! 😄",
            "See you later! Don’t forget to play more! ✌️",
            "Goodbye! Hope you win next time! 🪨📄✂️"
        ];
        return bye[Math.floor(Math.random() * bye.length)];
    }

    // Random fun fallback
    const fallback = [
        "Haha, let's keep playing! ✌️",
        "I like your enthusiasm 😎",
        "Are you trying to distract me? 😏",
        "Nice move! But can you beat me?",
        "Let's see who wins the next round 🪨📄✂️"
    ];
    return fallback[Math.floor(Math.random() * fallback.length)];
}


sendBtn.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if (!text) return;
    addUserMessage(text);
    chatInput.value = "";
    addBotMessage(botResponse(text));
});

chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendBtn.click();
});
