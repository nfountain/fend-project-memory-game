// Declare variables
// Deck (for EventListener)
const deckOfCards = document.querySelector('.deck');

// Cards, list of all cards, list of opened cards
let card = document.querySelectorAll('.card');
let cardsThatMatch = document.querySelectorAll('.match');
let listOfCards = [...card];
let flippedCards = []; // Idea to create an empty array to hold the flipped cards is courtesy of Matt Cranford's blog, accessed 06/19/18 at <https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/>
let matchedCards = [];

// Stars
const starList = document.querySelector('ul.stars');
let stars = document.querySelectorAll('ul.stars li');

// Moves (Counter)
const moveCount = document.querySelector('.moves');
let moves = 0;

// Clock
const clock = document.querySelector('.clock');
let seconds = 0;
let minutes = 0;
var timer;

// resetButton
const resetButton = document.querySelector('.restart');

// INTERACTING WITH THE CARDS AND DECK
// Resources: Card shuffle function from http://stackoverflow.com/a/2450976
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
};

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
                matchedCards.push(flippedCards[0]);
                matchedCards.push(flippedCards[1]);
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

// COUNTERS

// Counting moves and removing stars
function addMove() {
    moves ++;
    moveCount.innerHTML = moves;
    if(moves === 10) {
        starList.removeChild(stars[0]);
    } else if(moves === 20) {
        starList.removeChild(stars[1]);
    }
};
// Used removeChild from the DOM, instead of style.visibility = hidden because that made the most sense to me. Using the 'ul' in the querySelector is courtesy of Ryan Waite's Memory Game Webinar from 06/05/18.

function resetMoves() {
    moves = 0;
    moveCount.innerHTML = moves;
};

// Reset Stars
function resetStars() {
    const starList = document.querySelector('ul.stars');
    let stars = document.querySelectorAll('ul.stars li');
};

// Clock/Timer
function startTime() {
    timer = setInterval(function() {
        seconds ++;
        displayTime();
    }, 1000)
};

function displayTime() {
    if(seconds ===0) {
        seconds = `00`;
    }
    if(seconds < 10) {
        seconds = `0${seconds}`;
    }
    if(seconds === 60) {
        minutes++;
        seconds = 0;
    }
clock.innerHTML = `${minutes}:${seconds}`;
};

// Stop timer
function stopTime() {
    clearInterval(timer);//It still doesn't work properly...
};


// RESET THE GAME BOARD AND SCORES
function resetAll() {
    //stopTime();
    startTime();
    resetCards();
    resetMoves();
    resetStars();
};

/*
// WIN GAME FUNCTIONS
function returnStats() {
    returnTime(final);
    moveCount(final);
    starCount(final);
};

// Resources: https://www.w3schools.com/howto/howto_css_modals.asp
function popUp() {
    //create popup
    //returnStats();
};

*/

function allMatched() {
    if(matchedCards.length === 16) {
        console.log('All Cards are Matched!');
        winGame();
    }
};

function winGame() {
    console.log('Maybe this works!');
    //popUp();
    //returnStats();
    //return startTimer();
    //stopTime();
};

// EVENT LISTENERS
// Resources: syntax from W3Schools on 06/24/18 <https://www.w3schools.com/jsref/event_onload.asp>
document.addEventListener('load', resetAll());

resetButton.addEventListener('click', function() {
    stopTime();// stop & start time does not work why???
    startTime();
    resetCards();
    resetMoves();// Moves go to 0, but with next move, they just continue adding. Why?
    resetStars();
});// FIX BUTTON

deckOfCards.addEventListener('click', function(event) {
    let evtTarget = event.target;
    if(evtTarget.nodeName === 'LI') {
        flipCard(evtTarget);
        flippedCards.push(evtTarget);
        if(flippedCards.length === 2) {
            checkForMatch(flippedCards);
        }
    }
    allMatched();
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
 * DONE - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * DONE - if the list already has another card, check to see if the two cards match
 * DONE - if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * DONE - if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * DONE - increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *      + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */