  
// Globala variabler

const wordList = ['apelsin', 'jordgubbe', 'äpple', 'passionsfrukt', 'persika', 'nektarin', 'hallon'];    // Array: med spelets alla ord
let selectedWord = '';    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let wrongGuesses = 0;     // Number: håller antalet gissningar som gjorts
const maxWrongGuesses = 6; // Number: maximalt antal felgissningar som får göras
let answerArray = []; // Array: för att kunna skilja på listelement skapade i funktionerna createLetterBoxes och compareLetter
let hangmanImg = '';   // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let msgHolderEl = document.querySelector('#message');     // DOM-nod: Ger meddelande när spelet är över
let guessStatusEl = document.querySelector('#guessStatus');
let startGameBtnEl = document.querySelector('#startGameBtn'); // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelectorAll('#letterButtons > li > button[value]'); // Array av DOM-noder: Knapparna för bokstäverna
const letterButtonDis =  document.querySelectorAll('#letterButtons > li > button');
let letterBoxEls = document.querySelector('#letterBoxes > ul');  // Array av DOM-noder: Rutorna där bokstäverna ska stå


// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

function startGame () {
    document.querySelector('#startGameBtn').innerHTML = 'Starta om spelet';
    generateRandomWord(); 
    createLetterBoxes();
}

startGameBtnEl.addEventListener('click', startGame);


// Funktion som slumpar fram ett ord

function generateRandomWord () {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram

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


// Funktion som körs när du trycker på bokstäverna och gissar bokstav

function guessLetter() {

    for (let i of letterButtonEls) { 
        i.addEventListener('click', function guess () {
            (this).disabled = true; 
            compareLetter(this['value']);
            //resetGame(i, letterButtonEls, guess);
        });
    }; 
}
 
guessLetter();

// Funktion som jämför bokstäverna i det valda ordet med bokstaven man tryckt på 

function compareLetter(letter){
    letterBoxEls = document.querySelectorAll('#letterBoxes > ul > li');
    let wrongGuess = true 
    for (let i = 0; i < selectedWord.length; i++){
        if (selectedWord.charAt(i).toUpperCase() == letter.toUpperCase()) {

            wrongGuess = false; // det är inte felgissat
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


    if (answerArray.includes('_') === false){ // alla bokstäver är rätt
        result();
    }
 
     if (wrongGuess === true){ // det är felgissat
        wrongGuesses++;
        document.querySelector('#hangman').src = `images/h${wrongGuesses}.png`;
        result();
    }
}


//Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet

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

// Funktion för globala variabler

function globalVariables (){
    wrongGuesses = 0;
    answerArray = [];
    selectedWord = '';
    hangmanImg = document.querySelector('#hangman').src = `images/h0.png`; 
    msgHolderEl = document.querySelector('#message');
    document.querySelector('#message').innerHTML = '';
    letterBoxEls = document.querySelector('#letterBoxes > ul');
    letterBoxEls.innerHTML = '';
    document.querySelector('#guessStatus').innerHTML = `Antal felgissningar: ${wrongGuesses} av ${maxWrongGuesses}.`;
    letterButtonEls = document.querySelectorAll('#letterButtons > li > button[value]'); 
}

//Funktion för att starta om spelet

function resetGame (){
    for (let i = 0; i < letterButtonDis.length; i++){
        letterButtonDis[i].disabled = false;
    }
    globalVariables();
    generateRandomWord();
    createLetterBoxes();
}
startGameBtnEl.addEventListener('click', resetGame);




