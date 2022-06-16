import React, { useState } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './PongPage.css';
import JoinRoom from './JoinQueue'
import { useSelector } from 'react-redux';
import { RootState } from '../../State';
import { gameRoomClass } from './gameRoomClass';

var canvas = {
    "width" : 800,
    "height" : 600
}

var inPlay: boolean = false;

const PongPage=(props: any) => {

    // // drawFont : desine le fond du jeu
    function drawFont(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {

            ctx.fillStyle = '#000000';

            ctx.fillRect(0, 0, canvas.width, canvas.height);

    }}

    // drawBall : dessine la balle en fonction de sa position
    function drawBall(ctx: CanvasRenderingContext2D | null, room: gameRoomClass) {
        if (ctx !== null) {

            ctx.beginPath();

            ctx.fillStyle = 'green';
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'green';

            ctx.arc(room.ball.x, room.ball.y, room.ball.radius, 0, Math.PI * 2);

            ctx.fill();

            ctx.shadowBlur = 0;

    }}

    // drawPlayers : dessine les joueurs suivant leurs positions
    function drawPlayers(ctx: CanvasRenderingContext2D | null, room: gameRoomClass) {
        if (ctx !== null) {
            ctx.fillStyle = 'red';
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'red';

            ctx.fillRect(room.players[0].x, room.players[0].y, room.players[0].width, room.players[0].height);

            ctx.fillStyle = 'blue';
            ctx.shadowColor = 'blue';

            ctx.fillRect(room.players[1].x, room.players[1].y, room.players[1].width, room.players[1].height);

            ctx.shadowBlur = 0;
    }}
        
    // drawScore : dessine les scores des deux joueurs
    function drawScore(ctx: CanvasRenderingContext2D | null, room: gameRoomClass) {
        if (ctx !== null) {

            ctx.textAlign = 'center';
            ctx.font = '50px Arial';

            ctx.fillStyle = 'red'
            ctx.fillText(room.players[0].score.toString() , canvas.width / 4 + canvas.width / 16, canvas.height / 10);
            
            ctx.fillStyle = 'blue'
            ctx.fillText(room.players[1].score.toString(), (canvas.width / 4 * 3) - canvas.width / 16, canvas.height / 10);

    }}

    // drawLimitsMove : dessine les limitations de mouveùent des deux joueurs (les deux lignes sous les joueurs)
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

    // drawLimitCamps : dessine la limitation des deux camps (la grande ligne en pointillé au centre du plateau)
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

    // drawText : dessine "Press ENTER to play" au centre de l'écran
    function drawText(ctx:CanvasRenderingContext2D | null, room: gameRoomClass) {
        if (ctx !== null) {

            ctx.font = '50px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText("Press ENTER to play !", canvas.width / 2, canvas.height / 2);

            
            ctx.fillStyle = (room.players[0].ready ? 'red' : '#220000');
            
            ctx.fillRect(canvas.width / 6 - canvas.width / 48, canvas.height / 8 * 5, canvas.width / 3, canvas.height / 8);
            
            ctx.fillStyle = (room.players[1].ready ? 'blue' : '#000022');
            
            ctx.fillRect(canvas.width / 6 * 3 + canvas.width / 48, canvas.height / 8 * 5, canvas.width / 3, canvas.height / 8);

    }}

    const utilsData = useSelector((state: RootState) => state.utils);
    
    utilsData.socket.removeAllListeners();

    function callRender(){
        utilsData.socket.emit('RENDER', props.roomID)
    }

    setInterval(callRender, 10);

    utilsData.socket.on('render', function(room: gameRoomClass) {

        var canvas = document.getElementById('pongBoard') as HTMLCanvasElement
        if (canvas !== null) {
            var ctx = canvas.getContext('2d')
            if (ctx !== null) {

                drawFont(ctx)

                drawLimitCamps(ctx)
                
                drawLimitsMove(ctx)

                drawScore(ctx, room)

                if (!room.players[0].ready || !room.players[1].ready) {
                    drawText(ctx, room)
                    return 
                }

                drawPlayers(ctx, room)
                    
                drawBall(ctx, room)
                    
    }}});

        function onKeyDown(e: any) {
            if (e.key === 'ArrowUp')
                utilsData.socket.emit('ARROW_UP', [props.roomID, true]);
            if (e.key === 'ArrowDown')
                utilsData.socket.emit('ARROW_DOWN', [props.roomID, true]);
            if (e.key === 'Enter')
                utilsData.socket.emit('ENTER', props.roomID);
        }
    
        // Lance la fonction onKeyDown chaque fois qu'une touche est appuyée
        document.addEventListener("keydown", onKeyDown);
    
        function onKeyUp(e: any) {
            if (e.key === 'ArrowUp')
                utilsData.socket.emit('ARROW_UP', [props.roomID, false]);
            if (e.key === 'ArrowDown')
                utilsData.socket.emit('ARROW_DOWN', [props.roomID, false]);
        }
    
        // Lance la fonction onKeyDown chaque fois qu'une touche est relachée
        document.addEventListener("keyup", onKeyUp);

    return (
        <div className='Font'>
            <Navbar/>
            <canvas
                id='pongBoard'
                className='pongBoard'
                height={canvas.height}
                width={canvas.width}
                />
        </div>
    );
  };
  
  export default PongPage;
  