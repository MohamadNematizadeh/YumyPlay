const loginPage = document.getElementById('loginPage');
const colorPage = document.getElementById('colorPage');
const gamePage = document.getElementById('gamePage');
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('usernameInput');
const greeting = document.getElementById('greeting');
const playerToken = document.getElementById('playerToken');
const rollDiceBtn = document.getElementById('rollDiceBtn');
const diceResult = document.getElementById('diceResult');
const positionDisplay = document.getElementById('positionDisplay');
const houseInfo = document.getElementById('houseInfo');
const cardsDisplay = document.getElementById('cardsDisplay');
const colorBoxes = document.querySelectorAll('.color-box');
const endGameMessage = document.getElementById('endGameMessage');

let currentPosition = { x: 0, y: 0 }; 
let playerColor = 'red'; 
let playerCards = {}; 
let visitedHouses = new Set();

const houses = [
    { id: 2, name: "موزه", category: "میوه", x: 97, y: 13 , image: "image/card/2.jpg"},
    { id: 3, name: "نان", category: "غلات", x: 180, y: 20, image: "image/card/3.jpg"},
    { id: 4, name: "کاهو", category: "میوه", x: 263, y: 19, image: "image/card/4.jpg" },
    { id: 5, name: "مرغ", category: "پروتئین", x: 348, y: 23, image: "image/card/5.jpg" },
    { id: 6, name: "همبرگر", category: "فست فود", x: 430, y: 23, image: "image/card/6.jpg" },
    { id: 7, name: "توت فرهنگی", category: "میوه", x: 514, y: 21, image: "image/card/7.jpg" },
    { id: 8, name: "ماکارونی", category: "پروتئین", x: 595, y: 22, image: "image/card/8.jpg" },
    { id: 9, name: "سوسیس", category: "فست فود", x: 595, y: 112 , image: "image/card/9.jpg"},
    { id: 10, name: "ماهی", category: "پروتئین", x: 598, y: 208 , image: "image/card/10.jpg"},
    { id: 11, name: "دوغ", category: "لبنیات", x: 598, y: 297 , image: "image/card/11.jpg"},
    { id: 12, name: "پرتقال", category: "میوه", x: 599, y: 398 , image: "image/card/12.jpg"},
    { id: 13, name: "برنچ", category: "غلات", x: 509, y: 393 , image: "image/card/13.jpg"},
    { id: 14, name: "سبزی", category: "سبزیجات", x: 424, y: 392 , image: "image/card/14.jpg"},
    { id: 15, name: "گوجه فرنگی", category: "سبزیجات", x: 347, y: 393 , image: "image/card/15.jpg" },
    { id: 16, name: "شیر", category: "لبنیات", x: 261, y: 393 , image: "image/card/16.jpg"},
    { id: 17, name: "نوشابه", category: "نوشیدنی", x: 181, y: 393 , image: "image/card/17.jpg"},
    { id: 18, name: "بلا", category: "میوه", x: 103, y: 394 , image: "image/card/18.jpg"},
    { id: 19, name: "هویج", category: "میوه", x: 17, y: 393 , image: "image/card/19.jpg"},
    { id: 20, name: "لوبیا", category: "غلات", x: 16, y: 297 , image: "image/card/20.jpg"},
    { id: 21, name: "پنیر", category: "لبنیات", x: 14, y: 207 , image: "image/card/21.jpg"},
    { id: 22, name: "کلابی", category: "میوه", x: 16, y: 115 , image: "image/card/22.jpg"},
    { id: 23, name: "کره", category: "لبنیات", x: 105, y: 113 , image: "image/card/23.jpg"},
    { id: 24, name: "چیپس", category: "نوشیدنی", x: 182, y: 125 , image: "image/card/24.jpg"},
    { id: 25, name: "کندم", category: "غلات", x: 258, y: 114 , image: "image/card/25.jpg"},
    { id: 26, name: "هندونه", category: "میوه", x: 344, y: 116 , image: "image/card/26.jpg"},
    { id: 27, name: "قارچ", category: "میوه", x: 428, y: 119 , image: "image/card/27.jpg"},
    { id: 28, name: "پنیر", category: "لبنیات", x: 509, y: 117 , image: "image/card/28.jpg"},
    { id: 29, name: "کُرجه فرهنگی", category: "میوه", x: 508, y: 203 , image: "image/card/29.jpg"},
    { id: 30, name: "آجیل", category: "غلات", x: 509, y: 294 , image: "image/card/30.jpg"},
    { id: 31, name: "سیب‌زمینی", category: "غلات", x: 425, y: 295, image: "image/card/31.jpg" },
    { id: 32, name: "کیوی", category: "میوه", x: 349, y: 293 , image: "image/card/32.jpg"},
    { id: 33, name: "بادمجان", category: "میوه", x: 265, y: 293 , image: "image/card/33.jpg"},
    { id: 34, name: "نوشیدنی", category: "نوشیدنی", x: 181, y: 294 , image: "image/card/34.jpg"},
    { id: 35, name: "بستنی", category: "لبنیات", x: 99, y: 292 , image: "image/card/35.jpg"},
];

loginBtn.addEventListener('click', function () {
    const username = usernameInput.value.trim();
    if (username) {
        greeting.innerHTML = `خوش آمدید، ${username}!`;
        loginPage.classList.add('hidden');
        colorPage.classList.remove('hidden');
    }
});

colorBoxes.forEach(colorBox => {
    colorBox.addEventListener('click', function () {
        playerColor = this.dataset.color;
        playerToken.style.backgroundColor = playerColor;
        colorPage.classList.add('hidden');
        gamePage.classList.remove('hidden');
    });
});

function findClosestHouse(currentPosition, houses, visitedHouses) {
    let closestHouse = null;
    let minDistance = Infinity;

    houses.forEach(house => {
        if (!visitedHouses.has(house.id)) {
            const distance = Math.sqrt(
                Math.pow(house.x - currentPosition.x, 2) +
                Math.pow(house.y - currentPosition.y, 2)
            );

            if (distance < minDistance) {
                minDistance = distance;
                closestHouse = house;
            }
        }
    });

    return closestHouse;
}

function updatePlayerPosition() {
    playerToken.style.left = currentPosition.x + 'px';
    playerToken.style.top = currentPosition.y + 'px';
}

rollDiceBtn.addEventListener('click', function () {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    diceResult.innerHTML = `شماره تاس: ${diceValue}`;
    diceResult.style.display = 'block';

    let newHouse = null;
    while (!newHouse) {
        let closestHouse = findClosestHouse(currentPosition, houses, visitedHouses);
        
        if (!closestHouse) {
            diceValue = Math.floor(Math.random() * 6) + 1;
            diceResult.innerHTML = `شماره تاس: ${diceValue}`;
            diceResult.style.display = 'block';
            return; 
        }

        let newPosition = {
            x: closestHouse.x,
            y: closestHouse.y
        };

        if (!visitedHouses.has(closestHouse.id)) {
            newHouse = closestHouse;
            currentPosition = newPosition;
            updatePlayerPosition();
            visitedHouses.add(newHouse.id);
        }
    }
    houseInfo.innerHTML = `شما به خانه '${newHouse.name}' رسیدید، دسته‌بندی: ${newHouse.category}`;
    houseInfo.style.display = 'block';
    if (!playerCards[newHouse.category]) {
        playerCards[newHouse.category] = [];
    }
    if (newHouse.category === 'نوشیدنی') {
        if (playerCards[newHouse.category].length > 0) {
            playerCards[newHouse.category].pop();
        }
    } else {
        playerCards[newHouse.category].push(newHouse.image);
    }
    displayPlayerCards();

    if (Object.keys(playerCards).length >= 6) { 
        setTimeout(() => {
            endGameMessage.style.display = 'block';
        }, 1000);
    }
});

function displayPlayerCards() {
    cardsDisplay.innerHTML = '';
    if (Object.keys(playerCards).length === 0) {
        cardsDisplay.innerHTML = '<p class="no-cards">هنوز هیچ کارتی دریافت نکردید.</p>';
    } else {
        for (const category in playerCards) {
            if (playerCards[category].length === 0) continue;

            const stack = document.createElement('div');
            stack.classList.add('card-stack');

            playerCards[category].forEach((image, index) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.style.backgroundImage = `url('${image}')`;
                cardElement.style.zIndex = index; 
                cardElement.style.top = `${index * 5}px`; 
                stack.appendChild(cardElement);
            });

            const categoryName = document.createElement('div');
            categoryName.classList.add('card-name'); 
            categoryName.innerText = category;
            stack.appendChild(categoryName);
            cardsDisplay.appendChild(stack);
        }
    }
    cardsDisplay.style.display = 'flex';
}

updatePlayerPosition(); 