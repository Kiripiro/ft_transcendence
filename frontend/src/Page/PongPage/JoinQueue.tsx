import React, { useContext, useState } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import { useSelector } from "react-redux";
import { RootState } from '../../State';

const JoinRoom=(props: any) => {
    const [inQueue, setInQueue] = useState(false);
    const [NotFound, setNotFound] = useState(false);

    
    const utilsData = useSelector((state: RootState) => state.utils);
    
    utilsData.socket.removeAllListeners();
    
    function joinQueue() {
        utilsData.socket.emit('JOIN_QUEUE');
    }
    
    function spectate() {
        utilsData.socket.emit('SPECTATE_CLIENT', props.specID);
    }
    
    utilsData.socket.on('clientNotFound', function() {
        props.setSpecID("");
        setNotFound(true);
    });

    utilsData.socket.on('joined', function() {
        setInQueue(true);
    });

    utilsData.socket.on('start', function(roomID: string) {
        props.setRoomID(roomID);
        props.setGameStart(true);
    });

    return (
        <div className='Font'>
              <Navbar/>
            <div className='joinQueue'>
                <button type="button" className='queueButton' onClick={() => joinQueue()}> {inQueue ? <>Loading...</> : <>Search Game...</>} </button>
            </div>
                <button type="button" className='spectateButton' onClick={() => spectate()}> Spectate </button>
                <input value={props.specID} onChange={e => props.setSpecID(e.target.value)} placeholder={NotFound ? 'Client not playing...' : 'Client To Spectate'} ></input>
        </div>
    );
};
  
  export default JoinRoom;
  