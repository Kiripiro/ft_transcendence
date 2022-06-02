import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './Page/HomePage/HomePage';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { createRoot } from 'react-dom/client';


const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
