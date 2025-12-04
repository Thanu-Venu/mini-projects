const rollBtn = document.getElementById("rollBtn");
const resultBox = document.getElementById("result");
const diceDisplay = document.getElementById("diceDisplay");

rollBtn.addEventListener("click", () => {
  let count = Number(document.getElementById("diceCount").value);
  if (count < 1) count = 1;

  diceDisplay.innerHTML = ""; // Clear old dice

  const diceElements = [];

  // Create dice visuals
  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.classList.add("dice");
    d.textContent = "🎲"; // placeholder while rolling
    diceDisplay.appendChild(d);
    diceElements.push(d);
  }

  // Add rolling animation
  diceElements.forEach(die => {
    die.style.animationName = "roll";
  });

  // After animation ends → show final results
  setTimeout(() => {
    const rolls = [];
    
    diceElements.forEach(die => {
      const val = Math.floor(Math.random() * 6) + 1;
      rolls.push(val);
      die.textContent = val;      // update the dice face
      die.style.animationName = ""; // stop animation
    });

    const total = rolls.reduce((a, b) => a + b, 0);
    resultBox.textContent = `🎲 Rolls: ${rolls.join(" | ")} → Total: ${total}`;
  }, 400); // matches animation duration
});
