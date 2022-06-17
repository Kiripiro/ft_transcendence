import React, { useState } from 'react';
import JoinRoom from './JoinQueue'
import PongPage from './PongPage'

const GameSwitch=() => {
    const [gameStart, setGameStart] = useState(false);
    const [gameFinish, setGameFinish] = useState(false);
    const [roomID, setRoomID] = useState("");

    if (gameFinish)
        return (
            <></>
        )
    if (gameStart)
        return (
            <PongPage gameStart={gameStart} setGameStart={setGameStart} roomID={roomID} setGameFinish={setGameFinish}/>
        )
    else
        return (
            <JoinRoom gameStart={gameStart} setGameStart={setGameStart} setRoomID={setRoomID}/>
        )
}

export default GameSwitch;
