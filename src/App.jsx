import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx";

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

  function handleSquareClick(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const updatedTurn = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurn]
      return updatedTurn
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName="Player 1" symbol="X" />
          <Player isActive={activePlayer === 'O'} initialName="Player 2" symbol="O" />
        </ol>
        <GameBoard onSelect={handleSquareClick} turns={gameTurn}></GameBoard>
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
