
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  var baseURL = "https://gateway.marvel.com/v1/public/characters?";
  var apikey = "&ts=1&apikey=2479ac670ffd22a005793a85e2cd6556&hash=148c15d91ce2f088e7a99e28892d0da2";
  $.getJSON(baseURL + apikey, function (data) {
    console.log(data.attributionText);
    var footer = document.getElementById('footer-text');
    footer.innerText = data.attributionText.toUpperCase();
  });

  var audioControl = /*#__PURE__*/function () {
    function audioControl() {
      _classCallCheck(this, audioControl);

      this.bgMusic = new Audio('assets/sounds/backgroundMusic.mp3');
      this.flipSound = new Audio('assets/sounds/card-flip.wav');
      this.matchedSound = new Audio('assets/sounds/matchedSound.wav');
      this.victory = new Audio('assets/sounds/badass-victory.wav');
    }

    _createClass(audioControl, [{
      key: "startMusic",
      value: function startMusic() {
        this.bgMusic.currentTime = 0;
        this.bgMusic.play();
      }
    }, {
      key: "stopMusic",
      value: function stopMusic() {
        this.bgMusic.pause();
      }
    }, {
      key: "flip",
      value: function flip() {
        this.flipSound.play();
      }
    }, {
      key: "match",
      value: function match() {
        this.matchedSound.play();
      }
    }, {
      key: "victorySound",
      value: function victorySound() {
        this.victory.play();
      }
    }]);

    return audioControl;
  }(); //timer and flip count


  var audio = new audioControl();
  var timer;
  var resetCounter;
  var matchedCards = [];
  console.log($('#time-remaining').html());

  function startTimer() {
    timer = 60;
    resetCounter = setInterval(function () {
      var countDown = timer--;
      $('#time-remaining').html(countDown);

      if (countDown === 0) {
        clearInterval(resetCounter);
        audio.stopMusic();
        matchedCards = [];
        timeUp();
      }
    }, 1000);

    function timeUp() {
      setTimeout(function () {
        audio.victorySound();
        $('.memory-card').removeClass('flip');
        $('.memory-card').removeClass('matched');
        $('#game-over-text').addClass('visible');
      }, 1000);
      $('#game-over-text').click(function () {
        $('#game-over-text').remove('visible');
        shuffleCards();
        $('#pairs').html(0);
      });
    }
  } //console.log();
  //select all cards


  var cards = document.querySelectorAll('.memory-card'); // Click to start overlay

  $('.overlay-text').click(function () {
    $('.overlay-text').removeClass('visible');
    audio.startMusic();
    startTimer();
  });

  function shuffleCards() {
    // shuffle using flex order value
    cards.forEach(function (card) {
      var shufflePos = Math.floor(Math.random() * 16);
      card.style.order = shufflePos;
      cards.forEach(function (card) {
        card.addEventListener('click', flipCard, function () {});
      });
    });
  }

  shuffleCards();
  var isCardFlipped = false;
  var lockCards = false;
  var fistCard;
  var secondCard; // Flip card with a click

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
    } //second click


    isCardFlipped = false;
    secondCard = this; //do cards match?

    checkForMatch();
  }

  function checkForMatch() {
    //  ternary operator 
    var doMatch = fistCard.dataset.image === secondCard.dataset.image;
    doMatch ? disableCards() : unflipCards(); // if (fistCard.dataset.image === secondCard.dataset.image) {
    //     disableCards();
    // } else {
    //     //does not match. Timeout used to view 2nd card
    //     unflipCards();
    // }
  }

  function disableCards() {
    fistCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard); //console.log(fistCard.classList);

    fistCard.classList.add('matched');
    secondCard.classList.add('matched');
    audio.match();
    matchedCards.push(fistCard);
    matchedCards.push(secondCard);
    var matchedPairs = matchedCards.length;
    var matches = matchedPairs / 2;
    $('#pairs').html(matches);

    if (matchedCards.length === 16) {
      clearInterval(resetCounter);
      matchedCards.length = 0;
      matches = 0;
      audio.stopMusic();
      setTimeout(function () {
        audio.victorySound();
        $('.memory-card').removeClass('flip');
        $('#you-won-text').addClass('visible');
        $('.memory-card').removeClass('matched');
        $('#you-won-text').click(function () {
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