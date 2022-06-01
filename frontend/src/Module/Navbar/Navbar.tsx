import React from 'react';
import Bell from './Buttons/Bell';
import Play from './Buttons/Play';
import Home from './Buttons/Home';
import './Navbar.css';

const Navbar=() => {
    return (
  		<nav className="nav">
        <div className="littleDiv">
        </div>
        <div className="bigDiv">
            <Home/>
            <Play/>
        </div>
        <div className="littleDiv">
          <Bell/>
        </div>
      </nav>
    );
  };
  
export default Navbar;
  