// Declare variables
// Deck (for EventListener)
const deckOfCards = document.querySelector('.deck');

// Cards, list of all cards, list of opened cards
let card = document.querySelectorAll('.card');
let cardsThatMatch = document.querySelectorAll('.match');
let listOfCards = [...card];
let flippedCards = []; // Idea to create an empty array to hold the flipped cards is courtesy of Matt Cranford's blog, accessed 06/19/18 at <https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/>

// Stars
let stars = document.querySelectorAll('.fa-star');

// Moves (Counter)
const moveCount = document.querySelector('.moves');
let moves = 0;

// Clock
const clock = document.querySelector('.clock');

// resetButton
let resetButton = document.querySelector('.restart');

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
        [].forEach.call(listOfCards, function(newCard) {
            deckOfCards.appendChild(newCard);
        });// Using and empty array to call the forEach method is courtesy of sandraisreal accessed 06/24/18
        listOfCards[i].classList.remove('match', 'open', 'show');
    };
};

function addMove() {
    moves ++;
    moveCount.innerHTML = moves;
};

function startTime() {
    let seconds = 0;
    let minutes = 0;
    setInterval(function() {
        seconds ++;
        if(seconds < 10) {
            seconds = `0${seconds}`;
        }
        if(seconds === 60) {
            minutes++;
            seconds = 0;
        }
    clock.innerHTML = `${minutes}:${seconds}`;
    }, 1000)
};

// Stop timer
function stopTime() {
    clearInterval(startTime);
};

/*
function resetStars() {

};

*/

function resetMoves() {
    let moves = 0;
    moveCount.innerHTML = moves;
};

function resetGame() {
    resetCards();
    resetMoves();
    startTime();
    //resetStars();
};

/*
function resetAll() {
    stopTime();
    resetGame();
    console.log('not working');
};

function returnStats() {
    returnTime(final);
    moveCount(final);
    starCount(final);
};

https://www.w3schools.com/howto/howto_css_modals.asp
function popUp() {
    
};

function winGame() {
    popUp();
    returnStats();
    stopTime();
};
*/

// Event listener for page load. Syntax from W3Schools on 06/24/18 <https://www.w3schools.com/jsref/event_onload.asp>
document.addEventListener('load', resetGame());

// Event listener for resetButton
resetButton.addEventListener('click', resetAll());

// Interacting with cards

// Resources: https://www.w3schools.com/howto/howto_js_toggle_class.asp
function flipCard(evtTarget) {
    evtTarget.classList.toggle('open');
    evtTarget.classList.toggle('show');
};

// Resources: firstElementChild.classList did not work, so used Matt Cranford's approach of firstElementChild.className
// TODO: Fix bug that allows cards with the 'match' class to be added to the array.
function checkForMatch() {
    if(flippedCards.length === 2) {
        setTimeout(function() {
            if(flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) {
                flippedCards[0].classList.toggle('match');
                flippedCards[1].classList.toggle('match');
                console.log('they match!');
                addMove();
                flippedCards.splice(0, 2);
            } else {
                flippedCards[0].classList.toggle('open');
                flippedCards[0].classList.toggle('show');
                flippedCards[1].classList.toggle('open');
                flippedCards[1].classList.toggle('show');
                console.log('no match!');
                addMove();
                flippedCards.splice(0, 2);
            }
        }, 1500);
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
            checkForMatch(flippedCards);
        }
    }
});


/* DONE
 * Display the cards on the page 
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 * DONE - display the card's symbol (put this functionality in another function that you call from this one)
 * MOVE THE CLASS CHANGE TO ANOTHER FUNCTION - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * DONE - if the list already has another card, check to see if the two cards match
 * MOVE THE CLASS CHANGE TO ANOTHER FUNCTION     + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * MOVE THE CLASS CHANGE TO ANOTHER FUNCTION     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *      + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *      + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Pop up message resources:
// https://www.w3schools.com/js/js_popup.asp
// https://www.w3schools.com/howto/howto_css_modals.asp