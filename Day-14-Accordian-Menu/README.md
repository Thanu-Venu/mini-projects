# 📘 Day 13 — Accordion Menu
A fully-featured, responsive, and interactive **Accordion Menu** for your 30-Day Coding Challenge.

---

## 🎯 Project Overview
Build an elegant and accessible Accordion Menu with expand/collapse interactions, smooth animations, and full keyboard + screen reader support.

---

## ✨ Features

### 🔹 Basic Features
- Expand/collapse accordion sections
- Click-to-toggle interaction
- Supports multiple accordion items
- Minimal, clean UI

### 🔹 Intermediate Features
- Smooth height transition animation
- Rotating chevron/arrow icon
- Keyboard toggle using Enter/Space
- Single-open mode (auto-closes others)
- Responsive on all screen sizes
- Light/Dark theme compatibility

### 🔹 Advanced Features
- Full accessibility support (ARIA attributes)
  - aria-expanded
  - aria-controls / aria-labelledby
  - hidden attribute for collapsed panels
- Keyboard navigation
  - Arrow Up / Arrow Down to switch items
  - Home / End navigation
- CSS variable-based styling
- Auto-scroll into view when expanded
- "Open All / Close All" buttons (optional)
- Deep linking support (e.g., #item3 auto-opens)
- Web Animations API support for smooth transitions
- LocalStorage to remember open state
- Nested accordion support (accordion inside accordion)

---

## 🧱 Folder Structure
```
/accordion-menu/
│── index.html
│── css/
│     └── styles.css
│── js/
│     └── accordion.js
└── README.md
```

---

## 📱 Responsiveness
- Works on mobile, tablet, and desktop
- Touch-friendly interactions
- Scales typography and spacing automatically

---

## ♿ Accessibility Notes
- Buttons include proper accessible roles
- aria-expanded updates dynamically
- Panels labeled using aria-controls
- Fully usable with a keyboard

---

## 🛠️ Customization Options
- Toggle between single-open and multi-open modes
- Modify animation duration with CSS variables
- Replace icons (chevron, +/- , arrows)
- Add shadows, borders, or glassmorphism
- Add category groups or sections
- Add micro-interactions and hover effects

---

## 🧪 Testing Checklist
- [ ] Sections expand and collapse correctly
- [ ] Only one section open (if enabled)
- [ ] Icon rotates when opened
- [ ] Works on touch screens
- [ ] Keyboard navigation smooth
- [ ] ARIA attributes update properly
- [ ] No layout shift during animation
- [ ] Deep link opens correct panel
- [ ] Open state saved in LocalStorage

---

## 💡 Extension Ideas
- FAQ page accordion
- Mobile navigation accordion
- Product details accordion (e-commerce)
- Multi-step form accordion
- Accordion with images/media

---

### 📸 ScreenShots

---

⭐ Made with ❤️ as part of my 30 Days Mini Web Project Challenge

---