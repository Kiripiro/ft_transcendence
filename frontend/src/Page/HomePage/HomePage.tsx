import React, { useState } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './HomePage.css'


const HomePage=() => {

    return (
        <div className='Font'>
            <div className="horizontal">
                <Navbar/>
                <div className="vertical">
                    <main>
                        <div className="match-history">
                            <h3>Match History</h3>
                        </div>
                        <div className="stat">
                            <div className="rank"></div>
                            <div className="graph"></div>
                        </div>
                    </main>
                    <div className="info">
                        <div className="user-info">
                            <div className="user-picture"></div>
                            <p className="username">Username</p>
                            <p className="level">Level</p>
                        </div>
                        <div className="friends-info">
                            <h3>Friends</h3>
                        </div>
                        <div className="chat"></div>
                    </div>
            </div>
	</div>
        </div>
    );
  };
  
  export default HomePage;
  