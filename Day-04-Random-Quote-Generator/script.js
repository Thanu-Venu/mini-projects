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
