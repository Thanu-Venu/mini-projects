let cards = document.querySelectorAll(".card");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

shuffleCards();

cards.forEach(card => {
    card.addEventListener("click", () => {
        if (lockBoard) return;
        if (card === firstCard) return;

        card.classList.add("flipped");

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;

            // wait 300ms so second card can flip visibly
            setTimeout(() => {
                checkMatch();
            }, 500);

        }
    });
});

function checkMatch() {
    lockBoard = true;

    let match = firstCard.dataset.name === secondCard.dataset.name;

    if (match) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function shuffleCards() {
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 12);
        card.style.order = rand;
    });
}

document.getElementById("restartBtn").addEventListener("click", () => {
    location.reload();
});
