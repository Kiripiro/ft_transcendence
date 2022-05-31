import React, { useState } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {

    return (
		<nav className="nav">

      <div className="littleDiv"></div>

      <div className="bigDiv">

            <a href="pong"><i className="bi bi-play"></i></a>
      </div>
            <div className="littleDiv">
              <a href="notif"><i className="bi bi-bell"></i></a>
            </div>
        </nav>

        // <div className="Navbar">
        //     <div class="d-flex align-items-center">
        //     </div>
        // </div>
    );
  };
  
  export default Navbar;
  