document.getElementById("calcBtn").addEventListener("click", function () {
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let resultBox = document.getElementById("result");
    let categoryBox = document.getElementById("category");

    if (height === "" || weight === "") {
        resultBox.textContent = "⚠️ Please enter both height & weight!";
        resultBox.style.opacity = "1";
        categoryBox.style.opacity = "0";
        return;
    }

    // Convert height from cm to meters
    let heightInMeters = height / 100;

    // BMI formula
    let bmi = weight / (heightInMeters * heightInMeters);
    bmi = bmi.toFixed(2);

    resultBox.textContent = `Your BMI: ${bmi}`;
    resultBox.style.opacity = "1";

    // Category detection
    let category = "";
    let color = "";

    if (bmi < 18.5) {
        category = "Underweight";
        color = "#ff9800";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal Weight";
        color = "#4caf50";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight";
        color = "#ff5722";
    } else {
        category = "Obese";
        color = "#d32f2f";
    }

    categoryBox.textContent = category;
    categoryBox.style.color = color;
    categoryBox.style.opacity = "1";
});

// Reset Button
document.getElementById("resetBtn").addEventListener("click", function () {
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("result").style.opacity = "0";
    document.getElementById("category").style.opacity = "0";
});
