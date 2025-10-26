import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATION } from "./winning-combination.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function derivedActivePlayer(turns) {
  let currentPlayer = 'X';

  if (turns.length > 0 && turns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurn);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATION) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if (firstSquareSymbol !== null && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSquareClick(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const updatedTurn = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurn]
      return updatedTurn
    })
  }

  function handleRestart() {
    setGameTurn([])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName="Player 1" symbol="X" />
          <Player isActive={activePlayer === 'O'} initialName="Player 2" symbol="O" />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver>}
        <GameBoard onSelect={handleSquareClick} board={gameBoard}></GameBoard>
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
