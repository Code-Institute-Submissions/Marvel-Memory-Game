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

    let easyCardsList = [{
            name: "thor",
            img: "assets/images/thor.jpg"
        },
        {
            name: "lizard",
            img: "assets/images/lizard.jpg"
        },
        {
            name: "dr doom",
            img: "assets/images/dr-doom.jpg"
        },
        {
            name: "lizard",
            img: "assets/images/lizard.jpg"
        }, {
            name: "thor",
            img: "assets/images/thor.jpg"
        }, {
            name: "dr doom",
            img: "assets/images/dr-doom.jpg"
        }, {
            name: "captain-britain",
            img: "assets/images/captain-britain.jpg"
        }, {
            name: "captain-britain",
            img: "assets/images/captain-britain.jpg"
        }, {
            name: "deadpool",
            img: "assets/images/deadpool.jpg"
        }, {
            name: "deadpool",
            img: "assets/images/deadpool.jpg"
        }, {
            name: "hulk",
            img: "assets/images/hulk.jpg"
        }, {
            name: "hulk",
            img: "assets/images/hulk.jpg"
        }, {
            name: "iron-man",
            img: "assets/images/iron-man.jpg"
        }, {
            name: "iron-man",
            img: "assets/images/iron-man.jpg"
        }, {
            name: "wolverine",
            img: "assets/images/wolverine.jpg"
        }, {
            name: "wolverine",
            img: "assets/images/wolverine.jpg"
        }
    ]

    let hardCardsList = [{
            name: "thor",
            img: "assets/images/thor.jpg"
        },
        {
            name: "lizard",
            img: "assets/images/lizard.jpg"
        },
        {
            name: "dr doom",
            img: "assets/images/dr-doom.jpg"
        },
        {
            name: "lizard",
            img: "assets/images/lizard.jpg"
        }, {
            name: "thor",
            img: "assets/images/thor.jpg"
        }, {
            name: "dr doom",
            img: "assets/images/dr-doom.jpg"
        }, {
            name: "captain-britain",
            img: "assets/images/captain-britain.jpg"
        }, {
            name: "captain-britain",
            img: "assets/images/captain-britain.jpg"
        }, {
            name: "deadpool",
            img: "assets/images/deadpool.jpg"
        }, {
            name: "deadpool",
            img: "assets/images/deadpool.jpg"
        }, {
            name: "hulk",
            img: "assets/images/hulk.jpg"
        }, {
            name: "hulk",
            img: "assets/images/hulk.jpg"
        }, {
            name: "iron-man",
            img: "assets/images/iron-man.jpg"
        }, {
            name: "iron-man",
            img: "assets/images/iron-man.jpg"
        }, {
            name: "wolverine",
            img: "assets/images/wolverine.jpg"
        }, {
            name: "wolverine",
            img: "assets/images/wolverine.jpg"
        }, {
            name: "spider-man",
            img: "assets/images/spider-man.jpg"
        }, {
            name: "spider-man",
            img: "assets/images/spider-man.jpg"
        }, {
            name: "silver-surfer",
            img: "assets/images/silver-surfer.jpg"
        }, {
            name: "silver-surfer",
            img: "assets/images/silver-surfer.jpg"
        }
    ]

    let audio = new audioControl;
    let timer;
    let resetCounter;
    let matchedCards = [];
    let sound = true;

    //background music toggler
    $('#soundToggler').click(() => {
        let soundOn = sound;
        soundOn ? stopBgSound() : startBgSound();
    })

    function stopBgSound() {
        sound = false
        $('#soundToggler').addClass('soundOff')
        $('#soundToggler').removeClass('soundOn')
        audio.stopMusic();
    }

    function startBgSound() {
        sound = true
        $('#soundToggler').addClass('soundOn')
        $('#soundToggler').removeClass('soundOff')
        audio.startMusic();
    }
    //timer
    function startTimer() {

        timer = 60;
        resetCounter = setInterval(() => {
            timer--;
            let countDownMin = Math.floor(timer / 60);
            let countDownSec = timer % 60;
            let countDownSecounds = countDownSec.toString().padStart(2, '0');
            $('#time-remaining').html(`${countDownMin}:${countDownSecounds}`);
            if (timer === 0) {
                timeUp();
            }
        }, 1000);
    }

    function timeUp() {
        clearInterval(resetCounter);
        audio.stopMusic();
        $('#soundToggler').addClass('soundOn');
        $('#soundToggler').removeClass('soundOff');
        matchedCards = [];
        easyLevel = null;
        moveCounter = 0;
        sound = true;

        setTimeout(() => {
            $('.memory-card').removeClass('flip');
            $('#game-over-text').addClass('visible');
            audio.victorySound();
            $('#pairs').html(0);
            $('#moves').html(0);
            $('#time-remaining').html('0');
            $('.memory-card').removeClass('matched');
            $('#game-over-btn').click(() => {
                $('.memory-game').html('');
                $('.memory-game').removeClass('hero');
                $('#game-over-text').removeClass('visible');
                $('#difficulty-overlay').addClass('visible');
            });
        }, 1200);
    }

    let easyLevel = null;
    $('#easyBtn').click(() => {
        $('#difficulty-overlay').removeClass('visible');
        $('#start-overlay').addClass('visible');
        easyLevel = true;

    });

    $('#heroBtn').click(() => {

        $('#difficulty-overlay').removeClass('visible');
        $('#start-overlay').addClass('visible');
        $('.memory-game').addClass('hero');
        easyLevel = false;
    });


    $('#start-overlay').click(() => {
        cardsList = [];
        resetGame();
        $('#start-overlay').removeClass('visible');
        shuffleCards();
        audio.startMusic();
        startTimer();
    });

    $('#prizeBtn').click(() => {
        cardsList = [];
        $('.memory-game').html('');
        $('.memory-game').removeClass('hero');
        $('#you-won-text').removeClass('visible');
        $('#prize-overlay').addClass('visible');

    })

    $('#closePrize').click(() => {
        $('#prize-overlay').removeClass('visible');
        $('#difficulty-overlay').addClass('visible');

    })

    function getCards() {
        if (easyLevel) {
            cardsList = easyCardsList;
        } else {
            cardsList = hardCardsList;
        }
        let cardImages = cardsList;
        console.log(cardsList);
        cardImages.forEach((image) => {
            const tiles = document.createElement('div');
            $(tiles).addClass('memory-card').attr('data-image', image.name).html(`<img class="front-face" src="${image.img}" alt="${image.name} image" />
            <img class="back-face" src="assets/images/marvel-logo2.png" alt="marvel-logo" />`);
            $('.memory-game').prepend(tiles);
        })
    }

    function shuffleCards() {
        getCards();
        const cards = document.querySelectorAll('.memory-card');
        // shuffle using flex order value
        cards.forEach(function(card) {
            let shufflePos = Math.floor(Math.random() * 16);
            card.style.order = shufflePos;
            cards.forEach((card) => {
                card.addEventListener('click', flipCard);
            });
        });
    }

    let isCardFlipped = false;
    let lockCards = false;
    let fistCard;
    let secondCard;
    let moveCounter = 0;

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
        moveCounter++;
        $('#moves').html(moveCounter);
    }

    function disableCards() {
        fistCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        fistCard.classList.add('matched');
        secondCard.classList.add('matched');
        audio.match();
        matchedCards.push(fistCard);
        matchedCards.push(secondCard);

        let matchedPairs = matchedCards.length;
        let matches = matchedPairs / 2;
        $('#pairs').html(matches);

        if (matchedCards.length === cardsList.length) {
            clearInterval(resetCounter);
            matchedCards.length = 0;
            matches = 0;

            audio.stopMusic();
            easyLevel = null;

            setTimeout(function() {
                $('.memory-card').removeClass('flip');
                $('#you-won-text').addClass('visible');
                audio.victorySound();

                $('.memory-card').removeClass('matched');
                $('#you-won-text').click(() => {
                    easyLevel = null
                    sound = true
                    $('#soundToggler').addClass('soundOn')
                    $('#soundToggler').removeClass('soundOff')
                    $('#pairs').html(0);
                    $('#moves').html(0);
                    $('#time-remaining').html('0');
                    matchedCards = [];
                    moveCounter = 0;
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

    function fetchData() {
        let baseURL = "https://gateway.marvel.com/v1/public/characters?";
        // const apikey = "&limit=100&ts=1&apikey=2479ac670ffd22a005793a85e2cd6556&hash=148c15d91ce2f088e7a99e28892d0da2"
        let offSet = (Math.floor(Math.random() * 15)) * 100;
        let apikey = `&limit=100&offset=${offSet}&ts=1&apikey=2479ac670ffd22a005793a85e2cd6556&hash=148c15d91ce2f088e7a99e28892d0da2`;
        let prizeCharacters1 = [];
        fetch(baseURL + apikey)
            .then(response => response.json())
            .then(json => {
                let data = json;
                $('#footer-text').html(data.attributionText.toUpperCase());
                let prizeList = data.data.results;

                for (prize of prizeList) {
                    if (prize.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" || prize.thumbnail.extension === "gif") {
                        continue;
                    } else {
                        prizeCharacters1.push(prize);
                    }
                }
                let prizeNum = Math.floor(Math.random() * prizeCharacters1.length + 1);
                let prizeCharacter = (prizeCharacters1[prizeNum]);
                $('.prize-text').html(prizeCharacter.name.toUpperCase());
                $('.prize-content').html(`<img src="${prizeCharacter.thumbnail.path}/portrait_fantastic.${prizeCharacter.thumbnail.extension}"></img>`);
                $('.prize-bio').html(`<a target="_blank" href="${prizeCharacter.urls[0].url}">click <span>here</span> to GO TO MARVEL.com for more on ${prizeCharacter.name} or...</a>`);
                console.log(prizeCharacter);
            })
            .catch(err => console.log(err));
    }
    fetchData();
});