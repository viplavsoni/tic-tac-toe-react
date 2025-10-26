export default function GameOver({ winner }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>Winner: {winner}</p>}
            {!winner && <p>It's Draw</p>}
            <p>
                <button>Rematch!</button>
            </p>
        </div>
    )
}