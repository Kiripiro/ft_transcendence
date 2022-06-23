import HomePage from './Page/HomePage/HomePage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from './Page/NotFound/NotFound';
import PongPage from './Page/PongPage/PongPage';
import ChatPage from './Page/Chat/ChatPage';

const App=() => {

    return (

        <BrowserRouter>

             <Routes>

                 <Route path='/' element={<Navigate to="/HomePage" replace />}/>

                 <Route path='/HomePage' element={<HomePage/>}/>
                 <Route path='/pong' element={<PongPage/>}/>
                 <Route path='/NotFound' element={<NotFound/>}/>
                 <Route path='/Chat' element={<ChatPage/>}/>
                 <Route path='/*' element={<Navigate to="/NotFound" replace />}/>

              </Routes>

         </BrowserRouter>

    );
  };

export default App;
