document.querySelectorAll(".tooltip").forEach(tip => {
    tip.addEventListener("mouseenter", () => {
        console.log("Tooltip shown:", tip.getAttribute("data-tooltip"));
    });
});
