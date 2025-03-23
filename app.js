const boardBtn = document.querySelectorAll('.square');
const restartBtn = document.querySelector('#resetBtn');

const gameboard = ["", "", "", "", "", "", "", "", "",];

const player1 = {name: 'player1', symbol: 'x'};
const player2 = {name: 'player2', symbol: 'o'};

let currentPlayer = player1;


function placeMarker(index, player) {
    if (gameboard[index] === "") {
        gameboard[index] = player.symbol;
    }
}

function changePlayer( ) {
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
}

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

function resetGame () {
    boardBtn.forEach((button) => {
        button.textContent = "";
        currentPlayer = player1;
    })
    gameboard.fill("");
}

boardBtn.forEach((button) => {
    button.addEventListener('click', () => {
        let index = button.getAttribute('data-index');
        if (gameboard[index] === "") {
            placeMarker(index, currentPlayer);
            button.textContent = currentPlayer.symbol;
            console.log(currentPlayer.symbol);
            if (checkWinner()) {
                alert(`${currentPlayer.name} wins!`);
            } else {
                changePlayer();
            }
        }   
    })
})

restartBtn.addEventListener('click', resetGame);