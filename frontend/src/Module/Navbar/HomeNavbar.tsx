import React from 'react';
import { useLocation } from 'react-router-dom';
import Play from './Buttons/Play';
import './HomeNavbar.css';

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
          <a href="notif"><i className="bi bi-bell"></i></a>
        </div>
      </nav>
    );
  };
  
export default Navbar;
  