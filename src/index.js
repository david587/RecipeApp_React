import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from "./context/ThemeContext"

ReactDOM.render(
  <React.StrictMode>

    {/* Wrap all of our components with a color prop , all of our components can acces color prop*/}
    <ThemeProvider>
    <App />
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
