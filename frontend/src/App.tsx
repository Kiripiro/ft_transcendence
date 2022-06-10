import React, { useState } from 'react';
import HomePage from './Page/HomePage/HomePage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from './Page/NotFound/NotFound';
import PongPage from './Page/PongPage/PongPage';
import JoinRoom from './Page/PongPage/JoinRoom';

const App=() => {

    return (

        <BrowserRouter>
        
             <Routes>

                 <Route path='/' element={<Navigate to="/HomePage" replace />}/>

                 <Route path='/HomePage' element={<HomePage/>}/>
                 <Route path='/joinRoom' element={<JoinRoom/>}/>
                 <Route path='/pong' element={<PongPage/>}/>
                 <Route path='/NotFound' element={<NotFound/>}/>
                 <Route path='/*' element={<Navigate to="/NotFound" replace />}/>
                  
              </Routes>

         </BrowserRouter>

    );
  };
  
export default App;
  