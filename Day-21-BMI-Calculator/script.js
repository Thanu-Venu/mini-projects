document.getElementById("calcBtn").addEventListener("click", function () {
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;

    if (height === "" || weight === "") {
        document.getElementById("result").textContent = "⚠️ Please enter both height & weight!";
        return;
    }

    // Convert height from cm to meters
    let heightInMeters = height / 100;

    // BMI formula
    let bmi = weight / (heightInMeters * heightInMeters);
    bmi = bmi.toFixed(2);

    document.getElementById("result").textContent = `Your BMI is ${bmi}`;
});
