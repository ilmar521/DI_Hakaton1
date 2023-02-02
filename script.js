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

let cards = document.querySelector('.memory-game');
let startButton = document.getElementById('startGame');
startButton.addEventListener('click', startGame);

function clearCards() {
    for (let i = cards.children.length - 1; i < cards.children.length; i--) {
        cards.removeChild(cards.children[i]); 
    }         
}

function startGame() {
    let arrPict = [];
    for (let i = 0; i < 2; i++) {    
        for (pict of arrPictLevel1) {
            arrPict.push(pict);       
        }   
    }

    for (let i = 1; i <= 18; i++) {
        let div = document.createElement('div');
        div.classList.add('memory-card');
        div.addEventListener('click', flipCard);
        let img1 = document.createElement('img');   
        img1.classList.add('back-face');
        img1.setAttribute('src', './img/shirt_card.jpg');    
        let img2 = document.createElement('img');  
        img2.classList.add('front-face');
        let index = Math.floor(Math.random() * (19 - i));
        img2.setAttribute('src', arrPict[index]);  
        arrPict.splice(index, 1);

        cards.appendChild(div);
        div.appendChild(img2);
        div.appendChild(img1);   
    }   
}

function flipCard(event) {
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
            findMatches1 += 1;
            if (findMatches1 == 9) {
                //finish
            }
            lockBoard = false;
        } else {
            score1 -= 1;  
            setTimeout(() => {
                this.classList.toggle('flip'); 
                pickCard.classList.toggle('flip');     
                pickCard = null;  
                lockBoard = false;
            }, 700);        
        }
    }
}
