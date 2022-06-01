import React, { useState } from 'react';
import io from 'socket.io-client';
import Navbar from '../Navbar/Navbar';
import '../../Page/assets/Font.css'
const socket = io('http://localhost:3000');

interface msgToSend {
  id: string;
  text: string;
}

const Connect: React.FC = () => {

  const [id, setId] = useState('');
  const [text, setText] = useState('Wsh la team');

  socket.removeAllListeners();
  socket.on('connect', function() {
    console.log('Connected');
    socket.emit('msgConnection');
  });
  socket.on('disconnect', function() {
    console.log('Disconnected');
  });
  socket.on('msgToClient', function(data) {
    if (data === 505)
      console.log('msgToServer', 'Msg bien reçu : 505');
    else
      console.log('msgToServer', data);
  });

  socket.on('ID', function(data) {
    console.log('ID received :', data);
    setId(data);
  });

  function validateInput() {
    return id.length > 0 && text.length > 0;
  }

  function sendMessage() {
    if (validateInput()) {
      const message: msgToSend = {
        id,
        text,
      };

      socket.emit('msgToServer', message);
      setText('');
    }
  }

  return (
    <div className="Font">
      <Navbar/>
      <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter message..."
          />
      <button type="button" onClick={() => sendMessage()}>
        Send
      </button>
    </div>
  );
};

export default Connect;
