import { useState } from "react"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSquareClick(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            const updatedGameBoard = [...prevGameBoard.map((innerBoard) => [...innerBoard])];
            updatedGameBoard[rowIndex][colIndex] = 'X'
            return updatedGameBoard;
        })
    }


    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((col, colIndex) => <li key={colIndex}>
                        <button onClick={() => handleSquareClick(rowIndex, colIndex)}>{col}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>)
}