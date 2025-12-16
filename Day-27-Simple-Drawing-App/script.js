const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearBtn = document.getElementById("clearBtn");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.6;

let isDrawing = false;

// Start drawing
canvas.addEventListener("mousedown", () => {
    isDrawing = true;
    ctx.beginPath();
});

// Stop drawing
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

// Draw on canvas
canvas.addEventListener("mousemove", draw);

function draw(event) {
    if (!isDrawing) return;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

// Clear canvas
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.6;
});
