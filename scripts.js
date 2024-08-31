// scripts.js

const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const gameStatus = document.querySelector('.game-status');
const restartButton = document.getElementById('restartButton');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.classList.remove('winner');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    gameStatus.textContent = `Player X's turn`;
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        updateGameStatus();
    }
}

function endGame(draw) {
    if (draw) {
        gameStatus.textContent = "Draw!";
    } else {
        gameStatus.textContent = `${circleTurn ? "Player O" : "Player X"} Wins!`;
        highlightWinningCells();
    }
    cellElements.forEach(cell => cell.removeEventListener('click', handleClick));
}

function highlightWinningCells() {
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    WINNING_COMBINATIONS.forEach(combination => {
        const [a, b, c] = combination;
        if (cellElements[a].classList.contains(currentClass) &&
            cellElements[b].classList.contains(currentClass) &&
            cellElements[c].classList.contains(currentClass)) {
            cellElements[a].classList.add('winner');
            cellElements[b].classList.add('winner');
            cellElements[c].classList.add('winner');
        }
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (circleTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function updateGameStatus() {
    gameStatus.textContent = `Player ${circleTurn ? "O" : "X"}'s turn`;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
