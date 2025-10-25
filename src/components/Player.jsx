import { useState } from "react"

export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function playerEditingHandler() {
        setIsEditing((editing) => !editing)
    }

    function handleChange(event) {
        console.log(event)
        setPlayerName(event.target.value)
    }

    let player = <span className="player-name">{playerName}</span>

    if (isEditing) {
        player = <input type="text" value={playerName} onChange={handleChange} required />
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player-info">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={playerEditingHandler}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}