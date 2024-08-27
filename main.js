const scale = 20;

const areaWidth = 30;
const areaHeight = 30;

const area = document.getElementById("area");
const intro = document.getElementById("intro");
const bodyContainer = document.getElementById("body");
const start = document.getElementById("start");
const food = document.getElementById("food");
const eatSound = document.getElementById("eatSound"); // Get the audio element

let gameStarted = false;
let direction = "up";
let nextDirection = "up"; 

let food_loc = generateFood();

let positionX = 5;
let positionY = 5;

const bodyCoordinates = [
    { x: 7, y: 5 },
    { x: 8, y: 5 },
    { x: 9, y: 5 },
    { x: 10, y: 5 },
];

function startGame() {
    gameStarted = true;
    intro.style.display = "none";
    start.style.display = "none";
}

function resetGame() {
    area.style.width = `${areaWidth * scale}px`;
    area.style.height = `${areaHeight * scale}px`;
    render();
}

function generateFood() {
    const x = Math.floor(Math.random() * areaWidth);
    const y = Math.floor(Math.random() * areaHeight);
    return [x, y];
}

function changeDirection(value) {
    if (direction === "left" || direction === "right") {
        if (value === "up" || value === "down") {
            nextDirection = value; 
        }
    } else if (direction === "down" || direction === "up") {
        if (value === "right" || value === "left") {
            nextDirection = value; 
        }
    }
}

function goRight() {
    positionX += 1;
    if (positionX > areaWidth - 1) {
        positionX = 0;
    }
}

function goLeft() {
    positionX -= 1;
    if (positionX < 0) {
        positionX = areaWidth - 1;
    }
}

function goDown() {
    positionY += 1;
    if (positionY > areaHeight - 1) {
        positionY = 0;
    }
}

function goUp() {
    positionY -= 1;
    if (positionY < 0) {
        positionY = areaHeight - 1;
    }
}

function gameLoop() {
    direction = nextDirection; 

    switch (direction) {
        case "up":
            goUp();
            break;
        case "down":
            goDown();
            break;
        case "right":
            goRight();
            break;
        case "left":
            goLeft();
            break;
    }
    bodyCoordinates.push({ x: positionX, y: positionY });
    bodyCoordinates.shift();
    render();
}

function handleKeydown(event) {
    console.log(event.key);
    if (
        (!gameStarted && event.code === "Space") ||
        (!gameStarted && event.key === "")
    ) {
        startGame();
    } else if (gameStarted) {
        switch (event.key) {
            case "ArrowUp":
            case "w":
                changeDirection("up");
                break;
            case "ArrowDown":
            case "s":
                changeDirection("down");
                break;
            case "ArrowRight":
            case "d":
                changeDirection("right");
                break;
            case "ArrowLeft":
            case "a":
                changeDirection("left");
                break;
        }
    }
}

function render() {
    food.style.top = `${food_loc[1] * scale}px`;
    food.style.left = `${food_loc[0] * scale}px`;
    if (food_loc[0] === positionX && food_loc[1] === positionY) {
        bodyCoordinates.unshift(bodyCoordinates[0]);
        food_loc = generateFood();
        eatSound.play(); 
    }

    let bodyHtml = "";

    for (let i = 0; i < bodyCoordinates.length; i++) {
        bodyHtml += `<div class="part" style="top: ${bodyCoordinates[i].y * scale}px; left: ${bodyCoordinates[i].x * scale}px"></div>`;
    }

    bodyContainer.innerHTML = bodyHtml;
}

resetGame();

let speed = 200;
setInterval(gameLoop, speed);
window.addEventListener("keydown", handleKeydown);
 