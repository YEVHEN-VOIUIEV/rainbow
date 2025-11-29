const rainbow = document.getElementById('rainbow');
const stone = document.getElementById('stone');
const jumpButton = document.getElementById('jumpButton');
const lifeCount = document.getElementById('life-count');
const stoneCount = document.getElementById('stone-count');

jumpButton.addEventListener('click', () => {
    if (rainbow.classList !== 'jump') {
        rainbow.classList.add('jump');
    }
    
    setTimeout(() => {
        rainbow.classList.remove('jump');
    }, 1000);
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

        isInvincible = true;
        setTimeout(() => {
            isInvincible = false;
        }, 3000);

        if (lifeCountValue < 1) {
            setTimeout(() => {
                reset('Game Over!');
            }, 50);
        }

        return;
    } else if (stoneLeft < 0) {
        if (canCountStone) {
            const stoneCountValue = parseInt(stoneCount.textContent) + 1;
            stoneCount.textContent = `${stoneCountValue}`;

            if (stoneCountValue >= 10) {
                setTimeout(() => {
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
