const colorPicker = document.getElementById("colorPicker");
const colorPreview = document.getElementById("colorPreview");
const colorCode = document.getElementById("colorCode");
const copyBtn = document.getElementById("copyBtn");
const randomBtn = document.getElementById("randomBtn");
const msg = document.getElementById("msg");

// Update color when user picks
colorPicker.addEventListener("input", () => {
    const color = colorPicker.value;
    updateColor(color);
});

// Copy HEX code
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(colorCode.textContent);
    msg.textContent = "Copied!";
    setTimeout(() => msg.textContent = "", 1500);
});

// Random color generator
randomBtn.addEventListener("click", () => {
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
    updateColor(randomColor);
    colorPicker.value = randomColor;
});

function updateColor(color) {
    colorPreview.style.background = color;
    colorCode.textContent = color;
}
