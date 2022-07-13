
import { spawn } from "child_process"
import { randomInt } from "crypto"

export { Canvas, Player, gameRoomClass }

const STILL = 0
const MOTION = 1
const EXPAND = 2

class Canvas {
	width: number
	height: number

	constructor() {
		this.width = 800
		this.height = 600
	}
}

class Player {
	id: string

	connected: boolean

	width: number
	height: number

	down: boolean
	up: boolean

	cheat: boolean

	expansion: boolean
	reduce: boolean

	x: number
	y: number

	speed: number

	score: number

	ready: boolean

	constructor(canvas: Canvas, id: string = "") {
		this.id = id

		this.connected = false

		this.width = canvas.width / 40
		this.height = canvas.height / 5

		this.down = false
		this.up = false

		this.cheat = false

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

function random(min: number, max: number): number {
	return (Math.floor(Math.random() * (max - min + 1)) + min)
}

class Spectator {
	id: string

	pannel: boolean

	x: number
	y: number

	constructor(id: string) {
		this.id = id

		this.pannel = false

		this.x = 0
		this.y = 0

	}
}

class Ball {
	x: number
	y: number

	dx: number
	dy: number

	speed: number

	radius: number

	particle_x: Array<number>
	particle_y: Array<number>

	constructor(canvas: Canvas) {
		this.x = canvas.width / 2
		this.y = canvas.height / 2

		this.dx = random(0, 1) ? -1 : 1

		this.x += this.dx * 100

		this.dy = 0

		this.speed = 1

		this.radius = 10

		this.particle_x = new Array()
		this.particle_y = new Array()
	}

	reset(canvas: Canvas) {
		this.x = canvas.width / 2
		this.y = canvas.height / 2

		this.dx = random(0, 1) ? -1 : 1
		this.dy = 0

		this.speed = 1

		this.radius = 10

		this.particle_x.slice(0, this.particle_x.length)
		this.particle_y.slice(0, this.particle_y.length)
	}

	addParticles(x: number, y: number) {
		this.particle_x.unshift(x)
		this.particle_y.unshift(y)
	}
}

class Obstacle {
	color: string

	initialX: number
	initialY: number

	x: number
	y: number
	
	width: number
	height: number

	state: number

	speed: number

	constructor(color: string, x: number, y: number, width: number, height: number, state: number, speed: number = 0) {
		this.color = color
		
		this.width = width
		this.height = height
		
		this.x = x
		this.initialX = x
		this.initialY = y
		this.y = y

		this.state = state

		this.speed = speed
	}
}

class Map {

	mapColor: string

	obstacles: Array<Obstacle>

	constructor(gameMap: string, canvas: Canvas) {

		this.obstacles = new Array()

		if (gameMap == 'map1')
			this.mapColor = 'black'
		else {
			this.mapColor = '#19022b'

			this.obstacles.push(new Obstacle("#4B4B4B", canvas.width / 2 - 10, canvas.height / 2 - 30, 20, 60, MOTION, 0.4))
		}
	}

	resetObstaclesPos() {
		for (let index = 0; index < this.obstacles.length; index++) {
			this.obstacles[index].x = this.obstacles[index].initialX
			this.obstacles[index].y = this.obstacles[index].initialY			
		}
	}

}

class gameRoomClass {
	roomID: string
	
	map: Map

	players: Array<Player>

	spectate: Array<Spectator>

	canvas: Canvas

	ball: Ball

	constructor(roomId: string, creatorID: string, gameMap: string) {
		this.roomID = roomId
		
		this.canvas = new Canvas()
		
		this.map = new Map(gameMap, this.canvas)
		
		this.players = new Array()

		this.spectate = new Array()

		this.players.push(new Player(this.canvas, creatorID))
		this.players.push(new Player(this.canvas))

		this.ball = new Ball(this.canvas)
	}

	setOponnent(id: string) {
		this.players[1].id = id
		this.players[1].connected = true
		this.players[1].x = this.canvas.width / 8 * 7 - this.players[1].width / 2
	}

	checkCollisionSpectator(id: string, x: number, y: number): boolean {
		var ptop = y - 20
		var pbottom = y + 20
		var pleft = x - 20
		var pright = x + 20

		for (let i = 0; i < this.spectate.length; i++) {
			if (id != this.spectate[i].id) {
				var btop = this.spectate[i].y - 20
				var bbottom = this.spectate[i].y + 20
				var bleft = this.spectate[i].x - 20
				var bright = this.spectate[i].x + 20

				if (pleft < bright && ptop < bbottom && pright > bleft && pbottom > btop)
					return true
			}
		}

		return false
	}

	addSpectator(id: string) {
		this.spectate.push(new Spectator(id))

		for (let i = 0; i < this.spectate.length; i++) {
			if (this.spectate[i].id == id) {
				if (random(0, 1))
					this.spectate[i].pannel = true
				else
					this.spectate[i].pannel = false

				this.spectate[i].x = random(50, 350)
				this.spectate[i].y = random(50, 950)

				while (this.checkCollisionSpectator(id, this.spectate[i].x, this.spectate[i].y)) {
					this.spectate[i].x = random(50, 350)
					this.spectate[i].y = random(50, 950)
				}
			}
		}
	}

	movePlayer() {
		for (let i = 0; i < 2; i++) {
			if (this.players[i].up)
				if (this.players[i].y >= this.players[i].speed)
					this.players[i].y -= this.players[i].speed
			if (this.players[i].down)
				if (this.players[i].y + this.players[i].height < this.canvas.height)
					this.players[i].y += this.players[i].speed
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
		var ptop = this.players[id].y
		var pbottom = this.players[id].y + this.players[id].height
		var pleft = this.players[id].x
		var pright = this.players[id].x + this.players[id].width

		var btop = this.ball.y - this.ball.radius
		var bbottom = this.ball.y + this.ball.radius
		var bleft = this.ball.x - this.ball.radius
		var bright = this.ball.x + this.ball.radius

		return pleft < bright && ptop < bbottom && pright > bleft && pbottom > btop
	}

	checkCollisionObstacle(obstacle: Obstacle): boolean {

		var ptop = obstacle.y
		var pbottom = obstacle.y + obstacle.height
		var pleft = obstacle.x
		var pright = obstacle.x + obstacle.width

		var btop = this.ball.y - this.ball.radius
		var bbottom = this.ball.y + this.ball.radius
		var bleft = this.ball.x - this.ball.radius
		var bright = this.ball.x + this.ball.radius

		return pleft < bright && ptop < bbottom && pright > bleft && pbottom > btop
	}

	moveBall() {

		// si la balle touche le camps du joueur 1 : augmente le score du joueur 2 et redémare le jeu
		if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius) {
			this.players[0].score++
			this.resetAllPos()
			this.players[0].ready = false
			this.players[1].ready = false
			return
		}

		// si la balle touche le camps du joueur 2 : augmente le score du joueur 1 et redémare le jeu
		if (this.ball.x + this.ball.dx < this.ball.radius) {
			this.players[1].score++
			this.resetAllPos()
			this.players[0].ready = false
			this.players[1].ready = false
			return
		}

		// si la balle touche le mur du haut ou le mur du bas : rebondis
		if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius || this.ball.y + this.ball.dy < this.ball.radius) {
			this.ball.dy = 0 - this.ball.dy
		}

		// check des collisions avec les joueurs
		for (let i = 0; i < 2; i++)
			if (this.checkCollisionPlayer(i)) {

				// ou la balle touche le player 1
				let collidePoint = (this.ball.y - (this.players[i].y + this.players[i].height / 2))

				// changement du point de collision pour un chiffre en -1 et 1
				collidePoint = collidePoint / (this.players[i].height / 2)

				// nouvel angle de la balle suivant le point de collision
				let angleRad = (Math.PI / 4) * collidePoint

				// nouvelle direction de la balle suivant le nouvel angle
				let direction = (this.ball.x + this.ball.radius < this.canvas.width / 2) ? 1 : -1

				// donne les nouvelles direction à la balle
				this.ball.dx = direction * this.ball.speed * Math.cos(angleRad)
				this.ball.dy = this.ball.speed * Math.sin(angleRad)

				if (this.ball.speed < 2) {
					this.ball.speed += 0.1
					this.players[0].speed += 0.1
					this.players[1].speed += 0.1
				}
				// augmente la vitesse de la balle à chaque contact avec un joueur
			}

		for (let index = 0; index < this.map.obstacles.length; index++) {

			if (this.checkCollisionObstacle(this.map.obstacles[index])) {
				
				if (this.ball.x - this.ball.radius < this.map.obstacles[index].x || 
					this.ball.x + this.ball.radius > this.map.obstacles[index].x + this.map.obstacles[index].width)
					this.ball.dx *= -1
				if (this.ball.y - this.ball.radius < this.map.obstacles[index].y || 
					this.ball.y + this.ball.radius > this.map.obstacles[index].y + this.map.obstacles[index].height)
					this.ball.dy *= -1

			}
		}
			
		// bouge la balle
		this.ball.x += this.ball.dx
		this.ball.y += this.ball.dy
	}

	moveObstacle() {
		for (let index = 0; index < this.map.obstacles.length; index++) {
			if (this.map.obstacles[index].state == MOTION) {

				if (this.map.obstacles[index].y + this.map.obstacles[index].height / 2 < this.ball.y)
					if (this.map.obstacles[index].y + this.map.obstacles[index].height < this.canvas.height - this.ball.radius * 2 - this.map.obstacles[index].speed)
					this.map.obstacles[index].y += this.map.obstacles[index].speed
				if (this.map.obstacles[index].y + this.map.obstacles[index].height / 2 > this.ball.y)
					if (this.map.obstacles[index].y > this.ball.radius * 2 + this.map.obstacles[index].speed)
					this.map.obstacles[index].y -= this.map.obstacles[index].speed
			}
		}
	}

	ready(): boolean {
		return this.players[0].ready && this.players[1].ready
	}

	resetAllPos() {
		this.ball.reset(this.canvas)

		if (this.players[0].score > this.players[1].score)
			this.ball.dx = 1
		else if (this.players[0].score < this.players[1].score)
			this.ball.dx = -1
		else
			this.ball.dx = random(0, 1) ? -1 : 1
		
		this.ball.x += this.ball.dx * 100

		for (let i = 0; i < 2; i++)
			this.players[i].resetPos(this.canvas)
		
		this.players[1].x = this.canvas.width / 8 * 7 - this.players[1].width / 2

		this.map.resetObstaclesPos()
	}

	win(): boolean {
		return (this.players[0].score == 3 || this.players[1].score == 3)
	}
}