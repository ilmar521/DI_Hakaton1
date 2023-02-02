let score1 = 200;
let score2 = 500;
let score3 = 1000;
let totalScore = 0;
let findMatches1 = 0;
let findMatches2 = 0;
let findMatches3 = 0;
let lockBoard = false;

let curLevel = 1;
let pickCard = null;

let arrPictLevel1 = [
    './img/level_1/pic1.jpg',
    './img/level_1/pic2.jpg',
    './img/level_1/pic3.jpg',
    './img/level_1/pic4.jpg',
    './img/level_1/pic5.jpg',
    './img/level_1/pic6.jpg',
    './img/level_1/pic7.jpg',
    './img/level_1/pic8.jpg',
    './img/level_1/pic9.jpg'
];

let arrPictLevel2 = [
    './img/level_2/pic1.jpg',
    './img/level_2/pic2.jpg',
    './img/level_2/pic3.jpg',
    './img/level_2/pic4.jpg',
    './img/level_2/pic5.jpg',
    './img/level_2/pic6.jpg',
    './img/level_2/pic7.jpg',
    './img/level_2/pic8.jpg',
    './img/level_2/pic9.jpg',
    './img/level_2/pic10.jpg',
    './img/level_2/pic11.jpg',
    './img/level_2/pic12.jpg'
];

let arrPictLevel3 = [
    './img/level_3/pic1.jpg',
    './img/level_3/pic2.jpg',
    './img/level_3/pic3.jpg',
    './img/level_3/pic4.jpg',
    './img/level_3/pic5.jpg',
    './img/level_3/pic6.jpg',
    './img/level_3/pic7.jpg',
    './img/level_3/pic8.jpg',
    './img/level_3/pic9.jpg',
    './img/level_3/pic10.jpg',
    './img/level_3/pic11.jpg',
    './img/level_3/pic12.jpg',
    './img/level_3/pic13.jpg',
    './img/level_3/pic14.jpg',
    './img/level_3/pic15.jpg',
    './img/level_3/pic16.jpg'
];

let resultSection = document.getElementById('resultSection');
resultSection.classList.add('hide');
let cards = document.querySelector('.memory-game');
let manageSection = document.getElementById('manageSection');
let startButton = document.querySelector('.button-start');
startButton.addEventListener('click', startGame);
let scoreTitle = document.getElementById('score');
let totalScoreTitle = document.getElementById('totalScore');
let buttonsResult = document.getElementById('buttonsResult');
let buttonNext = document.querySelector('.button-next');
buttonNext.addEventListener('click', nextLevel);
let buttonNew = document.querySelector('.button-new');
buttonNew.addEventListener('click', newGame);

function clearCards() {
    if (cards.children.length == 0) return;
    let i = cards.children.length - 1;
    while (i >= 0) {  
        cards.removeChild(cards.children[i]); 
        i = cards.children.length - 1;
    }
}

function createCards(arrPictLevel, amountCards, classMemoryBlock) {
    clearCards();
    
    let arrPict = [];
    for (let i = 0; i < 2; i++) {    
        for (pict of arrPictLevel) {
            arrPict.push(pict);       
        }   
    }

    for (let i = 1; i <= amountCards; i++) {
        let div = document.createElement('div');
        div.classList.add(classMemoryBlock);
        div.addEventListener('click', flipCard);
        let img1 = document.createElement('img');   
        img1.classList.add('back-face');
        img1.setAttribute('src', './img/shirt_card.jpg');    
        let img2 = document.createElement('img');  
        img2.classList.add('front-face');
        let index = Math.floor(Math.random() * ((amountCards + 1) - i));
        img2.setAttribute('src', arrPict[index]);  
        arrPict.splice(index, 1);

        cards.appendChild(div);
        div.appendChild(img2);
        div.appendChild(img1);   
    }     
}

function startGame() {  
    createCards(arrPictLevel1, 18, 'memory-card');

    startButton.classList.toggle('hide');
}

function nextLevel() {  
    curLevel += 1;
    if (curLevel == 2) {
        createCards(arrPictLevel2, 24, 'memory-card2');
    } else {
        createCards(arrPictLevel3, 32, 'memory-card3');
    }
    
    resultSection.classList.toggle('hide');
}

function newGame() {  
    score1 = 200;
    score2 = 500;
    score3 = 1000;
    totalScore = 0;
    findMatches1 = 0;
    findMatches2 = 0;
    findMatches3 = 0;
    lockBoard = false;
    
    curLevel = 1;
    pickCard = null; 
    clearCards();
    resultSection.classList.toggle('hide');
    startButton.classList.toggle('hide');
    buttonNext.classList.toggle('hide');
}


function flipCard(event) {
    if (this.classList.contains('flip')) return;
    if (lockBoard) return;
    if (this === pickCard) return;

    this.classList.toggle('flip');
    if (pickCard == null) {
        pickCard = this; 
    } else {
        lockBoard = true;
        let img1 = this.querySelector('.front-face');
        let img2 = pickCard.querySelector('.front-face');
        if (img1.getAttribute('src') == img2.getAttribute('src')) {
            pickCard = null; 
            if (curLevel == 1) {
                findMatches1 += 1;
                if (findMatches1 == 9) {
                    totalScore += score1;
                    scoreTitle.innerHTML = 'Your level score: ' + score1;
                    totalScoreTitle.innerHTML = 'Your total score: ' + totalScore;
                    resultSection.classList.toggle('hide');
                    buttonNew.classList.toggle('hide');
                } 
            } else if (curLevel == 2) {
                findMatches2 += 1;
                if (findMatches2 == 12) {
                    totalScore += score2;
                    scoreTitle.innerHTML = 'Your level score: ' + score2;
                    totalScoreTitle.innerHTML = 'Your total score: ' + totalScore;
                    resultSection.classList.toggle('hide');
                } 
            } else {
                findMatches3 += 1;
                if (findMatches3 == 16) {
                    totalScore += score3;
                    scoreTitle.innerHTML = 'Your level score: ' + score3;
                    totalScoreTitle.innerHTML = 'Your total score: ' + totalScore;
                    resultSection.classList.toggle('hide');
                    buttonNext.classList.toggle('hide');
                    buttonNew.classList.toggle('hide');
                } 
            };
            lockBoard = false;
        } else {
            if (curLevel == 1) {
                score1 -= 1;  
            } else if (curLevel == 2) {
                score2 -= 1;
            } else {
                score3 -= 1;
            };
            setTimeout(() => {
                this.classList.toggle('flip'); 
                pickCard.classList.toggle('flip');     
                pickCard = null;  
                lockBoard = false;
            }, 700);        
        }
    }
}
