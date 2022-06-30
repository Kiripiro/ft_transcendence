import React, { useState } from 'react';
import JoinRoom from './JoinQueue';
import GamePage from './GamePage';

const GameSwitch=() => {
    const [gameStart, setGameStart] = useState(false);
    const [specID, setSpecID] = useState("0");
    const [roomID, setRoomID] = useState("");
    const [gameMap, setGameMap] = React.useState("");

    if (gameStart)
        return (
            <GamePage gameStart={gameStart} setGameStart={setGameStart} roomID={roomID} />
        )
    else
        return (
            <JoinRoom
                gameStart={gameStart}
                setGameStart={setGameStart}
                setRoomID={setRoomID}
                specID={specID}
                setSpecID={setSpecID}
                gameMap={gameMap}
                setGameMap={setGameMap}
                />
        )
}

export default GameSwitch;
