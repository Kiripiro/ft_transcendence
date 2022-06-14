import React, { useContext, useState } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import { useSelector } from "react-redux";
import { RootState } from '../../State';

const JoinRoom=(props: any) => {
    const [inQueue, setInQueue] = useState(false);
    
    const utilsData = useSelector((state: RootState) => state.utils);
    
    utilsData.socket.removeAllListeners();
    
    function joinQueue() {
        utilsData.socket.emit('JOIN_QUEUE');
    }
    
    utilsData.socket.on('joined', function() {
        setInQueue(true);
    });

    utilsData.socket.on('start', function() {
        props.setGameStart(true);
    });

    return (
        <div className='Font'>
            <Navbar/>
            <div className='joinQueue'>
                <button type="button" onClick={() => joinQueue()}> {inQueue ? <>Loading...</> : <>Search Game...</>} </button>
            </div>
        </div>
    );
};
  
  export default JoinRoom;
  