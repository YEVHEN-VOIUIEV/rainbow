const rainbow = document.getElementById('rainbow');
const stone = document.getElementById('stone');
const jumpButton = document.getElementById('jumpButton');
const lifeCount = document.getElementById('life-count');
const stoneCount = document.getElementById('stone-count');

const jumpSound = new Audio('./sounds/jump.mp3');
const failSound = new Audio('./sounds/fail.mp3');
const applepaySound = new Audio('./sounds/applepay.mp3');
const gameOverSound = new Audio('./sounds/game-over.mp3');
const successSound = new Audio('./sounds/success.mp3');

jumpButton.addEventListener('click', () => {
    jumpSound.currentTime = 0; // чтобы звук срабатывал даже при частых нажатиях
    jumpSound.play();

    if (rainbow.classList !== 'jump') {
        rainbow.classList.add('jump');
    }
    
    setTimeout(() => {
        rainbow.classList.remove('jump');
    }, 3000);
});

let isInvincible = false;
let canCountStone = true;

let isAlive = setInterval(() => {
    if (isInvincible) return;

    let rainbowTop = parseInt(window.getComputedStyle(rainbow).getPropertyValue('top'));
    let stoneLeft = parseInt(window.getComputedStyle(stone).getPropertyValue('left'));

    if (stoneLeft < 100 && stoneLeft > 0 && rainbowTop > 250) {
        const lifeCountValue = parseInt(lifeCount.textContent) - 1;
        lifeCount.textContent = `${lifeCountValue}`;
        startInvincibility();

        failSound.play();

        isInvincible = true;
        setTimeout(() => {
            isInvincible = false;
        }, 3000);

        if (lifeCountValue < 1) {
            setTimeout(() => {
                gameOverSound.play();
                reset('Game Over!');
            }, 50);
        }

        return;
    } else if (stoneLeft < 0) {
        if (canCountStone) {
            const stoneCountValue = parseInt(stoneCount.textContent) + 1;
            stoneCount.textContent = `${stoneCountValue}`;
            applepaySound.play();

            if (stoneCountValue >= 10) {
                setTimeout(() => {
                    successSound.play();
                    reset('You are a Winner!');
                }, 50);
            }

            canCountStone = false; 
            setTimeout(() => {
                canCountStone = true; 
            }, 1000);                   
        }
    }
}, 10);

function reset(text) {
    alert(text);
    lifeCount.textContent = '3';
    stoneCount.textContent = '0';
}

function startInvincibility() {
    isInvincible = true;

    let blink = 0;
    const blinkInterval = setInterval(() => {
        rainbow.style.opacity = (rainbow.style.opacity === "0.2" ? "1" : "0.2");
        blink++;
        if (blink > 10) { // 10 миганий = ~1 секунда
            clearInterval(blinkInterval);
            rainbow.style.opacity = "1";
            isInvincible = false;
        }
    }, 100);
}
