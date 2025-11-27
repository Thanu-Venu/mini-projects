const password = document.getElementById("password");
const strengthText = document.getElementById("strength");
const bar = document.getElementById("bar");
const eye = document.getElementById("toggleEye");

password.addEventListener("input", () => {
    const val = password.value;
    let score = 0;

    if (val.length >= 6) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[a-z]/.test(val)) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[^a-zA-Z0-9]/.test(val)) score++;

    // When empty
    if (val.length === 0) {
        strengthText.textContent = "";
        bar.style.width = "0%";
        return;
    }

    if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthText.style.color = "red";
        bar.style.width = "30%";
        bar.style.background = "linear-gradient(45deg, red, darkred)";
    } 
    else if (score === 3) {
        strengthText.textContent = "Medium";
        strengthText.style.color = "orange";
        bar.style.width = "60%";
        bar.style.background = "linear-gradient(45deg, orange, yellow)";
    } 
    else {
        strengthText.textContent = "Strong";
        strengthText.style.color = "#00ff9d";
        bar.style.width = "100%";
        bar.style.background = "linear-gradient(45deg, #00ff9d, #00b36b)";
    }
});

/* Show / Hide Password */
eye.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        eye.textContent = "🙈";
    } else {
        password.type = "password";
        eye.textContent = "👁️";
    }
});
