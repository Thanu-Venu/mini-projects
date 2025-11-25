let bill = document.getElementById("bill");
let people = document.getElementById("people");
let customTip = document.getElementById("customTip");
let tipButtons = document.querySelectorAll(".tip-btn");

let tipAmount = document.getElementById("tipAmount");
let totalAmount = document.getElementById("totalAmount");

let tipValue = 0;

function calculate() {
    let billValue = parseFloat(bill.value);
    let peopleValue = parseInt(people.value);

    if (!billValue || !peopleValue || peopleValue <= 0) {
        tipAmount.innerText = "0.00";
        totalAmount.innerText = "0.00";
        return;
    }

    let tipPerPerson = (billValue * (tipValue / 100)) / peopleValue;
    let totalPerPerson = (billValue / peopleValue) + tipPerPerson;

    tipAmount.innerText = tipPerPerson.toFixed(2);
    totalAmount.innerText = totalPerPerson.toFixed(2);
}

// Tip button click
tipButtons.forEach(btn => {
    btn.addEventListener("click", function () {

        // Remove active class from all buttons
        tipButtons.forEach(b => b.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Set tip value
        tipValue = parseInt(this.dataset.tip);

        // Clear custom tip
        customTip.value = "";

        calculate();
    });
});


// Custom tip
customTip.addEventListener("input", () => {
    tipValue = parseFloat(customTip.value) || 0;
    calculate();
});

// Inputs
bill.addEventListener("input", calculate);
people.addEventListener("input", calculate);

// Reset
document.getElementById("resetBtn").addEventListener("click", () => {
    bill.value = "";
    people.value = "";
    customTip.value = "";
    tipValue = 0;
    tipAmount.innerText = "0.00";
    totalAmount.innerText = "0.00";
});
