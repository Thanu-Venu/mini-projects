const rgbDisplay = document.getElementById("rgbDisplay");
const colorBoxes = document.querySelectorAll(".colorBox");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

let colors = [];
let pickedColor;

// Generate a new game on load
init();

function init() {
    generateColors();
    setColors();
    message.textContent = "";
}

// 🎨 Generate random colors
function generateColors() {
    colors = [];
    for (let i = 0; i < 6; i++) {
        colors.push(randomColor());
    }
    pickedColor = colors[Math.floor(Math.random() * 6)];
    rgbDisplay.textContent = pickedColor.toUpperCase();
}

// 🎯 Apply colors to boxes
function setColors() {
    colorBoxes.forEach((box, index) => {
        box.style.backgroundColor = colors[index];

        box.onclick = function () {
            if (this.style.backgroundColor === pickedColor) {
                message.textContent = "Correct 🎉";
                changeAllToCorrect();
            } else {
                this.style.opacity = "0";
                message.textContent = "Try Again ❌";
            }
        };
    });
}

// Replace all boxes with the correct color
function changeAllToCorrect() {
    colorBoxes.forEach(box => {
        box.style.backgroundColor = pickedColor;
        box.style.opacity = "1";
    });
}

// 🎲 Random RGB color generator
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Reset Button
resetBtn.onclick = function () {
    init();
};
