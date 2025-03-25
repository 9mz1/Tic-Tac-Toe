// Variables
const boardBtn = document.querySelectorAll('.square');
const restartBtn = document.querySelector('#resetBtn');
const player1Info = document.querySelector('#player1-info');
const player2Info = document.querySelector('#player2-info');

const gameboard = ["", "", "", "", "", "", "", "", "",];

const player1 = {name: 'player1', symbol: 'x'};
const player2 = {name: 'player2', symbol: 'o'};

let currentPlayer = player1;
let player1Score = 0;
let player2Score = 0;
let totalRounds = 5;


// Function to place player marker on board
function placeMarker(index, player) {
    if (gameboard[index] === "") {
        gameboard[index] = player.symbol;
    }
}


// Function to change player turns
function changePlayer( ) {
    if (currentPlayer === player1) {
        currentPlayer = player2;
        player2Info.style.color = '#7EBC03';
        player2Info.style.fontWeight = '700';
        player1Info.style.color = '#FFF';
        player1Info.style.fontWeight = '400';
    } else {
        currentPlayer = player1;
        player1Info.style.color = '#7EBC03';
        player1Info.style.fontWeight = '700';
        player2Info.style.color = '#FFF';
        player2Info.style.fontWeight = '400';
    }
}

// Function to check for winner
function checkWinner() {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of lines) {
        if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
            return gameboard[a];
        }
    }

    return null;
};

// Function to check for tie
function checkTie() {
    if (!gameboard.includes("") && !checkWinner()) {
        resetGame();
        return true;
    }
    return false
}

//Fucntion to reset game
function resetGame () {
    boardBtn.forEach((button) => {
        button.textContent = "";
        button.disabled = false
        currentPlayer = player1;
    })
    gameboard.fill("");
}

function game() {
    if (player1Score === totalRounds || player2Score === totalRounds) {
        console.log('YOU WONNN');
    } else {
        console.log('you lost');
    }

    console.log('looo');
}

// normal game function
boardBtn.forEach((button) => {
    button.addEventListener('click', () => {
        let index = button.getAttribute('data-index');
        button.textContent = currentPlayer.symbol;
        if (gameboard[index] === "") {
            placeMarker(index, currentPlayer);
            button.textContent = currentPlayer.symbol;
            console.log(currentPlayer.symbol);
            button.disabled = true;
            if (checkWinner()) {
                alert(`${currentPlayer.name} wins!`);
                if (currentPlayer.name === player1.name) {
                    player1Score++;
                    console.log(`Player1: ${player1Score}, Player2: ${player2Score}`)
                } else {
                    player2Score++;
                    console.log(`Player1: ${player1Score}, Player2: ${player2Score}`)
                }
                resetGame();
            } else if (checkTie()) {
                alert('Tie!');
                console.log(`Player1: ${player1Score}, Player2: ${player2Score}`)
                resetGame();
            } else {
                changePlayer();
            }
        }   
        game();
    })

    button.addEventListener('mouseenter', () => {
        if (button.textContent === "") {
            button.classList.add('hover');
            button.textContent = currentPlayer.symbol;
        }
    })
    button.addEventListener('mouseleave', () => {
        if (!button.disabled) {
            button.classList.remove('hover');
            button.textContent = "";
        }
    })
})

restartBtn.addEventListener('click', resetGame);