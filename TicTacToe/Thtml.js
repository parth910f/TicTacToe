const board = document.getElementById("board");
const resetButton = document.getElementById("resetButton");
// const board = document.getElementById("board");
const result = document.getElementById("result");
const turnIndicator = document.getElementById("turnIndicator");

let currentPlayer = "X";


let boardState = Array(9).fill(null);
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
function createBoard() {
    for (let i = 0; i < 9; ++i){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);

    }

}


function handleClick(event) {
    const index = event.target.dataset.index; //to get the index of clicked cell
    if (boardState[index] !== null || checkWinner()) {
        return;
        //if cell is already filled (Not Null)
        // or winner already found then
        //ofc we cant fill....return
    }
    // console.log("hello");

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    //since we have filled it....let check if that is the
    //winner case or not....
    const TrueCombination = checkWinner(); //check status
    //if true (all matched in winningCombination), it will return combination
    //otherwise null
    if (TrueCombination) {
        result.textContent = `${currentPlayer} Wins`;
        result.style.color = "gold";
        Highlights(TrueCombination);

    } else if (boardState.every((cell) => cell !== null)) {
        //draw mtlb internally sab cells Not Null ho, mtlb filled
        result.textContent = `Draw`;
        result.style.color = "white";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnIndicator.textContent = `${currentPlayer} 's Turn`;
    }

}
function Highlights(TrueCombination) {
    TrueCombination.forEach(index => {
        board.children[index].classList.add("highlight");
        //added "highlight" class to each cell of winning combination
    })
}
function checkWinner() {
    // return winningCombinations.some((combination) => {
    //     return combination.every((index) => boardState[index] === currentPlayer);
    // });

    for (const combination of winningCombinations) {
        if (combination.every(index=> boardState[index] === currentPlayer)) {
            return combination;
        }
    }
    return null;

    
    
    // return winningCombinations.some((combination) => {
    //     return combination.every((index) => boardState[index] === currentPlayer)
        
    // });

    //some - koi b ek true ho, poore array me se thn ret true
    //every - all element of arrays should be true to return true...
    //agar winner combination ka koi ek b comb ka Every matched hoga
}

function resetfun() {
    boardState.fill(null);
    currentPlayer = "X";
    Array.from(board.children).forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("highlight");

    });
    result.textContent = "";
    turnIndicator.textContent = "X 's Turn";

}

createBoard();  
resetButton.addEventListener("click", resetfun);
