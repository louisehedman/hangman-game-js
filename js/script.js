  
// Global variables

const wordList = ['apelsin', 'jordgubbe', 'äpple', 'passionsfrukt', 'persika', 'nektarin', 'hallon', 'gurka', 'tomat', 'selleri', 'paprika', 'blåbär', 'hjortron'];    // Array with all the words in the game, constant which means it can't be reassigned
let selectedWord = '';    // String: One of the words chosen randomly by the computer, let instead of const, the value of the variable will change
let wrongGuesses = 0;     // Number: Keeps the number of wrong guesses
const maxWrongGuesses = 6; // Number: The maximum of wrong guesses allowed
let answerArray = []; // Array: To separate list elements made in the funktions createLetterBoxes and compareLetter
let hangmanImg = '';   // Sträng: Search path to image that will show and change when guess is wrong

let msgHolderEl = document.querySelector('#message');     // DOM node: Gives message when game is over
let guessStatusEl = document.querySelector('#guessStatus'); // DOM node: Shows how many wrong guesses that have been made
const startGameBtnEl = document.querySelector('#startGameBtn'); // DOM node: The button you start the game with
let letterButtonEls = document.querySelectorAll('#letterButtons > li > button[value]'); // Array of DOM nodes: The buttons for the letters
const letterButtonDis =  document.querySelectorAll('#letterButtons > li > button'); // Array of DOM nodes: Regulates if it is possible to press the letter buttons or not
let letterBoxEls = document.querySelector('#letterBoxes > ul');  // Array of DOM nodes: The boxes where the right guessed letters will appear


// Function which start the game when button is pressed, and when pressed also calls other functions (generateRandomWord and createLetterBoxes)

function startGame () {
    document.querySelector('#startGameBtn').innerHTML = 'Starta om spelet'; // when pressed the button text "starta spelet" will change
    generateRandomWord(); 
    createLetterBoxes();
}

startGameBtnEl.addEventListener('click', startGame); //the addEventListener method is used to listen for the click


// Function that randomly pick a word from the wordList array

function generateRandomWord () {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)]; 
}

/* Function that will make the letter boxes appear, the number of them will depend on the number
of letters in selectedWord */

function createLetterBoxes () {
    letterBoxEls = document.querySelector('#letterBoxes > ul'); 
    for (let i = 0; i < selectedWord.length; i++ ){ 
         let liEl = document.createElement('LI'); 
         let inputEl = document.createElement('INPUT'); 
         inputEl.setAttribute('type', 'text');
         inputEl.setAttribute('value', '_'); 
         inputEl.disabled = true; 
         liEl.appendChild(inputEl); 
         letterBoxEls.appendChild(liEl); 
         answerArray[i] = ('_'); 
    }
}

// Function that will run when you press letter buttons to guess letter

function guessLetter() {

    for (let i of letterButtonEls) { 
        i.addEventListener('click', function () { 
            this.disabled = true; 
            compareLetter(this['value']); 
        });
    }; 
}
 
guessLetter();

// Function that compare the letters in the selected word with the guessed letter 

function compareLetter(letter){ 
    letterBoxEls = document.querySelectorAll('#letterBoxes > ul > li');
    let wrongGuess = true 
    for (let i = 0; i < selectedWord.length; i++){
        if (selectedWord.charAt(i).toUpperCase() == letter.toUpperCase()) { 
            wrongGuess = false; 
            let liEl = document.createElement('LI'); 
            let inputEl = document.createElement('INPUT');
            inputEl.setAttribute('type', 'text');
            inputEl.setAttribute('value', letter);
            inputEl.disabled = true;
            liEl.appendChild(inputEl);
            letterBoxEls[i].replaceWith(liEl); 
            answerArray[i] = (''); 
        } 
    }
    if (answerArray.includes('_') === false){ 
        result(); 
    }
    if (wrongGuess === true){ 
        wrongGuesses++;
        document.querySelector('#hangman').src = `images/h${wrongGuesses}.png`;
        result();
    }
}


//Function that will run when player wins or lose, which part depends on condition

function result() {
    document.querySelector('#guessStatus').innerHTML = `Antal felgissningar: ${wrongGuesses} av ${maxWrongGuesses}.`; 

    if (answerArray.includes('_') === false){ 
        document.querySelector('#message').innerHTML = 'Grattis! Du vann!!'; 
        for (let i = 0; i < letterButtonDis.length; i++){ 
            letterButtonDis[i].disabled = true; 
        }
    }
    else if (wrongGuesses === maxWrongGuesses){  
        document.querySelector('#message').innerHTML = `Tyvärr, du förlorade. Det rätta ordet var ${selectedWord}.`; 
        for (let i = 0; i < letterButtonDis.length; i++){
            letterButtonDis[i].disabled = true;
        }
    }
}

// Function for global variables, resets their values

function globalVariables (){
    wrongGuesses = 0;
    answerArray = [];
    selectedWord = '';
    hangmanImg = document.querySelector('#hangman').src = `images/h0.png`; 
    document.querySelector('#message').innerHTML = '';
    letterBoxEls.innerHTML = '';
    document.querySelector('#guessStatus').innerHTML = `Antal felgissningar: ${wrongGuesses} av ${maxWrongGuesses}.`;
}

//Function for making the game able to restart 

function resetGame (){
    for (let i = 0; i < letterButtonDis.length; i++){
        letterButtonDis[i].disabled = false; 
    }
    globalVariables(); 
    generateRandomWord();
    createLetterBoxes();
}
startGameBtnEl.addEventListener('click', resetGame); 




