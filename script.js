// Accessing HTML Elements
const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// Initialize. During the start, current player will be X by default
gameInfo.textContent = 'Current Player - X';

// Variable that defines the current player
let currentPlayer;
// The grid array
let gameGrid;

// Array comprising the possible winning poistions on tic tac toe
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Function that initializes the game
function initGame(){
    // Initially the grid values are empty
    currentPlayer = 'X';
    // Initially the grid values are empty
    gameGrid = ["","","","","","","","",""];
    // Update UI Grid
    boxes.forEach((box, index) => {
        // empty the box
        box.textContent = "";
        // enable cursor pointer
        boxes[index].style.pointerEvents = "all";
        // remove green background
        boxes[index].classList.remove("win");
    })
    // The New Game Button is removed
    newGameBtn.classList.remove("active");
    // Update the top box with who is the current player
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

initGame();

function checkGameOver(){
    let answer = "";
    // loop through each winning poisiton and check if they are equal, if yes, check for X or O
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            // disable pointer when winner
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // Update the winner background
            // Add green background to thwe won boxes
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })
    // We have a winner
    if(answer !== ""){
        gameInfo.textContent = `Winner Player - ${answer}`;
        // make the new game button visible
        newGameBtn.classList.add('active');
    } 

    // check for tied condition
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    })

    // If board is full, tied game
    if(fillCount === 9){
        // Game Tied Displayed
        gameInfo.textContent = `Game Tied`;
        // make the new game button visible
        newGameBtn.classList.add('active');
    }
}

function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // Update UI
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    // We will process only when the box is empty
    if(gameGrid[index] === ""){
        // Update the UI with the player's symbol
        boxes[index].innerHTML = currentPlayer;
        // Update our gameGrid array with the player
        gameGrid[index] = currentPlayer;
        // Disable the box's cursor pointer
        boxes[index].style.pointerEvents="none";
        // swap player
        swapTurn();
        // check winner
        checkGameOver();
    }
}

// add event listener to all boxes. Access the index to identify which box has been clicked on.
// Use forEach loop to loop through every box
boxes.forEach((box, index) => {
    box.addEventListener('click', ()=>{
        handleClick(index);
    })
});

// When New Game is clicked on
newGameBtn.addEventListener('click', initGame);