import { rmSync } from 'fs';
import React, { useState, Component } from 'react';
import axios from 'axios'
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './HomePage.css'

class HomePage extends Component<{}, {friends: any[]}> {

    updateContent = () => {
        console.log('test');
    }

    render(){
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
                            <div className="friends-info" id='friendsInfo'>
                                <div className="friend-top">
                                    <h3>Friends</h3>
                                    <a onClick={this.updateContent}><i className="bi bi-search"></i></a>
                                </div>
                            </div>
                            <div className="chat"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  };
  
  export default HomePage;
  