// MainApp.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default MainApp;
