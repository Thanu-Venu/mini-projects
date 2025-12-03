const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultMessage = document.getElementById("result-message");
const choiceButtons = document.querySelectorAll(".choice");
const resetBtn = document.getElementById("reset-btn");

let playerScore = 0;
let computerScore = 0;

// Computer random choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Determine winner
function decideWinner(player, computer) {
    if (player === computer) return "tie";

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "player";
    }

    return "computer";
}

// Gameplay
choiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        const playerChoice = button.getAttribute("data-choice");
        const computerChoice = getComputerChoice();

        const winner = decideWinner(playerChoice, computerChoice);

        if (winner === "player") {
            playerScore++;
            resultMessage.textContent = `You Win! ${playerChoice} beats ${computerChoice}`;
        } else if (winner === "computer") {
            computerScore++;
            resultMessage.textContent = `You Lose! ${computerChoice} beats ${playerChoice}`;
        } else {
            resultMessage.textContent = `It's a Tie! You both chose ${playerChoice}`;
        }

        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;
    });
});

// Reset game
resetBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;

    playerScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;

    resultMessage.textContent = "Make your move!";
});

const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Fun bot replies
function botResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello")) return "Hello! Ready to lose? 😎";
    if (msg.includes("how are you")) return "I'm feeling electric today ⚡😂";
    if (msg.includes("who will win")) return "Probably me 😏";
    if (msg.includes("what are you doing")) return "Just playing with you 😺";
    if (msg.includes("good")) return "Great! Let's keep going!";
    if (msg.includes("bye")) return "Bye! Come back when you're brave 😄";
    if (msg.includes("rock")) return "Rock? Bold choice!";
    if (msg.includes("paper")) return "Paper... hmm, interesting.";
    if (msg.includes("scissors")) return "Scissors? Sharp move!";
    if (msg.includes("score")) return `Current score → You: ${playerScore}, Me: ${computerScore}`;
    
    return "I didn’t fully get that, but I’m still ready to play! 😄";
}

// Auto bot comments after each round
function botAutoTalk() {
    const messages = [
        "Nice move!",
        "Ooh interesting...",
        "I'm getting better at this!",
        "That was unexpected 👀",
        "Are you trying to beat me? 😎"
    ];
    addBotMessage(messages[Math.floor(Math.random() * messages.length)]);
}

// Show user message
function addUserMessage(text) {
    const div = document.createElement("div");
    div.classList.add("message", "user-msg");
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Show bot message
function addBotMessage(text) {
    const div = document.createElement("div");
    div.classList.add("message", "bot-msg");
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle chat send
sendBtn.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if (text === "") return;

    addUserMessage(text);
    chatInput.value = "";

    setTimeout(() => {
        addBotMessage(botResponse(text));
    }, 500);
});

// Enter key supports chat
chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendBtn.click();
});