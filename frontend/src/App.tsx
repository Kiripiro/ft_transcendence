import React, { useState } from 'react';
import HomePage from './Page/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connect from './Module/Connect/Connect';
import NotFound from './Page/NotFound/NotFound';

const App=() => {

    return (

        <BrowserRouter>
        
             <Routes>

                 <Route path='/' element={<HomePage/>}/>
                 <Route path='/connect' element={<Connect/>}/>
                 <Route path='/*' element={<NotFound/>}/>
                  
              </Routes>

         </BrowserRouter>

        // <HomePage></HomePage>

    );
  };
  
export default App;
  