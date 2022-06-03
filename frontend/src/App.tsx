import React, { useState } from 'react';
import HomePage from './Page/HomePage/HomePage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Connect from './Module/Connect/Connect';
import NotFound from './Page/NotFound/NotFound';
import PongPage from './Page/PongPage/PongPage';
import Chat from './Components/Chat/Chat';
import NoteReduxTests from './NoteReduxTests/NoteReduxTests';

const App=() => {

    return (

        <BrowserRouter>
        
             <Routes>

                 <Route path='/' element={<Navigate to="/HomePage" replace />}/>

                 <Route path='/HomePage' element={<HomePage/>}/>
                 <Route path='/pong' element={<PongPage/>}/>
                 <Route path='/Connect' element={<Connect/>}/>
                 <Route path='/Chat' element={<Chat/>}/>
                 <Route path='/ReduxTests' element={<NoteReduxTests/>}/>
                 <Route path='/NotFound' element={<NotFound/>}/>
                 <Route path='/*' element={<Navigate to="/NotFound" replace />}/>
                  
              </Routes>

         </BrowserRouter>

    );
  };
  
export default App;