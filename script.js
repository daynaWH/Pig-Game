'use strict';

// Selecting elements list
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const totalScore0 = document.getElementById('score--0');
const totalScore1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  // Set the active player's current score to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Reassign the active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // Change the background colors -> toggle .player--active
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Starting conditions

let isPlaying, activePlayer, currentScore, scores;

const startingCondition = function () {
  //Initial State
  isPlaying = true;
  diceEl.classList.add('hidden');
  activePlayer = 0; // Game starts with player 0

  // Set all scores (current, total) to 0
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  currentScore = 0;
  scores = [0, 0]; // Accumulated scores for both players

  // Reset player 0 as a starting player
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

startingCondition();

// Rolling Dice Functionality

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // Generate a random dice roll
    let diceRoll = Math.trunc(Math.random() * 6) + 1;

    // Display dice of the corresponding roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    console.log(diceRoll);

    // Check if diceRoll === 1 ? switch player : add dice to current score
    if (diceRoll !== 1) {
      // Add score to the active player at the moment
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding Score Functionality

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // Add current score to the active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if total score >= 100 ? active player wins : switch player
    if (scores[activePlayer] >= 100) {
      // Add properties of a winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // End the game
      isPlaying = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// Game Reset Functionality

btnNew.addEventListener('click', startingCondition);
