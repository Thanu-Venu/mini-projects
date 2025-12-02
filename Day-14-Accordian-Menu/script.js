const headers = document.querySelectorAll('.accordion-header');

// Load saved open states
const savedState = JSON.parse(localStorage.getItem("accordionState")) || {};

function saveState() {
  const state = {};
  headers.forEach((header, i) => {
    state[i] = header.getAttribute("aria-expanded") === "true";
  });
  localStorage.setItem("accordionState", JSON.stringify(state));
}

function closeAll() {
  headers.forEach(header => {
    header.setAttribute("aria-expanded", "false");
    const panel = document.getElementById(header.getAttribute("aria-controls"));
    panel.hidden = true;
    panel.style.maxHeight = null;
  });
}

function openPanel(header) {
  const panel = document.getElementById(header.getAttribute("aria-controls"));

  header.setAttribute("aria-expanded", "true");
  panel.hidden = false;
  panel.style.maxHeight = panel.scrollHeight + "px";

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

headers.forEach((header, index) => {
  const panel = document.getElementById(header.getAttribute("aria-controls"));

  // Restore saved open states
  if (savedState[index]) {
    header.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    panel.style.maxHeight = panel.scrollHeight + "px";
  }

  // Mouse click
  header.addEventListener("click", () => {
    const isOpen = header.getAttribute("aria-expanded") === "true";

    closeAll(); // single open mode

    if (!isOpen) {
      openPanel(header);
    }

    saveState();
  });

  // Keyboard Navigation
  header.addEventListener("keydown", (e) => {
    const key = e.key;
    const headersArray = Array.from(headers);

    if (key === "ArrowDown") {
      e.preventDefault();
      headersArray[(index + 1) % headersArray.length].focus();
    }

    if (key === "ArrowUp") {
      e.preventDefault();
      headersArray[(index - 1 + headersArray.length) % headersArray.length].focus();
    }

    if (key === "Home") {
      e.preventDefault();
      headersArray[0].focus();
    }

    if (key === "End") {
      e.preventDefault();
      headersArray[headersArray.length - 1].focus();
    }

    if (key === "Enter" || key === " ") {
      e.preventDefault();
      header.click();
    }
  });
});


// Deep link support (#acc3 opens section 3)
const hash = window.location.hash;
if (hash) {
  const item = document.querySelector(hash + " .accordion-header");
  if (item) {
    closeAll();
    openPanel(item);
  }
}
