import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Module/Navbar/home';
import Navbar from './Module/Navbar/Navbar';

ReactDOM.render(
  <React.StrictMode>
    <Navbar>
    </Navbar>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
