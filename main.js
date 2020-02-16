const cards = document.querySelectorAll('.memory-card');


// Flip card with a click
function flipCard(){
    console.log('i was clicked!');
    console.log(this);
    this.classList.toggle('flip');
}

cards.forEach(function(card){
    card.addEventListener('click', flipCard);
});