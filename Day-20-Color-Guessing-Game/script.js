const rgbDisplay = document.getElementById("rgbDisplay");
const colorBoxes = document.querySelectorAll(".colorBox");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");

let colors = [];
let pickedColor;
let numberOfBoxes = 6; // default hard mode

// Start the game
init();

function init() {
    message.textContent = "";
    generateColors(numberOfBoxes);
    setColors();
}

// ⭐ Mode Buttons
easyBtn.addEventListener("click", function () {
    numberOfBoxes = 3;
    easyBtn.classList.add("active");
    hardBtn.classList.remove("active");
    init();

    // Hide last 3 boxes
    for (let i = 3; i < 6; i++) {
        colorBoxes[i].style.display = "none";
    }
});

hardBtn.addEventListener("click", function () {
    numberOfBoxes = 6;
    hardBtn.classList.add("active");
    easyBtn.classList.remove("active");
    init();

    // Show all boxes
    colorBoxes.forEach(box => box.style.display = "block");
});

// ⭐ Reset Button
resetBtn.addEventListener("click", init);

// 🎨 Generate random colors
function generateColors(num) {
    colors = [];
    for (let i = 0; i < num; i++) {
        colors.push(randomColor());
    }
    pickedColor = colors[Math.floor(Math.random() * num)];
    rgbDisplay.textContent = pickedColor.toUpperCase();
}

// 🎯 Set colors to boxes
function setColors() {
    colorBoxes.forEach((box, index) => {
        if (colors[index]) {
            box.style.backgroundColor = colors[index];
            box.style.opacity = "1";

            box.onclick = function () {
                if (this.style.backgroundColor === pickedColor) {
                    message.textContent = "Correct 🎉";
                    revealCorrect();
                } else {
                    this.style.opacity = "0";
                    message.textContent = "Try Again ❌";
                }
            };
        }
    });
}

// Highlight correct color across all boxes
function revealCorrect() {
    colorBoxes.forEach(box => {
        if (box.style.display !== "none") {
            box.style.backgroundColor = pickedColor;
            box.style.opacity = "1";
        }
    });
}

// 🎲 Random RGB generator
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
