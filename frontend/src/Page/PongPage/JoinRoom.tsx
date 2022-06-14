import React, { useContext, useState } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import { useSelector } from "react-redux";
import { RootState } from '../../State';

const JoinRoom=(props: any) => {
    var tmp = 0;
    const [roomId, setRoomId] = useState('h');

    
    const utilsData = useSelector((state: RootState) => state.utils);
    
    utilsData.socket.removeAllListeners();
    
    function joinRoom(roomId: string) {
        
        console.log('roomId', roomId);

        if (!props.inRoom)
            utilsData.socket.emit('JOIN_ROOM', roomId);
    }
    
    utilsData.socket.on('joined', function() {
        props.setInRoom(true);
    });

    utilsData.socket.on('start', function() {
        props.setGameStart(true);
    });

    return (
        <div className='Font'>
            <Navbar/>
            <div className='joinRoom'>
                <input value={roomId} onChange={e => setRoomId(e.target.value)} placeholder="Enter a Room ID here..."/>
                <button type="button" onClick={() => joinRoom(roomId)}> {(!props.inRoom ? <>Join room</> : <>Find another player</>)} </button>
            </div>
        </div>
    );
};
  
  export default JoinRoom;
  