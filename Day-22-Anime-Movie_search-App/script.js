const searchInput = document.getElementById("searchInput");
const suggestionsDiv = document.getElementById("suggestions");
const loader = document.getElementById("loader");
const resultsDiv = document.getElementById("results");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

// ✔ FIXED API URL
const API = "https://www.omdbapi.com/?apikey=564727fa&s=";
const API_DETAILS = "https://www.omdbapi.com/?apikey=564727fa&i=";

// 🔹 Auto suggestions while typing
searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();
    if (query.length < 2) {
        suggestionsDiv.style.display = "none";
        return;
    }

    try {
        const res = await fetch(API + query);
        const data = await res.json();

        if (!data.Search) {
            suggestionsDiv.style.display = "none";
            return;
        }

        suggestionsDiv.innerHTML = "";
        data.Search.slice(0, 5).forEach(item => {
            const div = document.createElement("div");
            div.classList.add("suggestion-item");
            div.textContent = item.Title;

            div.addEventListener("click", () => {
                searchInput.value = item.Title;
                suggestionsDiv.style.display = "none";
                searchMovies(); // ✔ FIXED
            });

            suggestionsDiv.appendChild(div);
        });

        suggestionsDiv.style.display = "block";
    } catch (err) {
        suggestionsDiv.style.display = "none";
    }
});

// 🔹 Main search function
async function searchMovies() {
    const query = searchInput.value.trim();
    if (query === "") return;

    suggestionsDiv.style.display = "none";
    resultsDiv.innerHTML = "";
    loader.classList.remove("hidden");

    try {
        const res = await fetch(API + query);
        const data = await res.json();

        loader.classList.add("hidden");

        if (data.Search) {
            displayResults(data.Search);
        } else {
            resultsDiv.innerHTML = "<h2>No results found 😢</h2>";
        }
    } catch (err) {
        loader.classList.add("hidden");
        resultsDiv.innerHTML = "<h2>Error fetching data ❌</h2>";
    }
}

// 🔹 Show results
function displayResults(items) {
    resultsDiv.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${item.Poster !== "N/A" ? item.Poster : "https://via.placeholder.com/300"}" />
            <h3>${item.Title}</h3>
            <p>${item.Year}</p>
        `;

        card.addEventListener("click", () => showDetails(item.imdbID));

        resultsDiv.appendChild(card);
    });
}

// 🔹 Show popup details
async function showDetails(id) {
    const res = await fetch(API_DETAILS + id);
    const data = await res.json();

    modalBody.innerHTML = `
        <img src="${data.Poster}" />
        <h2>${data.Title}</h2>
        <p><b>Year:</b> ${data.Year}</p>
        <p><b>Genre:</b> ${data.Genre}</p>
        <p><b>Rating:</b> ${data.imdbRating}</p>
        <p><b>Plot:</b> ${data.Plot}</p>
    `;

    modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
});
