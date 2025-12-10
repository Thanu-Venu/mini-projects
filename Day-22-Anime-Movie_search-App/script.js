const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

// Using OMDb API (Movies + Some Anime)
const API_KEY = "https://www.omdbapi.com/?apikey=564727fa&s=";

// Search function
async function searchMovies() {
    const query = searchInput.value.trim();
    if (query === "") return;

    resultsDiv.innerHTML = "<h2>Searching...</h2>";

    try {
        const res = await fetch(API_KEY + query);
        const data = await res.json();

        if (data.Search) {
            displayResults(data.Search);
        } else {
            resultsDiv.innerHTML = "<h2>No results found 😢</h2>";
        }
    } catch (error) {
        resultsDiv.innerHTML = "<h2>Error fetching data ❌</h2>";
    }
}

// Display results
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

        resultsDiv.appendChild(card);
    });
}

// Event listeners
searchBtn.addEventListener("click", searchMovies);

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchMovies();
});
