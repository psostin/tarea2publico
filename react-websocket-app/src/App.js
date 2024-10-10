import logo from './logo.svg';
import './App.css';

import React from 'react';
import WebSocketComponent from './components/WebSocketComponent';
import MapComponent from './components/MapComponent';

const App = () => {
  return (
    <div className="App">
      
      <h1>React WebSocket Application</h1>
      <WebSocketComponent />
    </div>
  );
};

export default App;
