$(document).ready(function () {
    //select all cards
    const cards = document.querySelectorAll('.memory-card');
    // Click to start overlay
    $(".overlay-text").click(function () {
        $(".overlay-text").removeClass("visible");
    });

    function shuffleCards() {


        // shuffle using flex order value
        cards.forEach(function (card) {

            let shufflePos = Math.floor(Math.random() * 12);
            card.style.order = shufflePos;

            cards.forEach(function (card) {
                card.addEventListener('click', flipCard);
            });
        });
    }

    shuffleCards();

    let isCardFlipped = false;
    let lockCards = false;
    let fistCard;
    let secondCard;

    // Flip card with a click
    function flipCard() {
        if (lockCards) return;
        if (this === fistCard) return;

        $(this.classList.toggle('flip'));

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

    let matchedCards = [];

    function disableCards() {


        fistCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        //console.log(fistCard.classList);
        // fistCard.classList.add('matched');
        // secondCard.classList.add('matched');

        matchedCards.push(fistCard);
        matchedCards.push(secondCard);

        if (matchedCards.length === 12) {
            matchedCards.length = 0;
            setTimeout(function () {
                $(".memory-card").removeClass("flip");
                $("#you-won-text").addClass("visible");
                $("#you-won-text").click(function () {
                    
                    //let matchedCards = [];
                    shuffleCards();
                    
                });
            }, 1500);
            //console.log("you won!");
        } else {
            resetGame();
        }
    }

    function unflipCards() {
        lockCards = true;

        setTimeout(function () {
            fistCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetGame();
        }, 1500);
    }
    function resetGame() {
        isCardFlipped = false;
        lockCards = false;
        fistCard = null;
        secondCard = null;

    }
});