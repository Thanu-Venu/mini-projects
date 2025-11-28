let index = 0;
let autoSlide = true;
let slideTimer;

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const counter = document.querySelector(".counter");
const carousel = document.getElementById("carousel");
const toggleBtn = document.getElementById("toggleAuto");

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active-dot"));

    slides[i].classList.add("active");
    dots[i].classList.add("active-dot");

    counter.textContent = `${i + 1} / ${slides.length}`;
}

function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
    });
});

/* Auto Slide */
function startAutoSlide() {
    slideTimer = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(slideTimer);
}

startAutoSlide();

/* Pause on Hover */
carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", () => {
    if (autoSlide) startAutoSlide();
});

/* Keyboard Navigation */
document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
});

/* Toggle Auto Slide */
toggleBtn.addEventListener("click", () => {
    autoSlide = !autoSlide;
    toggleBtn.textContent = autoSlide ? "⏸ Pause" : "▶ Play";

    if (autoSlide) startAutoSlide();
    else stopAutoSlide();
});

/* Swipe Support */
let touchStartX = 0;

carousel.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", e => {
    let touchEndX = e.changedTouches[0].clientX;

    if (touchEndX - touchStartX > 50) prevSlide();
    if (touchStartX - touchEndX > 50) nextSlide();
});
