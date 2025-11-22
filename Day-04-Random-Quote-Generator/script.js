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