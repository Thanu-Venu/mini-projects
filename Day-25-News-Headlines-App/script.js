const API_KEY = "b63dc5f9d92549a8965fd89bd9eea305"; // 🔑 Add your API key here
const BASE_URL = "https://newsapi.org/v2/top-headlines";

const newsContainer = document.getElementById("newsContainer");
const statusText = document.getElementById("status");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const refreshBtn = document.getElementById("refreshBtn");
const themeToggle = document.getElementById("themeToggle");

let currentCategory = "general";

async function fetchNews(query = "") {
  statusText.textContent = "Loading news...";
  newsContainer.innerHTML = "";

  let url = `${BASE_URL}?country=us&category=${currentCategory}&apiKey=${API_KEY}`;

  if (query) {
    url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "ok" || data.articles.length === 0) {
      statusText.textContent = "No news found 😕";
      return;
    }

    statusText.textContent = "Latest Headlines 🗞️";
    displayNews(data.articles);
  } catch (error) {
    statusText.textContent = "⚠️ Failed to load news. Check internet or API key.";
  }
}

function displayNews(articles) {
  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300x160'}" alt="news image" />
      <div class="news-content">
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <small>🕒 ${new Date(article.publishedAt).toLocaleString()}</small><br/><br/>
        <a href="${article.url}" target="_blank">Read More →</a>
      </div>
    `;

    newsContainer.appendChild(card);
  });
}

// Category change
categorySelect.addEventListener("change", () => {
  currentCategory = categorySelect.value;
  fetchNews();
});

// Search news
searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    fetchNews(searchInput.value.trim());
  }
});

// Refresh
refreshBtn.addEventListener("click", () => {
  searchInput.value = "";
  fetchNews();
});

// Theme toggle
let darkMode = false;

themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark");
  themeToggle.textContent = darkMode ? "☀️" : "🌙";
});

// Initial load
fetchNews();
