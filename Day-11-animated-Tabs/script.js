const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // remove active from all tabs
        tabs.forEach(t => t.classList.remove("active"));

        // hide all content
        contents.forEach(c => c.classList.remove("active"));

        // activate clicked tab
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});
