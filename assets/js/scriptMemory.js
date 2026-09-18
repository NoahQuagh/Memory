const dimension =150;
let urlsPicsum = [];
let cards=[];
const grid = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

let firstCard=null;
let secondCard=null;
let lockBoard=false;
let moves=0;
let matchedCount=0;
let second=0;
let timerInterval=null;


/**
 * Tire un nombre aléatoire
 * @param min valeur minimum
 * @param max valeur maximum
 * @returns {*} valeur tirer
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



/**
 * crée une liste d'url d'image via l'api de picsum.photos
 * @param size nombre d'url a généré
 */
function createImages(size) {
    const imgStart = getRandomInt(1,100)
    urlsPicsum = []
    for (let i = imgStart; i <= imgStart+7; i++) {
        const url = `https://picsum.photos/id/${i}/${size}`;
        urlsPicsum.push(url);
    }
}


/**
 * duplique en double les elements d'un tableau donner
 * @param imgList tableau d'élements
 * @returns {*[]} tableau avec les elements en double
 */
function duplicateImages(imgList){
    return cards=[...imgList,...imgList];
}

/**
 * mélange un tableau d'element avec l'algorithme de permutation de Fisher-Yates
 * @param array liste à mélanger
 * @returns {*} la liste mélanger
 */
function shuffle(array){
    permutation=[]
    if(array.length === 0){
        permutation=[...array];
    }else{
        for (let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}


/**
 * initialise le jeu
 */
function initGame(){
    grid.innerHTML = "";
    resultDisplay.textContent = "";
    movesDisplay.textContent = "Coups : 0";
    timerDisplay.textContent = "00:00";

    moves = 0;
    matchedCount = 0;
    seconds = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    clearInterval(timerInterval);


    createImages(dimension);
    const cards = shuffle(duplicateImages(urlsPicsum));



    cards.forEach(url => {
        const card = Object.assign(document.createElement('div'), {
            className: 'card',
            role: 'button',
            tabIndex: 0
        });
        card.dataset.value = url;
        card.addEventListener('click', () => handleCardClick(card));
        grid.appendChild(card);
    })
    startTimer();
}

/**
 * Gestion de l'évènement quand une carte est cliqué
 * @param card card cliqué
 */
function handleCardClick(card){
    if (lockBoard || card.classList.contains("matched") || card === firstCard ||
        card.firstChild) {
        return;
    }

    revealCard(card);

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;
    moves++;
    movesDisplay.textContent = `Coups : ${moves}`;
    checkMatch();
}

/**
 * Vérifie si les deux cartes retournées correspond
 */
function checkMatch(){
    if(firstCard.dataset.value === secondCard.dataset.value){
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCount += 2;
        resetTurn();
        checkVictory();
    }else{
        setTimeout(() => {
            firstCard.innerHTML =``;
            secondCard.innerHTML =``;
            resetTurn();
        },800);
    }
}

/**
 * Remet les cartes retournées
 */
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

/**
 * Montre la carte selectionner
 * @param card carte choisie
 */
function revealCard(card){
    const img = document.createElement("img");
    img.src = card.dataset.value;
    img.alt = "Image de memory";
    card.appendChild(img);
}

/**
 * Vérifie si toutes les cartes sont retournées
 */
function checkVictory(){
    if(matchedCount === cards.length){
        clearInterval(timerInterval);
        resultDisplay.textContent = `Coups : ${moves}`;
    }
}

/**
 * Démarre le chronomètre
 */
function startTimer(){
    timerInterval = setInterval(()=>{
        seconds++;
        timerDisplay.textContent = `${formatTime(seconds)}`;
    },1000)
}

if (restartBtn) {
    restartBtn.addEventListener('click', initGame);
}


document.addEventListener('DOMContentLoaded', initGame);








