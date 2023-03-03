//sets a nodes list for each div card of the game board
const gameCards = document.querySelectorAll('.gameCard');
let cards = [...gameCards];

//sets variables to help define changes for score board and victory
const button = document.getElementById('startOver');
const winner = document.getElementById('scoreBoard');
const congrats = document.getElementById('scoreHeading');
const gameBoard = document.getElementById('gameBoard');

//gives variable for each star rating on scoreboard to have display toggled if needed
const firstStar = document.getElementById('firstStar');
const secondStar = document.getElementById('secondStar');
const thirdStar = document.getElementById('thirdStar');

//creates new div boxes for moves score and timer score on score board
let timerDiv = document.getElementById('timer');
let movesDiv = document.getElementById('moves');

//Score Board variables
let time = 0;
let moves = 0;

//Game Board Variables
let flipped = false;
let twoFlipped = false;
let firstCardChild, secondCardChild;
let firstCard, secondCard;
let matched = 0;

document.body.onload = shuffleCards();

function flipCard() {
  //stops more than two cards from being clicked at one time
  if (twoFlipped) {
    return;
  }

  //starts the timer on first flipped card
  if (moves === 0 && flipped === false) {
    timer();
  }

  //adds flipped class, showing the front image and removing pointer events
  this.classList.add('flipped');

  //Sets card to firstCard, and setting verifier to true to make next card secondCard
  if (!flipped) {
    flipped = true;
    firstCard = this;
    firstCardChild = this.firstElementChild;
  }
  //runs functions to compare firstCard and secondCard for match and adds increase move score
  else {
    secondCard = this;
    secondCardChild = this.secondElementChild;
    checkIfMatched();
    movesCount();
  }
}

function checkIfMatched() {
//removes the ability to flip the card when clicked if the cards match
  if (firstCard.dataset.pairings === secondCard.dataset.pairings) {
    correctMatch();
  }
  else {
    incorrectMatch();
    unflip();
  }
}

//creates a color change to let user know the match was correct
function correctMatch() {
  firstCardChild.classList.add('matched');
  secondCardChild.classList.add('matched');
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matched += 1;

//after matching all the cards score board enlarges with ratings, moves, and timer posted
  if (matched === 8) {
    gameBoard.style.opacity = "0.01";
    winner.classList.add('show');
    [flipped, twoFlipped] = [true, true];
    congrats.innerHTML = "Gradulations You Won!";
    return;
  }
  resetCards();
}

//creates a color change to let user know the match was incorrect
function incorrectMatch() {
  firstCardChild.classList.add('unmatched');
  secondCardChild.classList.add('unmatched');
}

//unflips the cards if matched incorrectly
function unflip() {
  twoFlipped = true;

//sets a short timer to allow for minor animations before cards reset
  setTimeout(() => {
  firstCard.classList.remove('flipped');
  secondCard.classList.remove('flipped');
  firstCardChild.classList.remove('unmatched');
  secondCardChild.classList.remove('unmatched');
  resetCards();
  }, 1000);
}

//resets verifiers and erases values of cards flipped
function resetCards() {
  flipped = false;
  twoFlipped = false;
  firstCard = null;
  secondCard = null;
  firstCardChild = null;
  secondCardChild = null;
}

//sets random order and position for div cards on game board
function shuffleCards() {
  //sets a different position in flexbox styling for each div card
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

//Counts the amount of moves (every two flipped cards) and posts to the scoreboard
function movesCount() {
  moves += 1;
  movesDiv.innerHTML = ("Moves : " + moves);

  //Moves count used to set Star Rating per attempt
  if (moves >= 14) {
    changeRating();
  }
}

//star rating based on the amount of moves used per game
function changeRating() {
  firstStar.style.display = "none";

  if (moves >= 18) {
    secondStar.style.display = "none";
  }
}

//Timer starts on page load, each time it runs 1000miliseconds it runs itself again adding 1
function timer() {
  setTimeout(function() {
    time += 1;
    timerDiv.innerHTML = ("Time : " + time + " seconds");
    if (matched === 8) {
      return;
    } timer();}, 1000)
}

//restart the game function
function reload() {
  location.reload();
}

cards.forEach(card => card.addEventListener('click', flipCard));
button.addEventListener('click', reload);
