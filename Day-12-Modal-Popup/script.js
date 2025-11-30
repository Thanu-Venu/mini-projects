// ==============================
// UTILITIES
// ==============================

const openButtons = document.querySelectorAll("[data-open]");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll("[data-close]");
let lastFocused = null;

// Get focusable items
const focusSelectors = `a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])`;

function getFocusable(element) {
  return [...element.querySelectorAll(focusSelectors)];
}

// ==============================
// OPEN MODAL
// ==============================
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  lastFocused = document.activeElement;
  modal.classList.add("is-open");

  document.documentElement.style.overflow = "hidden";

  const dialog = modal.querySelector(".modal__dialog");
  dialog.setAttribute("tabindex", "-1");
  dialog.focus();

  // Focus trap
  const focusable = getFocusable(modal);
  modal._trap = (e) => {
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); 
        last.focus();
      }
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    if (e.key === "Escape") {
      closeModal(id);
    }
  };
  modal.addEventListener("keydown", modal._trap);
}

// ==============================
// CLOSE MODAL
// ==============================
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.remove("is-open");
  document.documentElement.style.overflow = "";

  if (modal._trap) modal.removeEventListener("keydown", modal._trap);

  if (lastFocused) lastFocused.focus();
}

// ==============================
// EVENT LISTENERS
// ==============================

// Open modal buttons
openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.open);
  });
});

// Close modal buttons
closeButtons.forEach((btn) => {
  const modal = btn.closest(".modal");
  btn.addEventListener("click", () => closeModal(modal.id));
});

// Overlay click
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__overlay")) {
      closeModal(modal.id);
    }
  });
});

// ==============================
// AUTO OPEN AFTER 3 SECONDS
// ==============================

setTimeout(() => openModal("modal-1"), 3000);

// ==============================
// OPEN ON SCROLL (50% down)
// ==============================

let triggered = false;
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY + window.innerHeight;
  const halfPage = document.documentElement.scrollHeight * 0.5;

  if (!triggered && scrolled >= halfPage) {
    openModal("modal-2");
    triggered = true;
  }
});

// ==============================
// FORM VALIDATION
// ==============================

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "✔️ Message sent successfully!";
  form.reset();
});
