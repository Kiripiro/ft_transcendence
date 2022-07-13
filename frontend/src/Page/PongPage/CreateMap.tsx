import Navbar from "../../Module/Navbar/Navbar";

import './CSS/CreateMap/Div.css'
import './CSS/CreateMap/Canvas.css'
import './CSS/Utils.css'
import { gameRoomClass } from "./gameRoomClass";

var canvas = {
    "width": 800,
    "height": 600
}

const CreateMap=(props: any) => {

	// var room = new gameRoomClass("")

	// function render() {

    //     var canvas = document.getElementById('canvas') as HTMLCanvasElement
    //     if (canvas !== null) {
    //         var ctx = canvas.getContext('2d')
    //         if (ctx !== null) {

    //             resetCanvas()

    //             drawFont(ctx, room)

    //             drawLimitCamps(ctx)
                
    //             drawLimitsMove(ctx)
                
    //             drawObstacle(ctx, room)

    //             drawScore(ctx, room)

    //             drawSpectator(room)

    //             if (room.players[0].score == 3 || room.players[1].score == 3) {
    //                 var modal = document.getElementById("myModal");
    //                 if (modal)
    //                     modal.style.display = "block";
    //                 var winnerHeader = document.getElementById("winnerHeader")
    //                 if (winnerHeader)
    //                     winnerHeader.innerHTML = (room.players[0].score > room.players[1].score ? room.players[0].id : room.players[1].id) + " as won the game !"
    //                 return;
    //             }

    //             if (!room.players[0].ready || !room.players[1].ready) {
    //                 drawText(ctx, room)
    //                 return
    //             }

    //             drawBallParticles(ctx, room)
                
    //             drawBall(ctx, room)
                
    //             drawPlayers(ctx, room)

    //         }
    //     }
    // }

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
                	/>
				</div>
				<div className="parameterDiv"></div>
			</main>
		</div>
	);
}
export default CreateMap;