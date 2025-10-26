import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx";

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSquareClick(rowIndex, colIndex) {
    setActivePlayer((activeP) => activeP === 'X' ? 'O' : 'X');
    setGameTurn((prevTurn) => {
      let currentPlayer = 'X';

      if (prevTurn.length > 0 && prevTurn[0].player === 'X') {
        currentPlayer = 'O'
      }

      const updatedTurn = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurn]
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
