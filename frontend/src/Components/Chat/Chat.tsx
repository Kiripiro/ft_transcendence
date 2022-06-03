import React from 'react';
import io from 'socket.io-client';
import "./Chat.css"
import { createStore } from 'redux';

import Conversations from './Conversations';
import Room from './Room';
import ConnectedFriends from './ConnectedFriends';
import { Provider } from 'react-redux';


class Chat extends React.Component {

    render() {
      return (
            <div id='main'>
                <Conversations/>
                <Room/>
                <ConnectedFriends/>
            </div>
      )
    }
}
  

export default Chat;