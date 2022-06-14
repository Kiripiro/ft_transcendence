import React, { useState } from 'react';
import JoinRoom from './JoinRoom'
import PongPage from './PongPage'

const GameSwitch=() => {
    const [gameStart, setGameStart] = useState(false);
    const [inRoom, setInRoom] = useState(false);

    if (gameStart)
        return (
            <PongPage inRoom={inRoom} setInRoom={setInRoom} gameStart={gameStart} setGameStart={setGameStart}/>
        )
    else
        return (
            <JoinRoom inRoom={inRoom} setInRoom={setInRoom} gameStart={gameStart} setGameStart={setGameStart}/>
        )
}

export default GameSwitch;
