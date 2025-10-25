import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSquareClick() {
    setActivePlayer((activeP) => activeP === 'X' ? 'O' : 'X')
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName="Player 1" symbol="X" />
          <Player isActive={activePlayer === 'O'} initialName="Player 2" symbol="O" />
        </ol>
        <GameBoard onSelect={handleSquareClick} activePlayerSymbol={activePlayer}></GameBoard>
      </div>
    </main>
  )
}

export default App
