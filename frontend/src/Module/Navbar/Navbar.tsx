import React from 'react';
import Bell from './Buttons/Bell';
import Play from './Buttons/Play';
import './Navbar.css';

const Navbar=() => {
    return (
  		<nav className="nav">
        <div className="littleDiv">
          <a href="/"><i className="bi bi-house"></i></a>
        </div>
        <div className="bigDiv">
            <Play/>
        </div>
        <div className="littleDiv">
          <Bell/>
        </div>
      </nav>
    );
  };
  
export default Navbar;
  