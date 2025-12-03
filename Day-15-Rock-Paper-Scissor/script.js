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
