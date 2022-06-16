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
	
	x: number
	y: number
	
	speed: number

	score: number

	constructor(canvas: Canvas, id: string | null) {
		this.id = id

		this.width = canvas.width / 40
		this.height = canvas.height / 40

		this.down = false
		this.up = false
		
		this.x = canvas.width / 8 - this.width / 2;
		if (!id)
			this.x = canvas.width / 8 * 7 - this.width / 2;

		this.y = canvas.height / 2 - this.height / 2

		this.speed = 1
	}
  }

  class gameRoomClass {
	  roomID: string

	  players: [Player]
	  canvas: Canvas

	  constructor(roomID: string, player1: string) {
		this.roomID = roomID
		this.canvas = new Canvas()
		
		this.players.push(new Player(this.canvas, player1))
		this.players.push(new Player(this.canvas, null))
		
	  }
  }