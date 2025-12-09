const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const resultBox = document.getElementById("result");
const categoryBox = document.getElementById("category");
const historyList = document.getElementById("historyList");

const maleBtn = document.getElementById("maleBtn");
const femaleBtn = document.getElementById("femaleBtn");

// Gender theme toggle
maleBtn.addEventListener("click", () => {
    document.body.classList.remove("female-theme");
    document.body.classList.add("male-theme");
    maleBtn.classList.add("active");
    femaleBtn.classList.remove("active");
});

femaleBtn.addEventListener("click", () => {
    document.body.classList.remove("male-theme");
    document.body.classList.add("female-theme");
    femaleBtn.classList.add("active");
    maleBtn.classList.remove("active");
});

// Live calculation
heightInput.addEventListener("input", calculateBMI);
weightInput.addEventListener("input", calculateBMI);

function calculateBMI() {
    let height = heightInput.value;
    let weight = weightInput.value;

    if (height === "" || weight === "") {
        resultBox.style.opacity = "0";
        categoryBox.style.opacity = "0";
        return;
    }

    let h = height / 100;
    let bmi = (weight / (h * h)).toFixed(2);

    resultBox.textContent = `BMI: ${bmi}`;
    resultBox.style.opacity = "1";

    // Category logic
    let category = "";
    let color = "";

    if (bmi < 18.5) {
        category = "Underweight";
        color = "#ff9800";
    } else if (bmi < 25) {
        category = "Normal Weight";
        color = "#4caf50";
    } else if (bmi < 30) {
        category = "Overweight";
        color = "#ff5722";
    } else {
        category = "Obese";
        color = "#d32f2f";
    }

    categoryBox.textContent = `Category: ${category}`;
    categoryBox.style.color = color;
    categoryBox.style.opacity = "1";

    saveHistory(bmi, category);
}

// Save BMI history to LocalStorage
function saveHistory(bmi, category) {
    let record = `BMI: ${bmi} - ${category} (${new Date().toLocaleTimeString()})`;

    let history = JSON.parse(localStorage.getItem("bmi-history")) || [];
    
    // Avoid duplicates updating rapidly
    if (history[history.length - 1] !== record) {
        history.push(record);
    }

    localStorage.setItem("bmi-history", JSON.stringify(history));
    loadHistory();
}

// Load history
function loadHistory() {
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("bmi-history")) || [];

    history.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

loadHistory();

// Reset button
document.getElementById("resetBtn").addEventListener("click", () => {
    heightInput.value = "";
    weightInput.value = "";
    resultBox.style.opacity = "0";
    categoryBox.style.opacity = "0";
});

// Clear history
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    localStorage.removeItem("bmi-history");
    historyList.innerHTML = "";
});
