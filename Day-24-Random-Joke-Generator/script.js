const jokeBtn = document.getElementById("jokeBtn");
const jokeText = document.getElementById("joke");
const copyBtn = document.getElementById("copyBtn");
const favBtn = document.getElementById("favBtn");
const favoriteList = document.getElementById("favoriteList");
const themeToggle = document.getElementById("themeToggle");

let currentJoke = "";

/* 😂 Fetch Joke */
async function getJoke() {
    jokeText.textContent = "😂 Loading...";
    try {
        const res = await fetch("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" }
        });
        const data = await res.json();
        currentJoke = data.joke;
        jokeText.textContent = currentJoke;
    } catch {
        jokeText.textContent = "❌ Failed to load joke!";
    }
}

/* 📋 Copy Joke */
copyBtn.addEventListener("click", () => {
    if (!currentJoke) return;
    navigator.clipboard.writeText(currentJoke);
    alert("Joke copied! 📋");
});

/* ⭐ Add to Favorites */
favBtn.addEventListener("click", () => {
    if (!currentJoke) return;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(currentJoke)) {
        favorites.push(currentJoke);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        loadFavorites();
    }
});

/* ⭐ Load Favorites */
function loadFavorites() {
    favoriteList.innerHTML = "";
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.forEach(joke => {
        const li = document.createElement("li");
        li.textContent = joke;
        favoriteList.appendChild(li);
    });
}

/* 🌙 Theme Toggle */
themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

/* 🎲 Events */
jokeBtn.addEventListener("click", getJoke);

/* 🚀 Init */
loadFavorites();
