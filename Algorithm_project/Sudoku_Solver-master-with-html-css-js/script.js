var arr = Array.from({ length: 9 }, () => Array(9).fill(null));

// Populate the arr array with references to the div elements
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);
    }
}

var board = Array.from({ length: 9 }, () => Array(9).fill(0));

// Function to fill the board on the webpage
function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j];
            } else {
                arr[i][j].innerText = '';
            }
        }
    }
}

// Get the buttons for fetching and solving the puzzle
let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

// Fetch a puzzle from the `sugoku` API
GetPuzzle.onclick = function () {
    fetch('https://sugoku.onrender.com/board?difficulty=easy')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            board = data.board;
            FillBoard(board);
        })
        .catch(error => console.error('Error fetching puzzle:', error));
};

// Solve the puzzle when the SolvePuzzle button is clicked
SolvePuzzle.onclick = () => {
    SudokuSolver(board, 0, 0, 9);
};

// Function to check if a number can be placed in a cell
function isValid(board, row, col, num, n) {
    for (let i = 0; i < n; i++) {
        if (board[i][col] == num) return false;
        if (board[row][i] == num) return false;
        if (board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] == num) return false;
    }
    return true;
}

// Function to solve the Sudoku puzzle using backtracking
function SudokuSolver(board, i, j, n) {
    if (i == n) {
        FillBoard(board);
        return true;
    }
    if (j == n) {
        return SudokuSolver(board, i + 1, 0, n);
    }
    if (board[i][j] != 0) {
        return SudokuSolver(board, i, j + 1, n);
    }
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, i, j, num, n)) {
            board[i][j] = num;
            if (SudokuSolver(board, i, j + 1, n)) return true;
            board[i][j] = 0;
        }
    }
    return false;
}
