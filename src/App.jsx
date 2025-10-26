import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATION } from "./winning-combination.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = { 'X': 'Player 1', 'O': 'Player 2' }

const INITIAL_GAME_BOARD = [
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

function derivedWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATION) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if (firstSquareSymbol !== null && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner
}

function derivedGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurn);
  const gameBoard = derivedGameBoard(gameTurn)
  const winner = derivedWinner(gameBoard, players)
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

  function handlePlayerName(symbol, newName) {
    setPlayers((players) => {
      return {
        ...players,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName={PLAYERS.X} symbol="X" onChangeName={handlePlayerName} />
          <Player isActive={activePlayer === 'O'} initialName={PLAYERS.O} symbol="O" onChangeName={handlePlayerName} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver>}
        <GameBoard onSelect={handleSquareClick} board={gameBoard}></GameBoard>
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
