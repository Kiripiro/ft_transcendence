import React from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './PongPage.css';

var movePlayer1 = {
    "up" : false,
    "down" : false
}

var movePlayer2 = {
    "up" : false,
    "down" : false
}

// Positions des deux joueurs, pos[0] -> player1 | pos[1] -> player2
var pos: number[] = [50, 50]

var ballPos = {
    "x" : 50,
    "y" : 50
}

var ballSpeed = {
    "x" : 1,
    "y" : -1
}

const Players=() => {

    function movePlayers() {
        if (movePlayer1.down)
            moveDown(0);
        if (movePlayer1.up)
           moveUp(0);
        if (movePlayer2.down)
           moveDown(1);
       if (movePlayer2.up)
          moveUp(1);
    }

    function moveUp(player: number) {
        if (pos[player] > 8)
            pos[player]--;
        }

    function moveDown(player: number) {
        if (pos[player] < 92)
            pos[player]++;
    }

    function refreshPlayers() {
        movePlayers();

        var player :any = document.getElementById("player1");
        if (player !== null)
            player.style.top= "calc(" + pos[0].toString() + "% - 8%)";
        player = document.getElementById("player2");
        if (player !== null)
            player.style.top= "calc(" + pos[1].toString() + "% - 8%)";
    }

    

    function onKeyDown(e: any) {
        console.log(pos);
        if (e.key === 'ArrowUp')
            movePlayer1.up = true;
        if (e.key === 'ArrowDown')
            movePlayer1.down = true;
        if (e.key === 'w')
            movePlayer2.up = true;
        if (e.key === 's')
            movePlayer2.down = true;
    }

    function onKeyUp(e: any) {
        if (e.key === 'ArrowUp')
            movePlayer1.up = false;
        if (e.key === 'ArrowDown')
            movePlayer1.down = false;
        if (e.key === 'w')
            movePlayer2.up = false;
        if (e.key === 's')
            movePlayer2.down = false;
    }
    
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    
    const intervalPlayer = setInterval(refreshPlayers, 10);
    
    return (
        <>
            <div className="player1" id="player1"></div>
            <div className="player2" id="player2"></div>
        </>
    )
}

const Ball=() => {
    
    function refreshBall() {
        
        var ball = document.getElementById("ball");
        var pongBoard = document.getElementById("pongBoard");

        if (ball !== null && pongBoard !== null) {
            var ballRadius = ball.clientHeight;
            
            if (ballPos.y + ballSpeed.y < 0 || ballPos.y + ballSpeed.y + ballRadius > pongBoard.clientWidth)
                ballSpeed.y = 0 - ballSpeed.y;

            if (ballPos.x + ballSpeed.x < 0 || ballPos.x + ballSpeed.x + ballRadius > pongBoard.clientHeight)
                ballSpeed.x = 0 - ballSpeed.x;
            
            ballPos.x += ballSpeed.x;
            ballPos.y += ballSpeed.y;

            ball.style.top= "calc(" + ballPos.x.toString() + "px)";
            ball.style.left= "calc(" + ballPos.y.toString() + "px)";
        }
    }

    const intervalBall = setInterval(refreshBall, 10);
    return (
        <div className="ball" id="ball"></div>
    )
}

const PongPage=() => {
    return (
        <div className='Font'>
            <Navbar/>
            <div className="pongBoard" id="pongBoard">
                <div className="limitPlayer1"></div>
                <div className="limitCamps"></div>
                <div className="limitPlayer2"></div>
                <Players/>
                <Ball/>
            </div>
        </div>
    );
  };
  
  export default PongPage;
  