const items = document.querySelectorAll(".accordion-item");

items.forEach(item => {
  const header = item.querySelector(".accordion-header");
  const content = item.querySelector(".accordion-content");

  header.addEventListener("click", () => {
    const isOpen = header.classList.contains("active");

    // Close all sections (single-open mode)
    document.querySelectorAll(".accordion-header").forEach(h => h.classList.remove("active"));
    document.querySelectorAll(".accordion-content").forEach(c => c.style.maxHeight = null);

    if (!isOpen) {
      header.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
