import React, { useState } from 'react';
import JoinRoom from './JoinQueue'
import PongPage from './PongPage'

const GameSwitch=() => {
    const [gameStart, setGameStart] = useState(false);

    if (gameStart)
        return (
            <PongPage gameStart={gameStart} setGameStart={setGameStart}/>
        )
    else
        return (
            <JoinRoom gameStart={gameStart} setGameStart={setGameStart}/>
        )
}

export default GameSwitch;
