const quotetxt=document.getElementById("quote");
const authortxt=document.getElementById("author");
const newquotebtn=document.getElementById("new-quote");


async function getQuote() {
    quotetxt.innerText = "Loading...";
    authortxt.innerText = "";

    try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const data = await response.json();

        quotetxt.innerText = data.quote;
        authortxt.innerText = "- " + data.author;

    } catch (error) {
        quotetxt.innerText = "Oops! Something went wrong.";
        authortxt.innerText = "";
        console.error(error);
    }
}

newquotebtn.addEventListener("click", getQuote);

const toggleModeBtn = document.getElementById("toggle-mode");
toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

const copyBtn=document.getElementById("copy-btn");
copyBtn.addEventListener("click",()=>{
    navigator.clipboard.writeText(`${quotetxt.innerText} ${authortxt.innerText}`);
    alert("Quote copied to clipboard!");
});

const speakBtn=document.getElementById("speak-btn");

speakBtn.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(`${quotetxt.innerText} by ${authortxt.innerText}`);
    utterance.volume = 1; // max volume
    utterance.rate = 1;
    utterance.pitch = 1;

    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) utterance.voice = voices[0];

    speechSynthesis.cancel(); // stop previous
    speechSynthesis.speak(utterance);
});

const savedQuotes=document.getElementById("saved-quotes");

function displaySavedQuotes() {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    savedQuotes.innerHTML = "";

    if (favourites.length === 0) {
        savedQuotes.innerText = "No saved quotes yet.";
        return;
    }

    favourites.forEach((item, index) => {
        const quoteDiv = document.createElement("div");
        quoteDiv.classList.add("saved-quote");
        quoteDiv.innerHTML = `<p>${item.quote}</p><p><strong>- ${item.author}</strong></p>`;
        savedQuotes.appendChild(quoteDiv);
    });
}

const saveBtn=document.getElementById("save-btn");

saveBtn.addEventListener("click",()=>{
    let favourites=JSON.parse(localStorage.getItem("favourites")) || [];
    favourites.push({quote:quotetxt.innerText,author:authortxt.innerText});
    localStorage.setItem("favourites",JSON.stringify(favourites));
    alert("Quote saved to favourites!");
    displaySavedQuotes();
});

const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", clearSavedQuotes);
function clearSavedQuotes() {
    localStorage.removeItem("favourites"); // or localStorage.clear()
    savedQuotes.innerHTML = ""; // remove from page
    savedQuotes.innerText = "No saved quotes yet.";
}