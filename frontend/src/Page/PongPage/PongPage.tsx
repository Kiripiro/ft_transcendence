import { text } from 'node:stream/consumers';
import React from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './PongPage.css';


// const Players=() => {

//     function movePlayers() {
//         if (movePlayer1.down)
//             moveDown(0);
//         if (movePlayer1.up)
//            moveUp(0);
//         if (movePlayer2.down)
//            moveDown(1);
//        if (movePlayer2.up)
//           moveUp(1);
//     }

//     function moveUp(player: number) {
//         if (pos[player] > 8)
//             pos[player]--;
//         }

//     function moveDown(player: number) {
//         if (pos[player] < 92)
//             pos[player]++;
//     }

//     function refreshPlayers() {
//         movePlayers();

//         var player :any = document.getElementById("player1");
//         if (player !== null)
//             player.style.top= "calc(" + pos[0].toString() + "% - 8%)";
//         player = document.getElementById("player2");
//         if (player !== null)
//             player.style.top= "calc(" + po1.toString() + "% - 8%)";
//     }

    

//     function onKeyDown(e: any) {
//         console.log(pos);
//         if (e.key === 'ArrowUp')
//             movePlayer1.up = true;
//         if (e.key === 'ArrowDown')
//             movePlayer1.down = true;
//         if (e.key === 'w')
//             movePlayer2.up = true;
//         if (e.key === 's')
//             movePlayer2.down = true;
//     }

//     function onKeyUp(e: any) {
//         if (e.key === 'ArrowUp')
//             movePlayer1.up = false;
//         if (e.key === 'ArrowDown')
//             movePlayer1.down = false;
//         if (e.key === 'w')
//             movePlayer2.up = false;
//         if (e.key === 's')
//             movePlayer2.down = false;
//     }
    
//     document.addEventListener("keydown", onKeyDown);
//     document.addEventListener("keyup", onKeyUp);
    
//     const intervalPlayer = setInterval(refreshPlayers, 10);
    
//     return (
//         <>
//             <div className="player1" id="player1"></div>
//             <div className="player2" id="player2"></div>
//         </>
//     )
// }

// const Ball=() => {
    
//     function refreshBall() {
        
//         var ball = document.getElementById("ball");
//         var pongBoard = document.getElementById("pongBoard");

//         if (ball !== null && pongBoard !== null) {
//             var ballRadius = ball.clientHeight;
            
//             if (ballPos.y + ballSpeed.y < 0 || ballPos.y + ballSpeed.y + ballRadius > pongBoard.clientWidth)
//                 ballSpeed.y = 0 - ballSpeed.y;

//             if (ballPos.x + ballSpeed.x < 0 || ballPos.x + ballSpeed.x + ballRadius > pongBoard.clientHeight)
//                 ballSpeed.x = 0 - ballSpeed.x;
            
//             ballPos.x += ballSpeed.x;
//             ballPos.y += ballSpeed.y;

//             ball.style.top= "calc(" + ballPos.x.toString() + "px)";
//             ball.style.left= "calc(" + ballPos.y.toString() + "px)";
//         }
//     }

//     const intervalBall = setInterval(refreshBall, 10);
//     return (
//         <div className="ball" id="ball"></div>
//     )
// }


var Player1 = {
    "pos" : 50,
    "up" : false,
    "down" : false,
    "score" : 0
}

var Player2 = {
    "pos" : 50,
    "up" : false,
    "down" : false,
    "score" : 0
}

var canvas = {
    "width" : 800,
    "height" : 600
}

var Ball = {
    "x" : canvas.width / 2,
    "y" : canvas.height / 2,
    "dx" : 2,
    "dy" : -2,
    "radius" : 10
}

var inPlay: boolean = false;

const PongPage=() => {

    function resetBallPos() {
        Ball.x = canvas.width / 2;
        Ball.y = canvas.height / 2;
    }

    function onKeyDown(e: any) {
        if (e.key === 'ArrowUp')
            Player1.up = true;
        if (e.key === 'ArrowDown')
            Player1.down = true;
        if (e.key === 'w')
            Player2.up = true;
        if (e.key === 's')
            Player2.down = true;
        if (e.key === "Enter")
            if (!inPlay)
                inPlay = true;
    }

    document.addEventListener("keydown", onKeyDown);

    function onKeyUp(e: any) {
        if (e.key === 'ArrowUp')
            Player1.up = false;
        if (e.key === 'ArrowDown')
            Player1.down = false;
        if (e.key === 'w')
            Player2.up = false;
        if (e.key === 's')
            Player2.down = false;
    }
    
    document.addEventListener("keyup", onKeyUp);

    function moveBall() {
        if (Ball.x + Ball.dx > canvas.width - Ball.radius ) {
            Player1.score++;
            Ball.dx = 0 - Ball.dx;
            inPlay = false;
        }

        if (Ball.x + Ball.dx < Ball.radius) {
            Player2.score++;
            Ball.dx = 0 - Ball.dx;
            inPlay = false;
        }

        if (Ball.y + Ball.dy > canvas.height - Ball.radius || Ball.y + Ball.dy < Ball.radius) {
            Ball.dy = 0 - Ball.dy;
        }

        Ball.x += Ball.dx;
        Ball.y += Ball.dy;
    }

    setInterval(moveBall, 10);

    function movePlayers() {
        if (Player1.up)
            if (Player1.pos > 5)
                Player1.pos--;
        if (Player1.down)
            if (Player1.pos < 95)
                    Player1.pos++;
        if (Player2.up)
            if (Player2.pos > 5)
                Player2.pos--;
        if (Player2.down)
            if (Player2.pos < 95)
                    Player2.pos++;
    }

    setInterval(movePlayers, 15);

    function drawFont(ctx: CanvasRenderingContext2D | null, color: string) {
        if (ctx !== null) {

            ctx.fillStyle = color;

            ctx.fillRect(0, 0, canvas.width, canvas.height);

    }}


    function drawBall(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {

            ctx.beginPath();

            var color = "rgb(" + (Math.random() * 255).toString() + "," + (Math.random() * 255).toString() + "," + (Math.random() * 255).toString() + ")";

            ctx.fillStyle = color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = color;

            ctx.arc(Ball.x, Ball.y, Ball.radius, 0, Math.PI * 2);

            ctx.fill();

            ctx.shadowBlur = 0;

    }}

    function drawPlayers(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {
            ctx.fillStyle = 'red';
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'red';

            ctx.fillRect(canvas.width / 8 - 5, (Player1.pos * canvas.height / 100) - (canvas.height / 20), 10, canvas.height / 10);

            ctx.fillStyle = 'blue';
            ctx.shadowColor = 'blue';

            ctx.fillRect((canvas.width / 8  * 7) - 5, (Player2.pos * canvas.height / 100) - (canvas.height / 20), 10, canvas.height / 10);

            ctx.shadowBlur = 0;
    }}
        
    function drawScore(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {

            ctx.textAlign = 'center';
            ctx.font = '50px Arial';

            ctx.fillStyle = 'red'
            ctx.fillText(Player1.score.toString(), canvas.width / 4 + canvas.width / 16, canvas.height / 10);
            
            ctx.fillStyle = 'blue'
            ctx.fillText(Player2.score.toString(), (canvas.width / 4 * 3) - canvas.width / 16, canvas.height / 10);

    }}

function drawLimitsMove(ctx: CanvasRenderingContext2D | null) {
    if (ctx !== null) {

            ctx.beginPath();

            ctx.lineWidth = 1;
            ctx.strokeStyle = '#3A3935';

            ctx.moveTo(canvas.width / 8, 0);
            ctx.lineTo(canvas.width / 8, canvas.height);

            ctx.moveTo((canvas.width / 8) * 7, 0);
            ctx.lineTo((canvas.width / 8) * 7, canvas.height);

            ctx.stroke();
            ctx.fill();

    }}

    function drawLimitCamps(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {

            ctx.beginPath();

            ctx.lineWidth = 3;
            ctx.strokeStyle = '#3A3935';
            ctx.setLineDash([canvas.height / 30, canvas.height / 120]);
            
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            
            ctx.stroke();

            ctx.setLineDash([]);
    }}

    function drawText(ctx:CanvasRenderingContext2D | null) {
        resetBallPos();
        if (ctx !== null) {

            ctx.font = '50px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText("Press ENTER to play !", canvas.width / 2, canvas.height / 2);

    }}

    function draw() {

        var canvas = document.getElementById('pongBoard') as HTMLCanvasElement;
        if (canvas !== null) {
            var ctx = canvas.getContext('2d');
            if (ctx !== null) {

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                drawFont(ctx, "black");

                if (!inPlay)
                    return drawText(ctx);

                drawLimitsMove(ctx);

                drawLimitCamps(ctx);
                
                drawScore(ctx);

                drawPlayers(ctx);

                drawBall(ctx);

    }}}

    setInterval(draw);

    
    return (
        <div className='Font'>
            <Navbar/>
            <canvas
                id='pongBoard'
                className='pongBoard'
                height={canvas.height}
                width={canvas.width}
            />
            {/* <Navbar/>
            <div className="pongBoard" id="pongBoard">
                <div className="limitPlayer1"></div>
                <div className="limitCamps"></div>
                <div className="limitPlayer2"></div>
                <Players/>
                <Ball/>
            </div> */}
        </div>
    );
  };
  
  export default PongPage;
  