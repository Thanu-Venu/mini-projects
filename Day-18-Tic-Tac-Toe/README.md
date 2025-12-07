# 🎮 Tic-Tac-Toe – Day 18 of Coding Challenge ✨

---

## 📌 About

A clean and lightweight **Tic-Tac-Toe game** built using **HTML, CSS, and JavaScript**. Perfect for Day 18 of your 30-day coding challenge! 🎯

---

## ⭐ Features

* 👥 **Two-player mode** (same device)
* 📱 **Responsive design** (mobile + desktop)
* 🏆 **Win / Draw detection**
* ✨ **Winning line highlight**
* 📊 **Scoreboard** with `localStorage` support
* 🔄 **Restart** & **Reset Scores** buttons
* ⌨️ **Keyboard navigation** (Arrow keys + Enter)
* ⚡ **Fast + Lightweight** (no frameworks)

---

## 🗂️ Project Structure


/tic-tac-toe
├─ index.html      # 🎨 UI layout
├─ style.css      # 🎀 Styling + animations
├─ script.js          # 🧠 Game logic + storage
└─ README.md       # 📄 This file


---

## ▶️ How to Run

1. 📥 Download or clone the folder
2. 🌐 Open `index.html` in any browser

*No server required!* 🚫🖥️

---

## 🎲 How to Play

* ❌ Player **X** goes first
* ⭕ Player **O** plays second
* ✋ Click or navigate to an empty cell to place your mark
* 🥇 First to get **3 in a row** wins!
* 🎉 Winning cells **glow** when someone wins
* 🔄 Press **Restart** to play again
* 🧹 Press **Reset Scores** to clear saved results

---

## 🧠 Implementation Notes

* State stored in a **9-cell array** (`null | 'X' | 'O'`)
* Checks **8 win patterns** 🟦
* Uses `localStorage` keys:

  * `ttt_scores`
  * `ttt_lastState`
* Only updates **changed cells** for smooth gameplay ⚡

---

## ♿ Accessibility

* Each cell is a **button** for proper screen-reader support 🎧
* 🔵 Focus outlines visible
* ⌨️ Enter / Space to place mark
* 📢 ARIA labels added

---

## 🚀 Future Enhancements

* 🤖 AI mode (Minimax)
* 🎨 Theme switcher (dark/light)
* 🔊 Sound effects
* 🌍 Online multiplayer using WebSockets
* 🌀 Smooth animations for moves

---

## 📸 ScreenShots

<img width="1918" height="1028" alt="image" src="https://github.com/user-attachments/assets/e918c4f5-5903-440c-b20b-700a8e6fdb55" />
<img width="1917" height="1023" alt="image" src="https://github.com/user-attachments/assets/4ad0b32f-c916-468c-bad8-4d274385e62e" />

---

⭐ Made with ❤️ as part of my 30 Days Mini Web Project Challenge

---
