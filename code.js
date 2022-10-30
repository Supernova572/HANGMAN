var Move = "";
var currentWordArray = ["plant","adult","light"];
var wrongArray = [];
var currentWord = "";
var wrongMoveCheck = 0;
var correctMoveCheck = 0;
var bodyPartCheck = 0;
setScreen("WelcomeScrn");
function displayBoard() {
  for (var i = 0; i < currentWord.length; i++) {
    showElement("letterZone" + [i]);
  }
  for (var b = 1; b < 7; b++) {
    hideElement("wrongPart" + [b]);
  }
}
function checkMove() {
  var sign = false;
  if (!sign) {
    for (var i = 0; i < currentWord.length; i++) {
      if (Move == currentWord.charAt([i])) {
        setText("letterZone"+i, Move);
        correctMoveCheck++;
        validMove();
        sign = true;
        break;
      }
    }
  }
  if (sign === false) { 
    wrongMoveCheck++;
    appendItem(wrongArray, Move);
    setText("wrongGuessArea", wrongArray);
    //Credit to Kurt Kaiser on lives left check code below
    //https://www.youtube.com/watch?v=pjbMTgABPEA
    setText("livesLeft", 6-wrongMoveCheck);
    showElement("wrongPart" + wrongMoveCheck);
    sign = true;
    if (wrongMoveCheck == 6) {
      setScreen("LoseScrn");
    }
  }
  resetInput();
}
function validMove() {
if (correctMoveCheck == currentWord.length) {
  setScreen("WinScrn");
}
}
function resetInput() {
  setText("letterInput", "");
  Move = "";
}
function resetWrongMove() {
  wrongArray = [];
  setText("wrongGuessArea", "");
}
function produceWord() {
  currentWord = currentWordArray[randomNumber(0,2)];
  console.log(currentWord);
}
function resetBoard() {
  displayBoard();
  resetWrongMove();
  produceWord();
  bodyPartCheck = 0;
  correctMoveCheck = 0;
  setScreen("PlayScrn");
  for (var v = 0; v <(currentWord.length); v++) {
    setText("letterZone" + [v], "");
  }
  for (var m = 1; m < 7; m++) {
    hideElement("wrongPart" + [m]);
  }
  wrongMoveCheck = 0;
  setText("livesLeft", "6");
}
//Play Game
onEvent("PlayBtn", "click", function( ) {
  setScreen("PlayScrn");
  displayBoard();
  produceWord();
});
//Try Again Buttons
onEvent("continueBtn", "click", function( ) {
  setScreen("PlayScrn");
  for (var i = 0; i < currentWord.length; i++) {
    showElement("letterZone" + [i]);
  }
  resetBoard();
});
onEvent("TryAgainBtn", "click", function( ) {
  setScreen("PlayScrn");
  for (var l = 0; l < currentWord.length; l++) {
    showElement("letterZone" + [l]);
  }
  resetBoard();
});
//Guessing the letter
onEvent("GuessBtn", "click", function( ) {
  Move = getText("letterInput");
  checkMove();
});
//Home Page Hangman(https://www.fanpop.com/clubs/pokemon/forum/post/194891/title/pokemon-hangman)
//Game Over(https://www.dreamstime.com/stock-illustration-game-over-bit-funky-colorful-screen-retro-style-red-yellow-image91193840) 
//Hangman Image(https://uxfactor.wordpress.com/2012/12/20/usability/stick-figure-2/)
//Hangman Structure(http://thethinktanklondon.blogspot.com/2012/09/a-little-distraction-with-guardian.html)
//Hangman Body Parts(https://zhuanlan.zhihu.com/p/80242898)
