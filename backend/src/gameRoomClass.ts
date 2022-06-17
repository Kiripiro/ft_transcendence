import { randomInt } from "crypto"

export {Canvas, Player, gameRoomClass}

class Canvas {
	width : number
    height : number

	constructor() {
		this.width = 800
		this.height = 600
	}
}

class Player {
	id: string

	width: number
	height: number
	
	down: boolean
	up: boolean

	expansion: boolean
	reduce: boolean
	
	x: number
	y: number
	
	speed: number

	score: number

	ready: boolean

	constructor(canvas: Canvas, id: string = "") {
		this.id = id

		this.width = canvas.width / 40
		this.height = canvas.height / 5

		this.down = false
		this.up = false

		this.expansion = false
		this.reduce = false

		this.x = canvas.width / 8 - this.width / 2
		this.y = canvas.height / 2 - this.height / 2

		this.speed = 1

		this.score = 0

		this.ready = false
	}

	resetPos(canvas: Canvas) {
		this.width = canvas.width / 40
		this.height = canvas.height / 5

		this.down = false
		this.up = false

		this.x = canvas.width / 8 - this.width / 2
		this.y = canvas.height / 2 - this.height / 2

		this.speed = 1
	}

  }

  class Ball {
	x : number
    y : number

    dx : number
    dy : number
    
	speed : number
    
	radius : number

	constructor(canvas: Canvas) {
		this.x = canvas.width / 2
		this.y = canvas.height / 2

		this.dx = -5
		this.dy = 0

		this.speed = 5

		this.radius = 10
	}

	reset(canvas: Canvas) {
		this.x = canvas.width / 2
		this.y = canvas.height / 2

		this.dx = -5
		this.dy = 0

		this.speed = 5

		this.radius = 10
	}
  }

  class gameRoomClass {
	  roomID: string

	  players: Array<Player>

	  canvas: Canvas

	  ball: Ball

	  constructor(roomId: string, creatorID: string) {
		this.roomID = roomId
		this.canvas = new Canvas()
		
		this.players = new Array()

		this.players.push(new Player(this.canvas, creatorID))
		this.players.push(new Player(this.canvas))
		
		this.ball = new Ball(this.canvas)
	  }

	  setOponnent(id: string) {
		this.players[1].id = id
		this.players[1].x = this.canvas.width / 8 * 7 - this.players[1].width / 2
	  }

	  movePlayer() {
		for (let i = 0; i < 2; i++) {
			if (this.players[i].up)
			  if (this.players[i].y >= this.players[i].speed)
				this.players[i].y -= this.players[i].speed;
			if (this.players[i].down)
			  if (this.players[i].y + this.players[i].height < this.canvas.height)
				this.players[i].y += this.players[i].speed;
			if (this.players[i].expansion)
				if (this.players[i].height < this.canvas.height)
					this.players[i].height++
			if (this.players[i].reduce)
				if (this.players[i].height > this.canvas.height / 6)
					this.players[i].height--
		  }
	  }

	/*
        checkCollisionPlayer1 : retourne 1 si la balle rentre en collision avec le joueur 2
                               retourne 0 si la balle ne rentre pas en collision avec le joueur 2
    */
    checkCollisionPlayer(id: number): boolean {
        var ptop = this.players[id].y;
        var pbottom = this.players[id].y + this.players[id].height;
        var pleft = this.players[id].x;
        var pright = this.players[id].x + this.players[id].width;
        
        var btop = this.ball.y - this.ball.radius;
        var bbottom = this.ball.y + this.ball.radius;
        var bleft = this.ball.x - this.ball.radius;
        var bright = this.ball.x + this.ball.radius;
        
        return pleft < bright && ptop < bbottom && pright > bleft && pbottom > btop;
    }


	  moveBall() {

		    // si la balle touche le camps du joueur 1 : augmente le score du joueur 2 et redémare le jeu
		    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius ) {
		        this.players[0].score++;
				this.resetAllPos()
				this.players[0].ready = false
				this.players[1].ready = false
				return
		    }
	
		    // si la balle touche le camps du joueur 2 : augmente le score du joueur 1 et redémare le jeu
		    if (this.ball.x + this.ball.dx < this.ball.radius) {
				this.players[1].score++;
				this.resetAllPos()
				this.players[0].ready = false
				this.players[1].ready = false
				return
		    }
	
		    // si la balle touche le mur du haut ou le mur du bas : rebondis
		    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius || this.ball.y + this.ball.dy < this.ball.radius) {
		        this.ball.dy = 0 - this.ball.dy;
		    }
	
		    // check des collisions avec le joueur 1
			for (let i = 0; i < 2; i++)
		    if (this.checkCollisionPlayer(i)) {
	
		        // ou la balle touche le player 1
		        let collidePoint = (this.ball.y - (this.players[i].y + this.players[i].height / 2));
	
		        // changement du point de collision pour un chiffre en -1 et 1
		        collidePoint = collidePoint / (this.players[i].height/2);
	
		        // nouvel angle de la balle suivant le point de collision
		        let angleRad = (Math.PI/4) * collidePoint;
	
		        // nouvelle direction de la balle suivant le nouvel angle
		        let direction = (this.ball.x + this.ball.radius < this.canvas.width/2) ? 1 : -1;
	
		        // donne les nouvelles direction à la balle
		        this.ball.dx = direction * this.ball.speed * Math.cos(angleRad);
		        this.ball.dy = this.ball.speed * Math.sin(angleRad);
	
		        // augmente la vitesse de la balle à chaque contact avec un joueur
		        this.ball.speed += 0.1;
		    }
	
		    // bouge la balle
		    this.ball.x += this.ball.dx;
		    this.ball.y += this.ball.dy;
		}

		ready(): boolean {
			return this.players[0].ready && this.players[1].ready
		}

		resetAllPos() {
			this.ball.reset(this.canvas)
			for (let i = 0; i < 2; i++)
				this.players[i].resetPos(this.canvas);
			this.players[1].x = this.canvas.width / 8 * 7 - this.players[1].width / 2
		}

		win(): boolean {
			return (this.players[0].score == 5 || this.players[1].score == 5)
		}
  }
