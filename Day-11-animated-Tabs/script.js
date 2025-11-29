const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // Remove old active tab
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // Remove old active content
        contents.forEach(c => c.classList.remove("active"));

        // Show new content
        let target = document.getElementById(tab.dataset.tab);
        target.classList.add("active");
    });
});
