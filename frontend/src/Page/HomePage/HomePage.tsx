import React, { useState } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';


const HomePage=() => {

    return (
        <div className='Font'>
            <Navbar/>
            <a href="/connect"><button type="button" className="btn btn-info">Go to connect page</button></a>
        </div>
    );
  };
  
  export default HomePage;
  