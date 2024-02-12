const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoreText = document.querySelector("#score")
const resetbtn = document.querySelector("#reset")

const gameWidth = gameboard.width;
const gameHeight = gameboard.height;

const boardBgr = "white";
const snakecolor = "green"
const foodcolor = "red"
const snakeBorder = "black"
const unitsize = 25;

let running = false;

let xvelocity = unitsize;

let yvelocity =0;

let foodX;
let foodY;

let score = 0

let snake = [
    {x:unitsize * 4, y:0},
    {x:unitsize * 3, y:0},
    {x:unitsize * 2, y:0},
    {x:unitsize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetbtn.addEventListener("click",clearBoard )



gameStart();


function gameStart(){

    running = true;
    scoreText.textContent = score;
    createfood();
    drawFood();
    nextTick()
};
function nextTick(){
    if (running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            movesnake();
            drawsnake();
            checkGameOver();
            nextTick();


        }, 75)
    }
    else{
        displayGameOver()
    }



};
function clearBoard(){
    ctx.fillStyle = boardBgr;
    ctx.fillRect(0,0, gameWidth, gameHeight);


};



function createfood(){
    function randomfood(min,max){
        const randnumber = Math.round((Math.random() * (max-min) + min)/ unitsize) * unitsize;
        return randnumber

    }
    foodX = randomfood(0, gameWidth - unitsize);
    foodY = randomfood(0, gameWidth - unitsize);

    console.log(foodX)


};



function drawFood(){
    ctx.fillStyle = foodcolor;
    ctx.fillRect(foodX, foodY, unitsize, unitsize)
};



function movesnake(){
    const head = {x: snake[0].x + xvelocity, y: snake[0].y + yvelocity}
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY ) {
        score+=1
        scoreText.textContent = score
        createfood();        

    } else {
        snake.pop()

    }
};


function drawsnake(){
    ctx.fillStyle = snakecolor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x, snakePart.y, unitsize, unitsize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitsize, unitsize);
    })

};



function changeDirection(event){
    const keypress = event.keyCode;
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40

    const goingup = (yvelocity == -unitsize);
    const goingdown = (yvelocity == unitsize);
    const goingright = (xvelocity == unitsize);
    const goingleft = (xvelocity == -unitsize);


    switch(true){
        case(keypress == left && !goingright):
        xvelocity = -unitsize
        yvelocity = 0
        break;
        case(keypress == up && !goingdown):
        yvelocity = -unitsize
        xvelocity = 0
        break;
        case(keypress == right && !goingleft):
        xvelocity = unitsize
        yvelocity = 0
        break;
        case(keypress == down && !goingup):
        yvelocity = unitsize
        xvelocity = 0
        break;


    }



};
function checkGameOver(){

    switch(true){
        case(snake[0].x <0):

        running = false;
        break

        case(snake[0].x >= gameWidth):
        running = false;
        break
        case(snake[0].y < 0):
        running = false;
        break
        case(snake[0].y >= gameHeight):
        running = false;
        break
    }

};
function displayGameOver(){};
function ResetGame(){

};
