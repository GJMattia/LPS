// Player Buttons
const lapisBtn = document.getElementById('lapis');
const papyrusBtn = document.getElementById('papyrus');
const scalpellusBtn = document.getElementById('scalpellus');

// Computer Buttons
const computerLapis = document.getElementById('computerLapis');
const computerPapyrus = document.getElementById('computerPapyrus');
const computerScalpellus = document.getElementById('computerScalpellus');


// Shoot Button
const shootBtn = document.getElementById('shootBtn');
const result = document.getElementById('result');
const originalResult = result.innerHTML;

//    Point Fields
const playerPoints = document.getElementById('playerPoints');
const computerPoints = document.getElementById('computerPoints');


//    Gamemode Selector
let oneDoneBtn = document.getElementById('oneDone');
let twoThreeBtn = document.getElementById('twoThree');
let threeFiveBtn = document.getElementById('threeFive');


let gameMode = null;


const oneDoneGM = () => {
   if (playerScore || computerScore > 0) {
      return;
   } else {
      gameMode = 1;
      oneDoneBtn.classList.add('selectedGM');
      twoThreeBtn.classList.remove('selectedGM');
      threeFiveBtn.classList.remove('selectedGM');
      result.innerHTML = 'The winner will be decided by a SINGLE GAME!';
   };
};

const twoThreeGM = () => {
   if (playerScore || computerScore > 0) {
      return;
   } else {
      gameMode = 3;
      oneDoneBtn.classList.remove('selectedGM');
      twoThreeBtn.classList.add('selectedGM');
      threeFiveBtn.classList.remove('selectedGM');
      result.innerHTML = 'The first person to win TWO ROUNDS is the winner!';
   };
};

const threeFiveGM = () => {
   if (playerScore || computerScore > 0) {
      return;
   } else {
      gameMode = 5;
      oneDoneBtn.classList.remove('selectedGM');
      twoThreeBtn.classList.remove('selectedGM');
      threeFiveBtn.classList.add('selectedGM');
      result.innerHTML = 'The first person to win THREE ROUNDS is the winner!';
   };
};


oneDoneBtn.addEventListener('click', oneDoneGM);
twoThreeBtn.addEventListener('click', twoThreeGM);
threeFiveBtn.addEventListener('click', threeFiveGM);


// Game Elements

const choices = ['lapis', 'papyrus', 'scalpellus'];

let playerChoice = null;
let computerChoice = null;

let lapisChoice = () => {
   if (gameMode === null) {
      return;
   } else {
      playerChoice = choices[0];
      lapisBtn.classList.add('playerChoice');
      papyrusBtn.classList.remove('playerChoice');
      scalpellusBtn.classList.remove('playerChoice');
   };
}

let papyrusChoice = () => {
   if (gameMode === null) {
      return;
   } else {
      playerChoice = choices[1];
      papyrusBtn.classList.add('playerChoice');
      lapisBtn.classList.remove('playerChoice');
      scalpellusBtn.classList.remove('playerChoice');
   };
}
let scalpellusChoice = () => {
   if (gameMode === null) {
      return;
   } else {
      playerChoice = choices[2];
      scalpellusBtn.classList.add('playerChoice');
      papyrusBtn.classList.remove('playerChoice');
      lapisBtn.classList.remove('playerChoice');
   };
}

lapisBtn.addEventListener('click', lapisChoice);
papyrusBtn.addEventListener('click', papyrusChoice);
scalpellusBtn.addEventListener('click', scalpellusChoice);




const randomComputerChoice = () => {

   let randomNum = Math.floor(Math.random() * 3);

   computerChoice = choices[randomNum];

   if (computerChoice === choices[0]) {
      computerLapis.classList.add('computerChoice');
      computerPapyrus.classList.remove('computerChoice');
      computerScalpellus.classList.remove('computerChoice');
   } else if (computerChoice === choices[1]) {
      computerPapyrus.classList.add('computerChoice');
      computerLapis.classList.remove('computerChoice');
      computerScalpellus.classList.remove('computerChoice');
   } else if (computerChoice === choices[2]) {
      computerScalpellus.classList.add('computerChoice');
      computerLapis.classList.remove('computerChoice');
      computerPapyrus.classList.remove('computerChoice');
   }

}


const gameLogic = () => {
   randomComputerChoice();

   if (playerChoice === computerChoice) {
      result.innerHTML = `You and the computer have both selected ${playerChoice}. This round is a tie!`;
   }
   else {
      if (
         (playerChoice === choices[0] && computerChoice === choices[1]) ||
         (playerChoice === choices[1] && computerChoice === choices[2]) ||
         (playerChoice === choices[2] && computerChoice === choices[0])
      ) {
         result.innerHTML = `You selected ${playerChoice}, and the computer selected ${computerChoice}. You lose this round!`;
         computerScore++;
      }
      else {
         result.innerHTML = `You selected ${playerChoice}, and the computer selected ${computerChoice}. You win this round!`;
         playerScore++;
      }
   };
   updateScore();


   const winner = playerScore > computerScore ? 'Player' : 'Computer';

   if (gameMode === 1 && (playerScore === 1 || computerScore === 1)) {
      result.classList.add('resultGameOver');
      result.innerHTML = `The winner is the ${winner}!`;
      shootBtn.innerHTML = 'Play Again?';
      gameMode = null;
      gameIsOver = true;
   } else if (gameMode === 3 && (playerScore === 2 || computerScore === 2)) {
      result.classList.add('resultGameOver');
      result.innerHTML = `The winner is the ${winner}!`;
      shootBtn.innerHTML = 'Play Again?';
      gameMode = null;
      gameIsOver = true;
   } else if (gameMode === 5 && (playerScore === 3 || computerScore === 3)) {
      result.classList.add('resultGameOver');
      result.innerHTML = `The winner is the ${winner}!`;
      shootBtn.innerHTML = 'Play Again?';
      gameMode = null;
      gameIsOver = true;
   }

};


//    Reset Game 

const resetGame = () => {
   gameMode = null;
   playerScore = 0;
   computerScore = 0;
   playerChoice = null;
   computerChoice = null;
   gameIsOver = false;
   //GameMode reset
   oneDoneBtn.classList.remove('selectedGM');
   twoThreeBtn.classList.remove('selectedGM');
   threeFiveBtn.classList.remove('selectedGM');
   // Player Selection Reset
   lapisBtn.classList.remove('playerChoice');
   papyrusBtn.classList.remove('playerChoice');
   scalpellusBtn.classList.remove('playerChoice');
   // Computer Selection Reset
   computerScalpellus.classList.remove('computerChoice');
   computerLapis.classList.remove('computerChoice');
   computerPapyrus.classList.remove('computerChoice');
   // Point Display
   playerPoints.innerHTML = `Rounds Won: ${playerScore}`;
   computerPoints.innerHTML = `Rounds Won: ${computerScore}`;
   //Button Display
   shootBtn.innerHTML = 'Shoot!'
   //Result Reset
   result.classList.remove('resultGameOver');
   result.innerHTML = originalResult;

};

//The game and the Scoring System

//Defines Player Score and Computer Score 
let playerScore = 0;
let computerScore = 0;


const updateScore = () => {
   playerPoints.innerHTML = `Rounds Won: ${playerScore}`;
   computerPoints.innerHTML = `Rounds Won: ${computerScore}`;
}

let gameIsOver = false;

const game = () => {

   if (gameIsOver === true) {
      resetGame();
      return;
   };

   if (gameMode === null) {
      result.innerHTML = 'Please select how many games you want to play!'
      return;
   };

   if (playerChoice === null) {
      result.innerHTML = 'Please pick Lapis, Papyrus, or Scalpellus!';
      return;
   };

   gameLogic();

};

shootBtn.addEventListener('click', game);

