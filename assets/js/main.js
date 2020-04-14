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

    let cardsList = [{
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
        },
    ]

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
        // console.log(sound);
        // console.log({ soundToggler });
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
        timer = 61;
        resetCounter = setInterval(() => {
            timer--;
            let countDownMin = Math.floor(timer / 60);
            let countDownSec = timer % 60;
            let countDownSecounds = countDownSec.toString().padStart(2, '0');
            $('#time-remaining').html(`${countDownMin}:${countDownSecounds}`);
            if (timer === 0) {
                clearInterval(resetCounter);
                audio.stopMusic();
                matchedCards = [];
                timeUp();
                $('#time-remaining').html('0');
            }
        }, 1000);

        function timeUp() {
            setTimeout(() => {
                audio.victorySound();
                $('.memory-card').removeClass('flip');
                $('.memory-card').removeClass('matched');
                $('#game-over-text').addClass('visible');
            }, 1000)
            $('#game-over-text').click(() => {
                sound = true
                $('#game-over-text').removeClass('visible');
                $('#soundToggler').addClass('soundOn')
                $('#soundToggler').removeClass('soundOff')
                $('#pairs').html(0);
                clearInterval(resetCounter);
                shuffleCards();
                audio.startMusic();
                startTimer();
            })
        }
    }

    function getCards() {
        let cardImages = cardsList;
        cardImages.forEach((image) => {
            const tiles = document.createElement('div');
            $(tiles).addClass('memory-card').attr('data-image', image.name).html(`<img class="front-face" src="${image.img}" alt="${image.name} image" />
            <img class="back-face" src="assets/images/marvel-logo2.png" alt="marvel-logo" />`);
            console.log(image.name, tiles);
            $('.memory-game').prepend(tiles);
        })
    }

    getCards();

    const cards = document.querySelectorAll('.memory-card');
    // Click to start overlay
    $('#start-overlay').click(() => {
        getData();
        $('#start-overlay').removeClass('visible');
        audio.startMusic();
        startTimer();
    });

    function shuffleCards() {
        // shuffle using flex order value
        cards.forEach(function(card) {
            let shufflePos = Math.floor(Math.random() * 16);
            card.style.order = shufflePos;
            cards.forEach(function(card) {
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


        if (matchedCards.length === 16) {
            clearInterval(resetCounter);
            matchedCards.length = 0;
            matches = 0;
            audio.stopMusic();

            setTimeout(function() {
                $('.memory-card').removeClass('flip');
                $('#you-won-text').addClass('visible');
                audio.victorySound();

                $('.memory-card').removeClass('matched');
                $('#you-won-text').click(function() {
                    sound = true
                    $('#soundToggler').addClass('soundOn')
                    $('#soundToggler').removeClass('soundOff')
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

    $('#prizeBtn').click(function() {
        $('#you-won-text').removeClass('visible');
        $('#prize-overlay').addClass('visible');

    })

    $('#closePrize').click(function() {
        $('#prize-overlay').removeClass('visible');
        $('#start-overlay').addClass('visible');

    })

    function getData() {
        const baseURL = "https://gateway.marvel.com/v1/public/characters?"
            // const apikey = "&limit=100&ts=1&apikey=2479ac670ffd22a005793a85e2cd6556&hash=148c15d91ce2f088e7a99e28892d0da2"
        let offSet = (Math.floor(Math.random() * 15)) * 100;
        let apikey = `&limit=100&offset=${offSet}&ts=1&apikey=2479ac670ffd22a005793a85e2cd6556&hash=148c15d91ce2f088e7a99e28892d0da2`
        let prizeCharacters = [];
        $.getJSON(baseURL + apikey, function(data) {
            $('#footer-text').html(data.attributionText.toUpperCase());
            console.log(data);
            let prizeList = data.data.results;
            for (prize of prizeList) {
                if (prize.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" || prize.thumbnail.extension === "gif") {
                    continue;
                } else {
                    prizeCharacters.push(prize);
                }
            }
            console.log(prizeCharacters);

            let prizeNum = Math.floor(Math.random() * prizeCharacters.length + 1);
            prizeCharacter = (prizeCharacters[prizeNum]);
            console.log(prizeCharacter.name);
            $('.prize-text').html(prizeCharacter.name.toUpperCase());
            $('.prize-content').html(`<img src="${prizeCharacter.thumbnail.path}/portrait_fantastic.${prizeCharacter.thumbnail.extension}"></img>`);
            $('.prize-bio').html(`<a target="_blank" href="${prizeCharacter.urls[0].url}">click <span>here</span> to GO TO MARVEL.com for more on ${prizeCharacter.name} or...</a>`);
            console.log(prizeCharacter.thumbnail.path);
        });
    }
    getData();
});