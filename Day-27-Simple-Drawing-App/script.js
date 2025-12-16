const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.6;

let drawing = false;
let tool = "brush";
let shape = "free";
let startX, startY;
let snapshot;

let history = [];
let redoStack = [];

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const sizeValue = document.getElementById("sizeValue");

sizeValue.textContent = brushSize.value;
brushSize.oninput = () => sizeValue.textContent = brushSize.value;

document.getElementById("brush").onclick = () => tool = "brush";
document.getElementById("eraser").onclick = () => tool = "eraser";

document.getElementById("shape").onchange = (e) => shape = e.target.value;

document.querySelectorAll(".color").forEach(btn => {
    btn.onclick = () =>
        colorPicker.value = getComputedStyle(btn).backgroundColor;
});

/* ---------- IMPORTANT FIX ---------- */
saveState(); // Save initial blank canvas
/* ---------------------------------- */

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;

    if (shape !== "free") {
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    ctx.beginPath();
    ctx.moveTo(startX, startY);
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = tool === "eraser" ? "white" : colorPicker.value;

    const currentX = e.offsetX;
    const currentY = e.offsetY;

    if (shape === "free") {
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
    } else {
        ctx.putImageData(snapshot, 0, 0);

        if (shape === "line") {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
        }

        if (shape === "rect") {
            ctx.strokeRect(
                startX,
                startY,
                currentX - startX,
                currentY - startY
            );
        }

        if (shape === "circle") {
            const radius = Math.hypot(
                currentX - startX,
                currentY - startY
            );
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
    saveState();
});

/* ---------- UNDO / REDO ---------- */
document.getElementById("undo").onclick = undo;
document.getElementById("redo").onclick = redo;

function saveState() {
    history.push(canvas.toDataURL());
    redoStack = [];
}

function undo() {
    if (history.length <= 1) return;

    redoStack.push(history.pop());
    restore(history[history.length - 1]);
}

function redo() {
    if (!redoStack.length) return;

    const img = redoStack.pop();
    history.push(img);
    restore(img);
}

function restore(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };
}
/* -------------------------------- */

document.getElementById("clear").onclick = () => {
    if (confirm("Clear canvas?")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        saveState();
    }
};

document.getElementById("save").onclick = () => {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
};

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "z") undo();
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        document.getElementById("save").click();
    }
});
