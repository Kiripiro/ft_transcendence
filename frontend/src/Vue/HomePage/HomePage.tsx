import React, { useState } from 'react';
import Connect from '../../Connect';
import Navbar from '../Module/Navbar/Navbar';
import '../Vue.css';


const HomePage: React.FC = () => {

    return (
        <div className='Font'>
            <Navbar/>
            <Connect></Connect>
        </div>
        // <>hello</>
    );
  };
  
  export default HomePage;
  