const cards = document.querySelectorAll('.memory-card');

let isCardFlipped = false;
let fistCard;
let secondCard;

// Flip card with a click
function flipCard() {
    this.classList.toggle('flip');

    if (!isCardFlipped) {
        //first click
        isCardFlipped = true;
        fistCard = this;
    } else {
        //second click
        isCardFlipped = false;
        secondCard = this;

        //do cards match?
        // console.log(fistCard.dataset.image);
        // console.log(secondCard.dataset.image);
        if (fistCard.dataset.image === secondCard.dataset.image) {
            fistCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            //does not match
            setTimeout(function () {
                fistCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 1500);
        }

    }
}

cards.forEach(function (card) {
    card.addEventListener('click', flipCard);
});