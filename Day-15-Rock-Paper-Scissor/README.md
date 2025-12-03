# 🎮 Day 15 — Rock Paper Scissors

**Project:** Rock Paper Scissors (RPS)

**Challenge:** Day 15 of 30 Days of Code

**Goal:** Build an interactive Rock Paper Scissors game using HTML, CSS, and JavaScript. Keep it simple for the first version, then add polish and extra features for intermediate and advanced versions.

---

## 🚀 Features

### Basic (must-have)

* Play against the computer (random choice).
* Scoreboard (player vs computer).
* Buttons for Rock, Paper, Scissors.
* Round result feedback (Win / Lose / Tie).
* Reset game / reset score button.

### Intermediate (nice-to-have)

* Best-of-N mode (first to 3 / first to 5).
* Animations when choices are made.
* Keyboard controls (R / P / S).
* Mobile-friendly layout and touch support.
* History of last 5 rounds.
* Sound effects for win/lose/tie (optional).

### Advanced (stretch goals)

* Online multiplayer via WebRTC or WebSocket (simple lobby).
* Adaptive AI (tracks player's past choices to bias the CPU).
* Achievements and badges.
* Themed skins (dark / neon / retro).
* Save high score to `localStorage`.
* Unit tests for game logic.

---

## 📁 Project Structure (suggested)

rps-day15/
├─ index.html
├─ README.md
├─ styles.css
├─ script.js

---

## 🧩 Game Rules

* Rock beats Scissors.
* Scissors beat Paper.
* Paper beats Rock.
* If both choose the same, it's a tie.

---

## 🛠️ Installation / How to run

1. Clone or download this repo.
2. Open `index.html` in your browser.

---

## 🎯 UI / UX Suggestions

* Use large, tappable buttons for mobile.
* Show the CPU's choice after a short delay (300–600ms) to build suspense.
* Add a subtle animation for the winner (pulse, glow).
* Show a short toast message for each round result.
* Provide a small help / rules modal.

---

## 🔁 Keyboard Shortcuts

* `R` — Rock
* `P` — Paper
* `S` — Scissors
* `N` — New round / Next
* `Ctrl`+`R` or `⌘`+`R` — Reset scores (or use a visible button)

---

## 🧭 Suggested Development Steps (1–2 hours)

1. Scaffold `index.html` with three buttons and a scoreboard.
2. Implement `cpuPlay()` and `decideWinner()` in `game.js`.
3. Hook up click handlers in `app.js` to call game logic and update the DOM.
4. Add styles and basic animations.
5. Add reset button and keyboard shortcuts.
6. Polish with sounds, best-of-N, `localStorage` high score.

---

## 🌟 Stretch Ideas (mini-projects inside the project)

* Add a stats dashboard (win rate, most-picked move).
* Add themes and let users pick color palettes.
* Turn into a Progressive Web App (PWA) so it can be installed on phones.
* Add AI that predicts player's next move using a Markov chain.

---

## 📸 Screenshots

<img width="1918" height="982" alt="image" src="https://github.com/user-attachments/assets/e70a24e2-6ecb-4145-b001-1b622ec3fa2a" />
<img width="1905" height="971" alt="image" src="https://github.com/user-attachments/assets/9609f980-43a5-4695-82ef-4c03428dde66" />


---

⭐ Made with ❤️ as part of my 30 Days Mini Web Project Challenge

---
