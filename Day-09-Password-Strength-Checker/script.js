const password = document.getElementById("password");
const strengthText = document.getElementById("strength");
const bar = document.getElementById("bar");
const eye = document.getElementById("toggleEye");
const copyBtn = document.getElementById("copyBtn");
const historyList = document.getElementById("historyList");

const r1 = document.getElementById("r1");
const r2 = document.getElementById("r2");
const r3 = document.getElementById("r3");
const r4 = document.getElementById("r4");
const r5 = document.getElementById("r5");

// Load history on start
loadHistory();

password.addEventListener("input", () => {
    const val = password.value;
    let score = 0;

    // Rules check
    const rules = {
        length8: val.length >= 8,
        lower: /[a-z]/.test(val),
        upper: /[A-Z]/.test(val),
        number: /[0-9]/.test(val),
        symbol: /[^a-zA-Z0-9]/.test(val)
    };

    // Update rule UI
    updateRule(r1, rules.length8);
    updateRule(r2, rules.lower);
    updateRule(r3, rules.upper);
    updateRule(r4, rules.number);
    updateRule(r5, rules.symbol);

    // Counting score
    for (let r in rules) if (rules[r]) score++;

    // Update strength bar
    updateStrength(score);

    saveToHistory(val);
});

function updateRule(element, condition) {
    element.textContent = condition ? "✔ " + element.textContent.slice(2) : "❌ " + element.textContent.slice(2);
    element.style.color = condition ? "#00ff9d" : "red";
}

function updateStrength(score) {
    if (score === 0) {
        strengthText.textContent = "";
        bar.style.width = "0%";
        return;
    }

    if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthText.style.color = "red";
        bar.style.width = "30%";
        bar.style.background = "red";
    }

    else if (score === 3 || score === 4) {
        strengthText.textContent = "Medium";
        strengthText.style.color = "orange";
        bar.style.width = "60%";
        bar.style.background = "orange";
    }

    else {
        strengthText.textContent = "Strong";
        strengthText.style.color = "#00ff9d";
        bar.style.width = "100%";
        bar.style.background = "linear-gradient(45deg,#00ff9d,#00b36b)";
    }
}

/* Show / Hide Password */
eye.addEventListener("click", () => {
    password.type = password.type === "password" ? "text" : "password";
    eye.textContent = password.type === "password" ? "👁️" : "🙈";
});

/* Copy Password */
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(password.value);
    copyBtn.textContent = "✅ Copied";
    setTimeout(() => copyBtn.textContent = "📋 Copy", 1500);
});

/* Save history in localStorage */
function saveToHistory(pass) {
    if (!pass) return;

    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.unshift(pass);

    if (history.length > 5) history.pop();

    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

/* Load history */
function loadHistory() {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    historyList.innerHTML = "";

    history.forEach(p => {
        let li = document.createElement("li");
        li.textContent = p;
        historyList.appendChild(li);
    });
}
