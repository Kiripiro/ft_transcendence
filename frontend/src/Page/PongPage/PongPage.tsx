import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './PongPage.css';

// position des joueurs en %
var posPlayer1 : number = 50;

const Players=() => {


    function onKeyDown(e: any) {
        if (e.key === 'ArrowUp')
            if (posPlayer1 > 8)
                posPlayer1--;
        if (e.key === 'ArrowDown')
            if (posPlayer1 < 92)
                posPlayer1++;

        var player1:any = document.getElementById('player1');
        if (player1 !== null)
            player1.style.top= "calc(" + posPlayer1.toString() + "% - 8%)";
    }


    document.addEventListener("keydown", onKeyDown);



    return (
        <>
            <div className="player1" id="player1"></div>
            <div className="player2" id="player2"></div>
        </>
    )
}

const PongPage=() => {


    return (
        <div className='Font'>
            <Navbar/>
            <div className="pongBoard">
                <div className="limitPlayer1"></div>
                <div className="limitCamps"></div>
                <div className="limitPlayer2"></div>
                <Players/>
            </div>
        </div>
    );
  };

  export default PongPage;
