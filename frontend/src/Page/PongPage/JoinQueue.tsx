import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import { useSelector } from "react-redux";
import { RootState } from '../../State';
import imageMap1 from "./map1.png";
import imageMap2 from "./map2.png";

const JoinRoom=(props: any) => {
    const [inQueue, setInQueue] = useState(false);
    const [NotFound, setNotFound] = useState(false);
    
    const utilsData = useSelector((state: RootState) => state.utils);
    
    utilsData.socket.removeAllListeners();
    
    function joinQueue() {
        if (!props.gameMap)
            return
        utilsData.socket.emit('JOIN_QUEUE', props.gameMap);
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

    function openMapModal() {
        var mapModal = document.getElementById('mapModal')

        if (mapModal !== null) {
            mapModal.style.display = "block"
        }
    }

    async function chooseMap(map: string) {
        props.setGameMap(map)
    }

    useEffect(() => {
        var map1Button = document.getElementById('map1Button')
        var map2Button = document.getElementById('map2Button')

        if (props.gameMap == "map1") {
            if (map1Button !== null)
                map1Button.style.backgroundColor = "green"
        } else {
            if (map1Button !== null)
                map1Button.style.backgroundColor = "#7d0000"
        }
        if (props.gameMap == "map2") {
            if (map2Button !== null)
                map2Button.style.backgroundColor = "green"
        } else {
            if (map2Button !== null)
                map2Button.style.backgroundColor = "#7d0000"
        }

        var button = document.getElementById('queueButton')
        if (!props.gameMap) {
            if (button !== null) {
                button.textContent = "Select map before..."
                return
            }
        }
        else if (!inQueue){
            if (button !== null) {
                button.textContent = "Join queue..."
                return
            }
        }
        else {
            if (button !== null) {
                button.textContent = "Loading..."
                return
            }
        }

    });

    return (
        <div className='Font'>
              <Navbar/>
            <div id="mapModal" className="modal">
                <div className="modal-content">
                    <div className='blocksContainer'>
                        <button type="button" id='map1Button' className='mapButton' onClick={() => {chooseMap("map1")}}>
                            <img src={imageMap1} />
                        </button>
                        <button type="button" id='map2Button' className='mapButton' onClick={() => {chooseMap("map2")}}>
                            <img src={imageMap2} />
                        </button>
                    </div>
                    <div className='blocksContainer'>
                        <button type="button" className='saveButton' onClick={() => {var mapModal = document.getElementById('mapModal'); if (mapModal !== null) {mapModal.style.display = "none"}}}> Save </button>
                    </div>
                </div>
            </div>
            <div className='blocksContainer'>
                <button type="button" className='chooseMapButton' onClick={() => openMapModal()}> Select map </button>
            </div>
            <div className='joinQueue'>
                <button id='queueButton' type="button" className='queueButton' onClick={() => joinQueue()}> </button>
            </div>
                <button type="button" className='spectateButton' onClick={() => spectate()}> Spectate </button>
                <input value={props.specID} onChange={e => props.setSpecID(e.target.value)} placeholder={NotFound ? 'Client not playing...' : 'Client To Spectate'} ></input>
        </div>
    );
};
  
  export default JoinRoom;
  