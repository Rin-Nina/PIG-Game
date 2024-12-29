'use strict';

// getting the elements
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0EL = document.querySelector('#current--0');
const currentScore1EL = document.querySelector('#current--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

let currentScore;
let activePlayer;
let score;
let palying;
//initialisation function

const init = function () {
  currentScore0EL.textContent = 0;
  currentScore1EL.textContent = 0;
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  player0EL.classList.remove('player--winner');
  player0EL.classList.remove('player--winner');
  score0EL.textContent = '0';
  score1EL.textContent = '0';
  diceEL.classList.add('hidden');

  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  palying = true;
};

init();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
// rolling the dice

btnRoll.addEventListener('click', function () {
  if (palying) {
    // will need a radom dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    //show dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //check if dice ==1 ,switch player
    if (dice !== 1) {
      //set the new score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

// hold button
btnHold.addEventListener('click', function () {
  if (palying) {
    // add the current score to active player
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // checkif player score is 100

    if (score[activePlayer] >= 100) {
      //end the game
      palying = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
    } else {
      // switch to teh next player
      switchPlayer();
    }
  }
});

// reset the game
btnNew.addEventListener('click', init);
