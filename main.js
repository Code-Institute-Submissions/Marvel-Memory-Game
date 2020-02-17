const cards = document.querySelectorAll('.memory-card');

let isCardFlipped = false;
let lockCards = false;
let fistCard;
let secondCard;

// Flip card with a click
function flipCard() {
    if(lockCards) return;
    if(this === fistCard) return;

    this.classList.toggle('flip');

    if (!isCardFlipped) {
        //first click
        isCardFlipped = true;
        fistCard = this;

        return;
    }
    //second click
    isCardFlipped = false;
    secondCard = this;
   
    //do cards match?

    checkForMatch();

}


function checkForMatch() {
    //ternary operator 
    let doMatch = fistCard.dataset.image === secondCard.dataset.image;

    doMatch ? disableCards() : unflipCards();
    // if (fistCard.dataset.image === secondCard.dataset.image) {
    //     disableCards();
    // } else {
    //     //does not match. Timeout used to view 2nd card
    //     unflipCards();
    // }
}

function disableCards() {
    fistCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetGame();
}

function unflipCards() {
    lockCards = true;

    setTimeout(function () {
        fistCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetGame();
    }, 1500);
}

function resetGame () {
    isCardFlipped = false;
    lockCards = false;
    fistCard = null;
    secondCard =null;

}

cards.forEach(function (card){
    let shufflePos = Math.floor( Math.random()*12 );
   // console.log(shufflePos);
    card.style.order = shufflePos;

    console.log(card.style.order);
});

cards.forEach(function (card) {
    card.addEventListener('click', flipCard);
});