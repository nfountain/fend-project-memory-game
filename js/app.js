// Declare variables
// Deck (for EventListener)
const deckOfCards = document.querySelector('.deck');

// Cards, list of all cards, list of opened cards
let card = document.querySelectorAll('.card');
let cardsThatMatch = document.querySelectorAll('.match');
let listOfCards = [...card];
console.log(listOfCards);
let flippedCards = []; // create array to hold the flipped cards, courtesy of Matt Cranford's blog, accessed 06/19/18 at <https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/>

// Stars
let stars = document.querySelectorAll('.fa-star');

// Moves (Counter)

// resetButton
let resetButton = document.getElementById('reset-game');

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

function resetCards() {
    listOfCards = shuffle(listOfCards);
    for(let i = 0; i < listOfCards.length; i++) {
        deckOfCards.innerHTML = "";
        // using array symbols to call the forEach method courtesy of sandraisreal accessed 06/24/18
        [].forEach.call(listOfCards, function(newCard) {
            deckOfCards.appendChild(newCard);
        });
        listOfCards[i].classList.remove('match', 'open', 'show');
    }
};

/*
function resetStars() {

};

function resetMoves() {

};

function resetTimer() {

};

*/

// Event listener for page load that shuffles cards with each load (which includes reloads). Syntax from W3Schools on 06/24/18 <https://www.w3schools.com/jsref/event_onload.asp>
document.addEventListener('load', resetCards());
// Hoping I can call multiple functions in this event listener. Maybe an arrow function with each function on its own line? If not, I'll need to string all of the reset functions into one reset function with multiple [anonymous?] functions, and call that here with the page load and reset button.

// Event listener for resetButton
resetButton.addEventListener('click', function(event) {
    resetCards();
    //resetMoves();
    //resetTimer();
});

// Interacting with cards (click to flip, add to array of clicked cards, check for match, and classList.toggle('match') if matches, otherwise, classList.remove('open') and classList.remove('show))
function flipCard(evtTarget) {
    evtTarget.classList.toggle('open');
    evtTarget.classList.toggle('show');
};

// firstElementChild.classList did not work, so used Matt Cranford's approach of firstElementChild.className
function checkForMatch() {
    if(flippedCards.length === 2) {
        setTimeout(function() {
            if(flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) {
                flippedCards[0].classList.toggle('match');
                flippedCards[1].classList.toggle('match');
                console.log('they match!');
            }
        }, 3000);
    }
};

deckOfCards.addEventListener('click', function(event) {
    let evtTarget = event.target;
    if(evtTarget.nodeName === 'LI') {
        flipCard(evtTarget);
        flippedCards.push(evtTarget);
        console.log('Gotcha!');
        console.log(flippedCards);
        if(flippedCards.length === 2) {
            console.log('2 cards!');
            checkForMatch(flippedCards);// goes here once that function works
        }
    }
});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

