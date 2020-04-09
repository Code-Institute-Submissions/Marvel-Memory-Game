$(document).ready(function() {



    class audioControl {
        constructor() {
            this.bgMusic = new Audio('assets/sounds/backgroundMusic.mp3');
            this.flipSound = new Audio('assets/sounds/card-flip.wav');
            this.matchedSound = new Audio('assets/sounds/matchedSound.wav');
            this.victory = new Audio('assets/sounds/badass-victory.wav');
        }
        startMusic() {
            this.bgMusic.currentTime = 0;
            this.bgMusic.play();
        }

        stopMusic() {
            this.bgMusic.pause();
        }

        flip() {
            this.flipSound.play();
        }

        match() {
            this.matchedSound.play();
        }

        victorySound() {
            this.victory.play();
        }
    }



    let audio = new audioControl;
    let timer;
    let resetCounter;
    let matchedCards = [];
    let sound = true;

    //background music toggler
    $('#soundToggler').click(() => {
        if (sound) {
            stopBgSound();

        } else {
            startBgSound();
        }
        console.log(sound);
    })

    function stopBgSound() {
        sound = false
        audio.stopMusic();
    }

    function startBgSound() {
        sound = true
        audio.startMusic();
    }
    //timer
    function startTimer() {
        timer = 60;

        resetCounter = setInterval(() => {
            let countDown = timer--;
            $('#time-remaining').html(countDown);

            if (countDown === 0) {
                clearInterval(resetCounter);
                audio.stopMusic();
                matchedCards = [];
                timeUp();
            }
        }, 1000);

        function timeUp() {
            setTimeout(function() {
                audio.victorySound();
                $('.memory-card').removeClass('flip');
                $('.memory-card').removeClass('matched');
                $('#game-over-text').addClass('visible');
            }, 1000)

            $('#game-over-text').click(() => {
                $('#game-over-text').remove('visible');
                shuffleCards();
                $('#pairs').html(0);
            })
        }
    }

    const cards = document.querySelectorAll('.memory-card');

    // Click to start overlay
    $('.overlay-text').click(function() {
        $('.overlay-text').removeClass('visible');
        audio.startMusic();
        startTimer();
    });

    function shuffleCards() {
        // shuffle using flex order value
        cards.forEach(function(card) {

            let shufflePos = Math.floor(Math.random() * 16);
            card.style.order = shufflePos;

            cards.forEach(function(card) {
                card.addEventListener('click', flipCard, function() {

                });
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
        audio.flip();

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
        //  ternary operator 
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
        //console.log(fistCard.classList);
        fistCard.classList.add('matched');
        secondCard.classList.add('matched');
        audio.match();
        matchedCards.push(fistCard);
        matchedCards.push(secondCard);

        let matchedPairs = matchedCards.length;
        let matches = matchedPairs / 2;
        $('#pairs').html(matches);


        //flip count
        if (matchedCards.length === 16) {
            clearInterval(resetCounter);
            matchedCards.length = 0;
            matches = 0;
            audio.stopMusic();
            setTimeout(function() {
                audio.victorySound();
                $('.memory-card').removeClass('flip');
                $('#you-won-text').addClass('visible');
                $('.memory-card').removeClass('matched');
                $('#you-won-text').click(function() {

                    shuffleCards();
                    $('#pairs').html(0);
                    matchedCards = [];

                });
            }, 1200);

        } else {
            resetGame();
        }
    }

    function unflipCards() {
        lockCards = true;

        setTimeout(function() {
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

function copyRite() {


    const baseURL = "https://gateway.marvel.com/v1/public/characters?"
    const apikey = "&ts=1&apikey=2479ac670ffd22a005793a85e2cd6556&hash=148c15d91ce2f088e7a99e28892d0da2"

    $.getJSON(baseURL + apikey, function(data) {
        console.log(data.attributionText);
        let footer = document.getElementById('footer-text');
        footer.innerText = data.attributionText.toUpperCase();
    });
}
copyRite();