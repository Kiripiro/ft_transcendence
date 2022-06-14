import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './State/index';
import { socket, SocketContext } from './Utils/SocketContext';


const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    {/* <SocketContext.Provider value={socket}> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </SocketContext.Provider> */}
  </React.StrictMode>,
);
