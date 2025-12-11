const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

// Fetch currency list + rates
let ratesData = {};

async function loadCurrencies() {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    ratesData = data.rates;

    // Fill dropdowns
    for (let currency in ratesData) {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = currency;
        option2.value = currency;

        option1.textContent = currency;
        option2.textContent = currency;

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    }

    // Set defaults
    fromCurrency.value = "USD";
    toCurrency.value = "LKR";
}

loadCurrencies();

// Convert button
convertBtn.addEventListener("click", () => {
    let amount = amountInput.value;

    if (amount === "" || amount <= 0) {
        result.textContent = "❌ Enter a valid amount!";
        return;
    }

    let from = fromCurrency.value;
    let to = toCurrency.value;

    let usdAmount = amount / ratesData[from]; 
    let converted = usdAmount * ratesData[to];

    result.textContent = `Result: ${converted.toFixed(2)} ${to}`;
});
