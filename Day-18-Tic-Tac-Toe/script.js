const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");
const drawScoreText = document.getElementById("drawScore");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

let xScore = 0, oScore = 0, drawScore = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
    cell.addEventListener("keydown", handleKeyboard);
});

// --------------------------------------------------
// 1️⃣ CLICK INPUT
// --------------------------------------------------
function handleClick(e) {
    playMove(e.target);
}

// --------------------------------------------------
// 2️⃣ KEYBOARD NAVIGATION (Arrows + Enter)
// --------------------------------------------------
function handleKeyboard(e) {
    const index = Number(e.target.dataset.index);

    const moveFocus = dir => {
        let next = index + dir;
        if (next >= 0 && next < 9) cells[next].focus();
    };

    switch (e.key) {
        case "ArrowRight": moveFocus(1); break;
        case "ArrowLeft":  moveFocus(-1); break;
        case "ArrowUp":    moveFocus(-3); break;
        case "ArrowDown":  moveFocus(3); break;
        case "Enter":      playMove(e.target); break;
    }
}

// --------------------------------------------------
// MAIN MOVE FUNCTION
// --------------------------------------------------
function playMove(cell) {
    const index = cell.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
}

// --------------------------------------------------
// CHECK WINNER + ANIMATION
// --------------------------------------------------
function checkWinner() {
    let roundWon = false;
    let winPattern = null;

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winPattern = pattern;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;

        // Highlight winning cells
        winPattern.forEach(i => {
            cells[i].classList.add("win");
        });

        updateScore(currentPlayer);
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "😲 It's a Draw!";
        gameActive = false;
        updateScore("draw");
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// --------------------------------------------------
// UPDATE SCOREBOARD
// --------------------------------------------------
function updateScore(result) {
    if (result === "X") xScore++;
    else if (result === "O") oScore++;
    else drawScore++;

    xScoreText.textContent = xScore;
    oScoreText.textContent = oScore;
    drawScoreText.textContent = drawScore;
}

// --------------------------------------------------
// RESTART GAME
// --------------------------------------------------
restartBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";

    statusText.textContent = `Player X's Turn`;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
});
