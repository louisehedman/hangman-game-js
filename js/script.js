  
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

// Function that will make the letter boxes appear, the number of them will depend on the number of letters in selectedWord

function createLetterBoxes () {
    letterBoxEls = document.querySelector('#letterBoxes > ul'); 
    for (let i = 0; i < selectedWord.length; i++ ){ //for loop
         let liEl = document.createElement('LI'); //creates list element in ul
         let inputEl = document.createElement('INPUT'); //creates input field for type and value attributes
         inputEl.setAttribute('type', 'text');
         inputEl.setAttribute('value', '_'); //an underscore will show in the box as long as no letter is right guessed at that position
         inputEl.disabled = true; //boolean, disable the input field so that it can not be changed by user
         liEl.appendChild(inputEl); //appends the input element to the list element
         letterBoxEls.appendChild(liEl); //appends the list elements to the unordered list
         answerArray[i] = ('_'); //gives every list element an underscore (will not be shown) to be able to separate the list elements from the ones created when letter is guessed
    }
}

// Function that will run when you press letter buttons to guess letter

function guessLetter() {

    for (let i of letterButtonEls) { //for of loop
        i.addEventListener('click', function () { //the function will run when button is clicked
            this.disabled = true; //makes the button pressed disabled
            compareLetter(this['value']); //gives the compareLetter function access to the value from button pressed
        });
    }; 
}
 
guessLetter();

// Function that compare the letters in the selected word with the guessed letter 

function compareLetter(letter){ //letter is the value from guessLetter
    letterBoxEls = document.querySelectorAll('#letterBoxes > ul > li');
    let wrongGuess = true //the default state for wrongGuess
    for (let i = 0; i < selectedWord.length; i++){
        if (selectedWord.charAt(i).toUpperCase() == letter.toUpperCase()) { //if the letter in the selected word and value from guessLetter match the following will run. To upperCase method is used to make both values uppercase
            wrongGuess = false; // it is not wrong guessed
            let liEl = document.createElement('LI'); //creates new list elements as in createLetterBoxes function
            let inputEl = document.createElement('INPUT');
            inputEl.setAttribute('type', 'text');
            inputEl.setAttribute('value', letter);
            inputEl.disabled = true;
            liEl.appendChild(inputEl);
            letterBoxEls[i].replaceWith(liEl); //replace the old list element with this new one at right index
            answerArray[i] = (''); //the '_' on this position will now be an empty string ''
        } 
    }
    if (answerArray.includes('_') === false){ // if all letters in the word is correctly guessed the result function will run
        result(); 
    }
    if (wrongGuess === true){ // if the guess is wrong the number of wrongGuesses will increase for each and the image will change, the result function will run
        wrongGuesses++;
        document.querySelector('#hangman').src = `images/h${wrongGuesses}.png`;
        result();
    }
}


//Function that will run when player wins or lose, which part depends on condition

function result() {
    document.querySelector('#guessStatus').innerHTML = `Antal felgissningar: ${wrongGuesses} av ${maxWrongGuesses}.`; //manipulates the text in HTML element with id guessStatus with numbers from the variables

    if (answerArray.includes('_') === false){ //if game is won this will run
        document.querySelector('#message').innerHTML = 'Grattis! Du vann!!'; //The user will see this message
        for (let i = 0; i < letterButtonDis.length; i++){ 
            letterButtonDis[i].disabled = true; //the letter buttons will be disabled
        }
    }
    else if (wrongGuesses === maxWrongGuesses){  //if game is lost this will run
        document.querySelector('#message').innerHTML = `Tyvärr, du förlorade. Det rätta ordet var ${selectedWord}.`; //The user will see this message
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
        letterButtonDis[i].disabled = false; // no letter buttons will be disabled
    }
    globalVariables(); //these three functions will run again
    generateRandomWord();
    createLetterBoxes();
}
startGameBtnEl.addEventListener('click', resetGame); // the resetGame function will run when pressing the start game button, able to press whenever during the game




