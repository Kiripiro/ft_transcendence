import Navbar from "../../Module/Navbar/Navbar";

import './CSS/CreateMap/Div.css'
import './CSS/CreateMap/Canvas.css'
import './CSS/Utils.css'
import { gameRoomClass } from "./gameRoomClass";
import { useEffect, useState } from "react";

var canvas = {
    "width": 800,
    "height": 600
}

const CreateMap=(props: any) => {

	const [room] = useState(new gameRoomClass("", "", "custom"));

    room.setOponnent("")

    function resetCanvas(ctx: CanvasRenderingContext2D) {
        if (ctx != null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    function drawFont(ctx: CanvasRenderingContext2D | null) {
        if (ctx !== null) {

            ctx.fillStyle = room.map.mapColor;

            ctx.fillRect(0, 0, canvas.width, canvas.height);

        }
    }

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
        }
    }

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

        }
    }

    function drawObstacle(ctx: CanvasRenderingContext2D | null, room: gameRoomClass) {
        if (ctx !== null) {

            
            for (let index = 0; index < room.map.obstacles.length; index++) {
                const element = room.map.obstacles[index];

                ctx.fillStyle = element.color;

                ctx.fillRect(element.x, element.y, element.width, element.height);
            }
        }
    }

    function drawScore(ctx: CanvasRenderingContext2D | null, room: gameRoomClass) {
        if (ctx !== null) {

            ctx.textAlign = 'center';
            ctx.font = '50px Arial';

            ctx.fillStyle = 'red'
            ctx.fillText(room.players[0].score.toString(), canvas.width / 4 + canvas.width / 16, canvas.height / 10);

            ctx.fillStyle = 'blue'
            ctx.fillText(room.players[1].score.toString(), (canvas.width / 4 * 3) - canvas.width / 16, canvas.height / 10);

        }
    }

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
        }
    }

    const [nbObstacle, setNbObstacle] = useState(0)

	useEffect(() => {

        setInputValue()

        for (let index = 0; index < room.map.obstacles.length; index++) {
            if (lastObstacleID == room.map.obstacles[index].id)
                room.map.obstacles[index].color = 'gray'
            if (actualObstacleID == room.map.obstacles[index].id)
                room.map.obstacles[index].color = 'red'
        }

        var canvas = document.getElementById('canvas') as HTMLCanvasElement
        if (canvas !== null) {
            var ctx = canvas.getContext('2d')
            if (ctx !== null) {

                drawFont(ctx)

                drawLimitCamps(ctx)
             
                drawLimitsMove(ctx)
                
                drawObstacle(ctx, room)

                drawScore(ctx, room)
                
                drawPlayers(ctx, room)

                console.log('actualID', actualObstacleID)
            }
        }
    })

    function setInputValue() {
        for (let index = 0; index < room.map.obstacles.length; index++) {
            if (actualObstacleID == room.map.obstacles[index].id) {
                setXInput(room.map.obstacles[index].x)
                setYInput(room.map.obstacles[index].y)
                setWidthInput(room.map.obstacles[index].width)
                setHeightInput(room.map.obstacles[index].height)
            }
        }
    }

    const [lastObstacleID, setlastObstacleID] = useState(0);
    const [actualObstacleID, setActualObstacleID] = useState(0);
    const [xInput, setXInput] = useState(0);
    const [yInput, setYInput] = useState(0);
    const [widthInput, setWidthInput] = useState(0);
    const [heightInput, setHeightInput] = useState(0);

    function handleCanvasClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        var canvas = document.getElementById('canvas') as HTMLCanvasElement
        if (canvas != null) {
            var bound = canvas.getBoundingClientRect()
            let cursorX = (event.clientX - bound.left) / (bound.right - bound.left) * canvas.width
            let cursorY = (event.clientY - bound.top) / (bound.bottom - bound.top) * canvas.height

            for (let index = 0; index < room.map.obstacles.length; index++) {
                if (room.map.obstacles[index].x < cursorX && room.map.obstacles[index].x + room.map.obstacles[index].width > cursorX && room.map.obstacles[index].y < cursorY && room.map.obstacles[index].y + room.map.obstacles[index].height > cursorY) {
                    if (actualObstacleID != room.map.obstacles[index].id) {
                        setlastObstacleID(actualObstacleID)
                        setActualObstacleID(room.map.obstacles[index].id)
                    }
                }
            }
        }
    }

    return (
        <div className='Font'>
			<Navbar/>
			<main>
				<div className="canvasDiv">
					<canvas
                	    id='canvas'
                	    className='createMapCanvas'
                	    height={canvas.height}
                	    width={canvas.width}
                        onClick={handleCanvasClick}
                	/>
				</div>
				<div className="parameterDiv">
                    <button type="button" className='' onClick={async () => {
                        
                        setlastObstacleID(actualObstacleID)

                        room.map.addObstacle('red', actualObstacleID ? 100 : 50, 50, 50, 50, nbObstacle + 1)
                        setActualObstacleID(nbObstacle + 1)
                        
                        setNbObstacle(nbObstacle + 1)
                        
                    }}> Add obstacle </button>
                    <input
                        className=''
                        type="range"
                        value={xInput}
                        min='0'
                        max={canvas.width - 1}
                        onChange={e => {
                            for (let index = 0; index < room.map.obstacles.length; index++)
                                if (actualObstacleID == room.map.obstacles[index].id)
                                    room.map.obstacles[index].x = Number(e.target.value)
                            setXInput(Number(e.target.value))
                        }}>
                    </input>
                    <input
                        className=''
                        type="range"
                        value={yInput}
                        min='0'
                        max={canvas.height - 1}
                        onChange={e => {
                            for (let index = 0; index < room.map.obstacles.length; index++)
                                if (actualObstacleID == room.map.obstacles[index].id)
                                    room.map.obstacles[index].y = Number(e.target.value)
                            setYInput(Number(e.target.value))
                        }}>
                    </input>
                    <input
                        className=''
                        type="range"
                        value={widthInput}
                        min='0'
                        max={canvas.width}
                        onChange={e => {
                            for (let index = 0; index < room.map.obstacles.length; index++)
                                if (actualObstacleID == room.map.obstacles[index].id)
                                    room.map.obstacles[index].width = Number(e.target.value)
                            setWidthInput(Number(e.target.value))
                        }}>
                    </input>
                    <input
                        className=''
                        type="range"
                        value={heightInput}
                        min='0'
                        max={canvas.height}
                        onChange={e => {
                            for (let index = 0; index < room.map.obstacles.length; index++)
                                if (actualObstacleID == room.map.obstacles[index].id)
                                    room.map.obstacles[index].height = Number(e.target.value)
                            setHeightInput(Number(e.target.value))
                        }}>
                    </input>
                </div>
			</main>
		</div>
	);
}
export default CreateMap;