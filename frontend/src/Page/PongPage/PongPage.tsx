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

const PongPage=() => {


    /*
        checkCollisionPlayer1 : retourne 1 si la balle rentre en collision avec le joueur 1
                               retourne 0 si la balle ne rentre pas en collision avec le joueur 1
    */
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


    /*
        checkCollisionPlayer1 : retourne 1 si la balle rentre en collision avec le joueur 2
                               retourne 0 si la balle ne rentre pas en collision avec le joueur 2
    */
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


    /*
        resetBallPos : reset la position de la balle au centre du plateau
                       reset la speed de la balle
                       reset la direction y a 0
                       reset la drection x suivant le gagnant acctuel
                            la balle partiras vers le perdant
                            si les deux joueurs on le même scrore, la direction est aléatoire
    */
    function resetBallPos() {
        Ball.x = canvas.width / 2;
        Ball.y = canvas.height / 2;

        Ball.speed = 3;
        Ball.dy = 0;

        if (Player1.score > Player2.score)
            Ball.dx = 2;
        else if (Player1.score < Player2.score)
           Ball.dx = -2;
        else
            Ball.dx = [-2,2][Math.random()*2|0];
    }

    /*
        resetPlayerPos : reset de la position des deux joueurs au centre du plateau
    */
    function resetPlayersPos() {
        Player1.x = canvas.width / 8 - Player1.width / 2;
        Player1.y = canvas.height / 2 - Player1.height / 2;
        Player2.x = canvas.width / 8 * 7 - Player2.width / 2;
        Player2.y = canvas.height / 2 - Player2.height / 2;
    }

    /*
        onKeyDown : vraiment besoin d'expliquer celui là ?
    */
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

    // Lance la fonction onKeyDown chaque fois qu'une touche est appuyée
    document.addEventListener("keydown", onKeyDown);

    /*
        onKeyUp : vraiment besoin d'expliquer celui là ?
    */
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

    // Lance la fonction onKeyUp chaque fois qu'une touche est relachée
    document.addEventListener("keyup", onKeyUp);

    /*
        moveBall : permet de calculer les mouvements de la balle
    */
    function moveBall() {

        // si la balle touche le camps du joueur 1 : augmente le score du joueur 2 et redémare le jeu
        if (Ball.x + Ball.dx > canvas.width - Ball.radius ) {
            Player1.score++;
            inPlay = false;
        }

        // si la balle touche le camps du joueur 2 : augmente le score du joueur 1 et redémare le jeu
        if (Ball.x + Ball.dx < Ball.radius) {
            Player2.score++;
            inPlay = false;
        }

        // si la balle touche le mur du haut ou le mur du bas : rebondis
        if (Ball.y + Ball.dy > canvas.height - Ball.radius || Ball.y + Ball.dy < Ball.radius) {
            Ball.dy = 0 - Ball.dy;
        }

        // check des collisions avec le joueur 1
        if (checkCollisionPlayer1()) {

            // ou la balle touche le player 1
            let collidePoint = (Ball.y - (Player1.y + Player1.height / 2));

            // changement du point de collision pour un chiffre en -1 et 1
            collidePoint = collidePoint / (Player1.height/2);

            // nouvel angle de la balle suivant le point de collision
            let angleRad = (Math.PI/4) * collidePoint;

            // nouvelle direction de la balle suivant le nouvel angle
            let direction = (Ball.x + Ball.radius < canvas.width/2) ? 1 : -1;

            // donne les nouvelles direction à la balle
            Ball.dx = direction * Ball.speed * Math.cos(angleRad);
            Ball.dy = Ball.speed * Math.sin(angleRad);

            // augmente la vitesse de la balle à chaque contact avec un joueur
            Ball.speed += 0.1;
        }

        // Voir au dessus
        if (checkCollisionPlayer2()) {
            let collidePoint = (Ball.y - (Player2.y + Player2.height / 2));

            collidePoint = collidePoint / (Player2.height/2);
            let angleRad = (Math.PI/4) * collidePoint;
            let direction = (Ball.x + Ball.radius < canvas.width/2) ? 1 : -1;
            Ball.dx = direction * Ball.speed * Math.cos(angleRad);
            Ball.dy = Ball.speed * Math.sin(angleRad);

            Ball.speed += 0.1;
        }

        // bouge la balle
        Ball.x += Ball.dx;
        Ball.y += Ball.dy;
    }

    // lance moveBall toute les 20ms
    setInterval(moveBall, 20);


    // movePlayers : change la positions des joueurs
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

    // lance movePlayers toute les 20ms
    setInterval(movePlayers, 15);


    // drawFont : desine le fond du jeu
    function drawFont(ctx: CanvasRenderingContext2D | null, color: string) {
        if (ctx !== null) {

            ctx.fillStyle = color;

            ctx.fillRect(0, 0, canvas.width, canvas.height);

    }}

    // drawBall : dessine la balle en fonction de sa position
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

    // drawPlayers : dessine les joueurs suivant leurs positions
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

    // drawScore : dessine les scores des deux joueurs
    function drawScore(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {

            ctx.textAlign = 'center';
            ctx.font = '50px Arial';

            ctx.fillStyle = 'red'
            ctx.fillText(Player1.score.toString(), canvas.width / 4 + canvas.width / 16, canvas.height / 10);

            ctx.fillStyle = 'blue'
            ctx.fillText(Player2.score.toString(), (canvas.width / 4 * 3) - canvas.width / 16, canvas.height / 10);

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
    function drawText(ctx:CanvasRenderingContext2D | null) {
        if (ctx !== null) {

            ctx.font = '50px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText("Press ENTER to play !", canvas.width / 2, canvas.height / 2);

    }}

    // refreshGame : redessine le nouvel affichage du jeu (nouvelles positions, nouveaux scores, etc...)
    function refreshGame(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {
            drawFont(ctx, "black");

            drawLimitsMove(ctx);

            drawLimitCamps(ctx);

            drawScore(ctx);

            drawPlayers(ctx);

            if (inPlay)
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
