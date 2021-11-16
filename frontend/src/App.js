import './App.css';
import Battleship from './components/battleship/Battleship';
import io from "socket.io-client";
import React, { useState, useEffect } from 'react';

function App() {
const [socket, setsocket] = useState(null);
  useEffect(() => {
    if(socket===null){
      setsocket(io("http://localhost:8080"));
    }
  }, [socket]);

  return (
    <div className="App">
      <Battleship socket={socket}></Battleship>
    </div>
  );
}

export default App;
