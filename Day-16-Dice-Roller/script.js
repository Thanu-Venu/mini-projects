const rollBtn = document.getElementById("rollBtn");
const resultBox = document.getElementById("result");
const diceDisplay = document.getElementById("diceDisplay");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const themeToggle = document.getElementById("themeToggle");

// Load saved history
let history = JSON.parse(localStorage.getItem("diceHistory")) || [];
renderHistory();

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Roll button logic
rollBtn.addEventListener("click", () => {
  let count = Number(document.getElementById("diceCount").value);
  let sides = Number(document.getElementById("diceType").value);
  if (count < 1) count = 1;

  diceDisplay.innerHTML = "";
  const diceElements = [];

  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.classList.add("dice");
    d.textContent = "🎲";
    diceDisplay.appendChild(d);
    diceElements.push(d);
  }

  diceElements.forEach(d => d.style.animationName = "roll");

  setTimeout(() => {
    const rolls = [];

    diceElements.forEach(die => {
      const val = Math.floor(Math.random() * sides) + 1;
      rolls.push(val);
      die.textContent = val;
      die.style.animationName = "";
    });

    const total = rolls.reduce((a, b) => a + b, 0);
    resultBox.textContent = `🎲 d${sides} ➜ ${rolls.join(" | ")} → Total: ${total}`;

    saveToHistory(`Rolled ${count}d${sides} → [${rolls.join(", ")}] (Total: ${total})`);

  }, 400);
});

// Save history
function saveToHistory(entry) {
  history.unshift(entry);
  if (history.length > 20) history.pop();
  localStorage.setItem("diceHistory", JSON.stringify(history));
  renderHistory();
}

// Render history
function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Clear history
clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("diceHistory");
  renderHistory();
});
