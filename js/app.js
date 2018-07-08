// Declare variables
// Deck (for EventListener)
const deckOfCards = document.querySelector('.deck');

// Cards, list of all cards, list of opened cards
let card = document.querySelectorAll('.card');
let cardsThatMatch = document.querySelectorAll('.match');
let listOfCards = [...card];
let flippedCards = []; // Idea to create an empty array to hold the flipped cards is courtesy of Matt Cranford's blog, accessed 06/19/18 at <https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/>
let matchedCards = [];

// Buttons (reset game, and restart game from the winGame modal)
const resetButton = document.querySelector('.restart');
const restartButton = document.querySelector('.new-game');

// INTERACTING WITH THE CARDS AND DECK
// Resources: Card shuffle function came pre-loaded by Udacity; originally from <http://stackoverflow.com/a/2450976>
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
        });// Using and empty array to call the forEach method is courtesy of sandraisreal accessed 06/24/18, at <https://github.com/sandraisrael/Memory-Game-fend>
        listOfCards[i].classList.remove('match', 'open', 'show');
    };
};

// Resources: https://www.w3schools.com/howto/howto_js_toggle_class.asp
function flipCard(evtTarget) {
    evtTarget.classList.toggle('open');
    evtTarget.classList.toggle('show');
};

// Resources: firstElementChild.classList did not work, so used Matt Cranford's approach of firstElementChild.className to find matches. Accessed his write-up of the code on 06/24/18 at <https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/>
function checkForMatch() {
    if(flippedCards.length === 2) {
        setTimeout(function() {
            if(flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) {
                flippedCards[0].classList.toggle('match');
                flippedCards[1].classList.toggle('match');
                matchedCards.push(flippedCards[0]);
                matchedCards.push(flippedCards[1]);
                addMove();
                flippedCards.splice(0, 2);
                allMatched();
            } else {
                flippedCards[0].classList.toggle('open');
                flippedCards[0].classList.toggle('show');
                flippedCards[1].classList.toggle('open');
                flippedCards[1].classList.toggle('show');
                addMove();
                flippedCards.splice(0, 2);
            }
        }, 1500);
    }
};

// COUNTERS

// Moves (Counter)
const moveCount = document.querySelector('.moves');
let moves = 0;

// Stars
let stars = document.querySelectorAll('ul.stars li');
let starList = ['star1', 'star2', 'star3'];

// Counting moves and removing stars
function addMove() {
    moves ++;
    moveCount.innerHTML = moves;
    if(moves === 10) {
        hideStar();
    } else if(moves === 20) {
        hideStar();        
    }
};

// hideStar() for...of loop courtesy of Matt Cranford's blog accessed 07/03/18, at <https://matthewcranford.com/memory-game-walkthrough-part-5-moves-stars/>
function hideStar() {
    for(star of stars) {
        if(star.style.visibility !== "hidden") {
            (star.style.visibility = "hidden")
            starList.pop();
            break;
        }
    }
}

function resetMoves() {
    moves = 0;
    moveCount.innerHTML = moves;
};

// Reset Stars
function resetStars() {
    for(star of stars) {
        if(star.style.visibility !== "visible") {
            (star.style.visibility = "visible")
        }
    }
    starList = ['star1', 'star2', 'star3'];
};

// Clock/Timer
// Resources: Memory Game Webinar with Ryan Waite used to help write the timer. Accessed 06/30/18, at <https://www.youtube.com/watch?v=oECVwum-7Zc&list=PL-UQ6doHcWnLwHtzKo_kGkZo9AcKI9KhL&index=12&t=2854s>. 
const clock = document.querySelector('.clock');
let seconds = 0;
let minutes = 0;
let timer;

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
    clearInterval(timer);
};

// Restart/Clear value of timer & display
function clearTime() {
    seconds = 0;
    minutes = 0;
    clock.innerHTML = `${minutes}:0${seconds}`;
  };

// RESET THE GAME BOARD AND SCORES
function resetAll() {
    stopTime();
    clearTime();
    startTime();
    resetCards();
    resetMoves();
    resetStars();
};

// MODAL
// Resource: Used code from a Traversy Media video titled "Create a Modal with HTML, CSS, and JavaScript" viewed on 07/07/18, at <https://www.youtube.com/watch?v=6ophW7Ask_0>

const modal = document.querySelector('.win-modal');

// open modal
function openModal() {
    modal.style.display = 'block';
};

// close modal functions
function closeModal() {
    modal.style.display = 'none';
};

function clickOutside(event) {
    if(event.target === modal) {
        modal.style.display = 'none';
    }
};

// Insert win statistics in modal:
let winTime = document.querySelector('.clock-win');
let winMoves = document.querySelector('.moves-win');
let winStars = document.querySelector('.stars-win');

function returnStats() {
    winTime.innerHTML = clock.innerHTML;
    winMoves.innerHTML = moves;
    winStars.innerHTML = starList.length;
};

// WIN GAME FUNCTIONS
function allMatched() {
    if(matchedCards.length === 16) {
        winGame();
    }
};

function winGame() {
    stopTime();
    returnStats();
    openModal();
};

// EVENT LISTENERS
// Resources: syntax for event listeners is from W3Schools on 06/24/18 <https://www.w3schools.com/jsref/event_onload.asp>
document.addEventListener('load', resetAll());

resetButton.addEventListener('click', resetAll);

restartButton.addEventListener('click', function() {
    resetAll();
    closeModal();
});

window.addEventListener('click', clickOutside);

deckOfCards.addEventListener('click', function(event) {
    let evtTarget = event.target;
    if(evtTarget.nodeName === 'LI') {
        flipCard(evtTarget);
        flippedCards.push(evtTarget);
        if(flippedCards.length === 2) {
            checkForMatch(flippedCards);
        }
    }
});