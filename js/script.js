// Globala variabler

const wordList = ['apelsin', 'jordgubbe', 'äpple', 'passionsfrukt', 'persika', 'nektarin', 'hallon'];      // Array: med spelets alla ord
let selectedWord = '';    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg = 'images/h{guesses}.png';      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl = document.querySelector('#message');;     // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.querySelector('#startGameBtn');  // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelectorAll('#letterButtons > li > button[value]');; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelector('#letterBoxes > ul');    // Array av DOM-noder: Rutorna där bokstäverna ska stå
let letters = letterButtonEls.toString();


// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

function startGame () {
    generateRandomWord(); 
    createLetterBoxes();
    (startGameBtnEl).disabled = true;
}
startGameBtnEl.addEventListener('click', startGame);

// Funktion som slumpar fram ett ord

function generateRandomWord () {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(selectedWord);
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på