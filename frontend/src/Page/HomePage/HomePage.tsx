import React, { Component } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './HomePage.css';
import FriendList from './FriendList';
import { AddFriendHook, FriendListHook } from './Hooks';
import AddFriend from './AddFriend';

const HomePage = (props: any) => {
    const [isFriendList, setFriendList] = FriendListHook(true);
    const [isAddFriend, setAddFriend] = AddFriendHook(false);

    return (
        <div className='Font'>
            <div className="horizontal">
                <Navbar/>
                <div className="vertical">
                    <main>
                        <div className="match-history">
                            <h3>Match History</h3>
                            <div className='game game-win'></div>
                            <div className='game game-win'></div>
                            <div className='game game-lose'></div>
                            <div className='game game-lose'></div>
                            <div className='game game-win'></div>
                            <div className='game game-lose'></div>
                            <div className='game game-lose'></div>
                            <div className='game game-win'></div>
                            <div className='game game-lose'></div>
                            <div className='game game-win'></div>
                            <div className='game game-win'></div>
                            <div className='game game-lose'></div>
                        </div>
                        <div className="stat">
                            <div className="rank"></div>
                            <div className="graph"></div>
                        </div>
                    </main>
                    <div className="info">
                        <div className="user-info">
                            <div className="user-picture"></div>
                            <p className="username">username</p>
                            <p className="level">lvl</p>
                        </div>
                        <div className="friends-info">
                            {isFriendList && <FriendList />}
                            {isAddFriend && <AddFriend />}
                        </div>
                        <div className="chat"></div>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default HomePage;
  