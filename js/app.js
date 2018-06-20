/*
 * Create a list that holds all of your cards
 */

// Can I deckOfCards.nodeList.item() to turn the nodeList items from deckOfCards into an array?
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// https://www.w3schools.com/howto/howto_js_toggle_class.asp

/*
function flipCard() {
    this.cards.classList.toggle('.open');
    this.cards.classList.toggle('.show');
}
*/

const deckOfCards = document.querySelector('.deck');
let card = document.querySelectorAll('.card');
console.log(card);

deckOfCards.addEventListener('click', function(event) {
    let evtTarget = event.target;
    if(evtTarget.nodeName === 'LI') {
        flipCard(evtTarget);
    console.log('Gotcha!');
    }
});

function flipCard(evtTarget) {
    evtTarget.classList.toggle('open');
    evtTarget.classList.toggle('show');
};

// create array to hold the flipped cards, courtesy of Matt Cranford's blog, accessed 06/19/18 at <https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/>
let flippedCards = [];

function matchCard() {
    flippedCards.push(evtTarget);
/*    if(flippedCards.length === 2) {
        checkForMatch
    } */
};
