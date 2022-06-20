import React, { useState } from 'react';
import JoinRoom from './JoinQueue';
import PongPage from './PongPage';

const GameSwitch=() => {
    const [gameStart, setGameStart] = useState(false);
    const [specID, setSpecID] = useState("0");
    const [roomID, setRoomID] = useState("");

    if (gameStart)
        return (
            <PongPage gameStart={gameStart} setGameStart={setGameStart} roomID={roomID} />
        )
    else
        return (
            <JoinRoom gameStart={gameStart} setGameStart={setGameStart} setRoomID={setRoomID} specID={specID} setSpecID={setSpecID}/>
        )
}

export default GameSwitch;
