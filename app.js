// Variables
const boardBtn = document.querySelectorAll('.square');
const restartBtn = document.querySelector('#resetBtn');
const player1ScoreInfo = document.querySelector('#player1-score');
const player2ScoreInfo = document.querySelector('#player2-score');
const roundInfo = document.querySelector('#round-info');
const player1Info = document.querySelector('#player1-info');
const player2Info = document.querySelector('#player2-info');
const startDialog = document.querySelector('#start-dialog');
const submitBtn = document.querySelector('#submit-btn');

const gameboard = ["", "", "", "", "", "", "", "", "",];

const player1 = {name: 'player1', symbol: 'x'};
const player2 = {name: 'player2', symbol: 'o'};

let currentPlayer = player1;
let player1Score = 0;
let player2Score = 0;
let totalRounds = 5;
let currentRound = 0;


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
        return true;
    }
    return false
}

//Fucntion to reset board
function resetBoard () {
    boardBtn.forEach((button) => {
        button.textContent = "";
        button.disabled = false
        currentPlayer = player1;
    })
    gameboard.fill("");
}

function game() {
    setTimeout(() => {roundInfo.textContent = `Round: 0${currentRound + 1}`;}, 700);

    player1ScoreInfo.textContent = `Player-1: ${player1Score}`;
    player2ScoreInfo.textContent = `Player-2: ${player2Score}`;
    if (player1Score > player2Score) {
        player1ScoreInfo.style.color = '#7EBC03';
        player2ScoreInfo.style.color = '#FFF';
    } else if (player2Score > player1Score) {
        player2ScoreInfo.style.color = '#7EBC03';
        player1ScoreInfo.style.color = '#FFF';
    } else {
        player1ScoreInfo.style.color = '#FFF';
        player2ScoreInfo.style.color = '#FFF';
    }

    if (currentRound === totalRounds) {
        if (player1Score > player2Score) {
            roundInfo.textContent = `${player1.name} wins!`;
        } else if (player2Score > player1Score) {
            roundInfo.textContent = `${player2.name} wins!`;
        } else {
            roundInfo.textContent = 'Tie!';

        }
    }
}

function resetGame() {
    gameboard.fill("");
    currentRound = 0;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = player1;

    roundInfo.textContent = `Round: 0${currentRound + 1}`;
    player1ScoreInfo.textContent = `Player-1: ${player1Score}`;
    player2ScoreInfo.textContent = `Player-2: ${player2Score}`;

    player1ScoreInfo.style.color = '#FFF';
    player2ScoreInfo.style.color = '#FFF';

    
    boardBtn.forEach((button) => {
        button.textContent = "";
        button.disabled = false
        currentPlayer = player1;
    })

    alert('Game Restarted')
}

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
                roundInfo.textContent = `${currentPlayer.name} wins round ${currentRound + 1}!`;

                if (currentPlayer.name === player1.name) {
                    player1Score++;
                    
                } else {
                    player2Score++;
                
                }

                resetBoard();
                currentRound++;
                game();
            } else if (checkTie()) {
                roundInfo.textContent = 'Tie!';
                console.log(`Player1: ${player1Score}, Player2: ${player2Score}`)
                resetBoard();
                currentRound++;
                game();
            } else {
                changePlayer();
            }
        }   
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

game();

restartBtn.addEventListener('click', resetGame);