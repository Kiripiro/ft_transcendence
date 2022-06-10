import React, { useState } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';

import { useSelector } from "react-redux";
import { RootState } from '../../State';

const JoinRoom=() => {
    var tmp = 0;
    const [roomId, setRoomId] = useState('');

    const utilsData = useSelector((state: RootState) => state.utils);

    utilsData.socket.removeAllListeners();
    
    function joinRoom(roomId: string) {
        
        setRoomId("");

        console.log('roomId', roomId);
        utilsData.socket.emit('JOIN_ROOM', roomId);


        window.location.href = "http://localhost:3000/pong";

    }
    
    utilsData.socket.on('test', function() {
        console.log('test');
    });

    return (
        <div className='Font'>
            <Navbar/>
            <div className='joinRoom'>
            <input value={roomId} onChange={e => setRoomId(e.target.value)} placeholder="Room ID..."/>
            <button type="button" onClick={() => joinRoom(roomId)}>
                Send
            </button>
            </div>
        </div>
    );
};
  
  export default JoinRoom;
  