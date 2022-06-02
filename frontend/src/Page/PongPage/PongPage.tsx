import { wait } from '@testing-library/user-event/dist/utils';
import { start } from 'node:repl';
import { text } from 'node:stream/consumers';
import { threadId } from 'node:worker_threads';
import React from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './PongPage.css';

var canvas = {
    "width" : 800,
    "height" : 600
}

var Player1 = {
    "x" : 0,
    "y" : canvas.height / 2,
    "up" : false,
    "down" : false,
    "score" : 0,
    "width" : canvas.width / 40,
    "height" : canvas.height / 5,
    "speed" : 3,
}

var Player2 = {
    "x" : 0,
    "y" : canvas.height / 2,
    "up" : false,
    "down" : false,
    "score" : 0,
    "width" : canvas.width / 40,
    "height" : canvas.height / 5,
    "speed" : 3,
}


var Ball = {
    "x" : canvas.width / 2,
    "y" : canvas.height / 2,
    "dx" : 3,
    "dy" : 0,
    "speed" : 3,
    "radius" : 10
}

var inPlay: boolean = false;

var inWait: boolean = false;

const PongPage=() => {

    function checkCollisionPlayer1(): boolean {
        var ptop = Player1.y;
        var pbottom = Player1.y + Player1.height;
        var pleft = Player1.x;
        var pright = Player1.x + Player1.width;
        
        var btop = Ball.y - Ball.radius;
        var bbottom = Ball.y + Ball.radius;
        var bleft = Ball.x - Ball.radius;
        var bright = Ball.x + Ball.radius;
        
        return pleft < bright && ptop < bbottom && pright > bleft && pbottom > btop;
    }

    function checkCollisionPlayer2(): boolean {
        var ptop = Player2.y;
        var pbottom = Player2.y + Player2.height;
        var pleft = Player2.x;
        var pright = Player2.x + Player2.width;
        
        var btop = Ball.y - Ball.radius;
        var bbottom = Ball.y + Ball.radius;
        var bleft = Ball.x - Ball.radius;
        var bright = Ball.x + Ball.radius;
        
        return pleft < bright && ptop < bbottom && pright > bleft && pbottom > btop;
    }

    function resetBallPos() {
        Ball.x = canvas.width / 2;
        Ball.y = canvas.height / 2;
    }

    function resetPlayersPos() {
        Player1.x = canvas.width / 8 - Player1.width / 2;
        Player1.y = canvas.height / 2 - Player1.height / 2;
        Player2.x = canvas.width / 8 * 7 - Player2.width / 2;
        Player2.y = canvas.height / 2 - Player2.height / 2;
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

        if (checkCollisionPlayer1()) {

            let collidePoint = (Ball.y - (Player1.y + Player1.height / 2));

            collidePoint = collidePoint / (Player1.height/2);

            let angleRad = (Math.PI/4) * collidePoint;
            let direction = (Ball.x + Ball.radius < canvas.width/2) ? 1 : -1;
            Ball.dx = direction * Ball.speed * Math.cos(angleRad);
            Ball.dy = Ball.speed * Math.sin(angleRad);

            Ball.speed += 0.1;
        }

        if (checkCollisionPlayer2()) {
            let collidePoint = (Ball.y - (Player2.y + Player2.height / 2));

            collidePoint = collidePoint / (Player2.height/2);
            let angleRad = (Math.PI/4) * collidePoint;
            let direction = (Ball.x + Ball.radius < canvas.width/2) ? 1 : -1;
            Ball.dx = direction * Ball.speed * Math.cos(angleRad);
            Ball.dy = Ball.speed * Math.sin(angleRad);
         
            Ball.speed += 0.1;
        }

        Ball.x += Ball.dx;
        Ball.y += Ball.dy;
    }

    setInterval(moveBall, 20);

    function movePlayers() {
        if (!inPlay)
            return ;
        if (Player1.up)
            if (Player1.y > 0)
                Player1.y -= Player1.speed;
        if (Player1.down)
            if (Player1.y + Player1.height < canvas.height)
                    Player1.y+= Player1.speed;
        if (Player2.up)
            if (Player2.y > 0)
                Player2.y-= Player2.speed;
        if (Player2.down)
            if (Player2.y + Player2.height < canvas.height)
                    Player2.y+= Player2.speed;
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

            ctx.fillStyle = 'green';
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'green';

            ctx.arc(Ball.x, Ball.y, Ball.radius, 0, Math.PI * 2);

            ctx.fill();

            ctx.shadowBlur = 0;

    }}

    function drawPlayers(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {
            ctx.fillStyle = 'red';
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'red';

            ctx.fillRect(Player1.x, Player1.y, Player1.width, Player1.height);

            ctx.fillStyle = 'blue';
            ctx.shadowColor = 'blue';

            ctx.fillRect(Player2.x, Player2.y, Player2.width, Player2.height);

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
        if (ctx !== null) {

            ctx.font = '50px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText("Press ENTER to play !", canvas.width / 2, canvas.height / 2);

    }}

    function refreshGame(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawFont(ctx, "black");

            drawLimitsMove(ctx);

            drawLimitCamps(ctx);

            drawScore(ctx);

            drawPlayers(ctx);

            if (!inPlay || !inWait)
                drawBall(ctx);
    }}

    async function startGame(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {

            resetBallPos();

            resetPlayersPos();

            if (!inPlay)
                drawText(ctx);
    }}

    function draw() {

        var canvas = document.getElementById('pongBoard') as HTMLCanvasElement;
        if (canvas !== null) {
            var ctx = canvas.getContext('2d');
            if (ctx !== null) {

                refreshGame(ctx);
                
                if (!inPlay)
                    return startGame(ctx);


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
  