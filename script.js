const loginPage = document.getElementById('loginPage');
const colorPage = document.getElementById('colorPage');
const gamePage = document.getElementById('gamePage');
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('usernameInput');
const greeting = document.getElementById('greeting');
const playerToken = document.getElementById('playerToken');
const aiToken = document.getElementById('aiToken'); // مهره هوش مصنوعی
const rollDiceBtn = document.getElementById('rollDiceBtn');
const diceResult = document.getElementById('diceResult');
const positionDisplay = document.getElementById('positionDisplay');
const houseInfo = document.getElementById('houseInfo');
const cardsDisplay = document.getElementById('cardsDisplay');
const colorBoxes = document.querySelectorAll('.color-box');
const endGameMessage = document.getElementById('endGameMessage');

let currentPosition = { x: 0, y: 0 };
let aiPosition = { x: 0, y: 0 }; // موقعیت هوش مصنوعی
let playerColor = 'red';
let playerCards = {};
let isPlayerTurn = true;  // شروع بازی با نوبت بازیکن
let aiCards = {}; // کارت‌های هوش مصنوعی
let visitedHouses = new Set();
let visitedHousesAI = new Set(); // خانه‌های رفته شده توسط هوش مصنوعی

const houses = [
    { id: 2, name: "موزه", category: "میوه", x: 97, y: 13, image: "image/card/2.jpg" },
    { id: 3, name: "نان", category: "غلات", x: 180, y: 20, image: "image/card/3.jpg" },
    { id: 4, name: "کاهو", category: "میوه", x: 263, y: 19, image: "image/card/4.jpg" },
    { id: 5, name: "مرغ", category: "پروتئین", x: 348, y: 23, image: "image/card/5.jpg" },
    { id: 6, name: "همبرگر", category: "فست فود", x: 430, y: 23, image: "image/card/6.jpg" },
    { id: 7, name: "توت فرهنگی", category: "میوه", x: 514, y: 21, image: "image/card/7.jpg" },
    { id: 8, name: "ماکارونی", category: "پروتئین", x: 595, y: 22, image: "image/card/8.jpg" },
    { id: 9, name: "سوسیس", category: "فست فود", x: 595, y: 112, image: "image/card/9.jpg" },
    { id: 10, name: "ماهی", category: "پروتئین", x: 598, y: 208, image: "image/card/10.jpg" },
    { id: 11, name: "دوغ", category: "لبنیات", x: 598, y: 297, image: "image/card/11.jpg" },
    { id: 12, name: "پرتقال", category: "میوه", x: 599, y: 398, image: "image/card/12.jpg" },
    { id: 13, name: "برنچ", category: "غلات", x: 509, y: 393, image: "image/card/13.jpg" },
    { id: 14, name: "سبزی", category: "سبزیجات", x: 424, y: 392, image: "image/card/14.jpg" },
    { id: 15, name: "گوجه فرنگی", category: "سبزیجات", x: 347, y: 393, image: "image/card/15.jpg" },
    { id: 16, name: "شیر", category: "لبنیات", x: 261, y: 393, image: "image/card/16.jpg" },
    { id: 17, name: "نوشابه", category: "نوشیدنی", x: 181, y: 393, image: "image/card/17.jpg" },
    { id: 18, name: "بلا", category: "میوه", x: 103, y: 394, image: "image/card/18.jpg" },
    { id: 19, name: "هویج", category: "میوه", x: 17, y: 393, image: "image/card/19.jpg" },
    { id: 20, name: "لوبیا", category: "غلات", x: 16, y: 297, image: "image/card/20.jpg" },
    { id: 21, name: "پنیر", category: "لبنیات", x: 14, y: 207, image: "image/card/21.jpg" },
    { id: 22, name: "کلابی", category: "میوه", x: 16, y: 115, image: "image/card/22.jpg" },
    { id: 23, name: "کره", category: "لبنیات", x: 105, y: 113, image: "image/card/23.jpg" },
    { id: 24, name: "چیپس", category: "نوشیدنی", x: 182, y: 125, image: "image/card/24.jpg" },
    { id: 25, name: "کندم", category: "غلات", x: 258, y: 114, image: "image/card/25.jpg" },
    { id: 26, name: "هندونه", category: "میوه", x: 344, y: 116, image: "image/card/26.jpg" },
    { id: 27, name: "قارچ", category: "میوه", x: 428, y: 119, image: "image/card/27.jpg" },
    { id: 28, name: "پنیر", category: "لبنیات", x: 509, y: 117, image: "image/card/28.jpg" },
    { id: 29, name: "کُرجه فرهنگی", category: "میوه", x: 508, y: 203, image: "image/card/29.jpg" },
    { id: 30, name: "آجیل", category: "غلات", x: 509, y: 294, image: "image/card/30.jpg" },
    { id: 31, name: "سیب‌زمینی", category: "غلات", x: 425, y: 295, image: "image/card/31.jpg" },
    { id: 32, name: "کیوی", category: "میوه", x: 349, y: 293, image: "image/card/32.jpg" },
    { id: 33, name: "بادمجان", category: "میوه", x: 265, y: 293, image: "image/card/33.jpg" },
    { id: 34, name: "نوشیدنی", category: "نوشیدنی", x: 181, y: 294, image: "image/card/34.jpg" },
    { id: 35, name: "بستنی", category: "لبنیات", x: 99, y: 292, image: "image/card/35.jpg" },
];

loginBtn.addEventListener('click', function () {
    const username = usernameInput.value.trim();
    if (username) {
        greeting.innerHTML = `خوش آمدید، ${username}!`;
        loginPage.classList.add('hidden');
        colorPage.classList.remove('hidden');
    }
});
function rollDice() {
    if (isPlayerTurn) {
        let dice = Math.floor(Math.random() * 6) + 1; // عدد تاس
        diceResult.textContent = `نتیجه تاس: ${dice}`;
        movePlayer(dice);  // حرکت بازیکن
    } else {
        let dice = Math.floor(Math.random() * 6) + 1; // عدد تاس برای هوش مصنوعی
        moveAI(dice);  // حرکت هوش مصنوعی
    }
}

colorBoxes.forEach(colorBox => {
    colorBox.addEventListener('click', function () {
        playerColor = this.dataset.color;
        playerToken.style.backgroundColor = playerColor;
        colorPage.classList.add('hidden');
        gamePage.classList.remove('hidden');
    });
});

function findClosestHouseByCategory(currentPosition, houses, visitedHouses, category) {
    let closestHouse = null;
    let minDistance = Infinity;

    houses.forEach(house => {
        if (!visitedHouses.has(house.id) && house.category === category) {
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

function movePlayer(steps) {
    // محاسبه موقعیت جدید بازیکن بر اساس مقدار steps
    currentPosition.x += steps * 50;  // فرض کنید هر خانه 50 پیکسل است
    playerToken.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;
    
    // بررسی اینکه بازیکن به کدام خانه رسیده
    checkHouse(currentPosition);
    
    // بعد از حرکت بازیکن، نوبت به هوش مصنوعی می‌رسد
    isPlayerTurn = false;
    setTimeout(() => rollDice(), 1000);  // هوش مصنوعی یک ثانیه بعد حرکت کند
}

function updatePlayerPosition() {
    playerToken.style.left = currentPosition.x + 'px';
    playerToken.style.top = currentPosition.y + 'px';
}

function updateAIPosition() {
    aiToken.style.left = aiPosition.x + 'px';
    aiToken.style.top = aiPosition.y + 'px';
}
const categories = ["میوه", "سبزیجات", "غلات", "پروتئین", "لبنیات", "فست فود"];
function displayCard(house) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card'); // اضافه کردن کلاس کارت
    const cardImage = document.createElement('img');
    cardImage.src = house.image;
    cardImage.alt = house.name;
    cardDiv.appendChild(cardImage);
    cardsDisplay.appendChild(cardDiv);
}

rollDiceBtn.addEventListener('click', function () {
    // تاس برای کاربر
    const playerDiceRoll = Math.floor(Math.random() * 6) + 1;
    const playerCategory = categories[playerDiceRoll - 1];
    diceResult.textContent = `تاس کاربر: ${playerDiceRoll} - دسته‌بندی: ${playerCategory}`;
    
    // پیدا کردن نزدیکترین خانه برای کاربر
    let closestHouse = findClosestHouseByCategory(currentPosition, houses, visitedHouses, playerCategory);
    if (closestHouse) {
        visitedHouses.add(closestHouse.id);
        currentPosition = { x: closestHouse.x, y: closestHouse.y };
        updatePlayerPosition();
    
        // نمایش اطلاعات خانه و کارت دریافت شده برای کاربر
        playerCards[closestHouse.id] = closestHouse;
        displayCard(closestHouse); // نمایش کارت
    }

    setTimeout(function () {
        const aiDiceRoll = Math.floor(Math.random() * 6) + 1;
        const aiCategory = categories[aiDiceRoll - 1];
        diceResult.textContent += ` | تاس هوش مصنوعی: ${aiDiceRoll} - دسته‌بندی: ${aiCategory}`;
    
        // پیدا کردن نزدیکترین خانه برای هوش مصنوعی
        let closestHouseAI = findClosestHouseByCategory(aiPosition, houses, visitedHousesAI, aiCategory);
        if (closestHouseAI) {
            visitedHousesAI.add(closestHouseAI.id);
            aiPosition = { x: closestHouseAI.x, y: closestHouseAI.y };
            updateAIPosition();
    
            // نمایش اطلاعات خانه هوش مصنوعی
            aiCards[closestHouseAI.id] = closestHouseAI; // ذخیره کارت‌های هوش مصنوعی
        }
    
        // بررسی شرایط پایان بازی
        if (visitedHouses.size + visitedHousesAI.size >= houses.length) {
            endGame(); // پایان بازی
        }
    
        // تغییر نوبت به کاربر
        isPlayerTurn = true;
    
    }, 2000); // زمان انتظار 2 ثانیه قبل از حرکت هوش مصنوعی // هوش مصنوعی یک ثانیه بعد از کاربر حرکت می‌کند
});

// تابع جدید برای پیدا کردن خانه‌ها بر اساس دسته‌بندی
function findClosestHouseByCategory(currentPosition, houses, visitedHouses, category) {
    let closestHouse = null;
    let minDistance = Infinity;

    houses.forEach(house => {
        if (!visitedHouses.has(house.id) && house.category === category) {
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
function endGame() {
    // بررسی برنده‌ها
    const playerCardCount = Object.keys(playerCards).length;
    const aiCardCount = Object.keys(aiCards).length;

    if (playerCardCount > aiCardCount) {
        endGameMessage.innerHTML = "شما برنده شدید!";
    } else if (playerCardCount < aiCardCount) {
        endGameMessage.innerHTML = "هوش مصنوعی برنده شد!";
    } else {
        endGameMessage.innerHTML = "بازی مساوی شد!";
    }

    // نمایش پیام پایان بازی
    endGameMessage.classList.remove('hidden');
}
