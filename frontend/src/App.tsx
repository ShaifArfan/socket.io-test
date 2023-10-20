import { useEffect, useState } from 'react';
import './App.css';
import { socket } from './socket.ts';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // function onFooEvent(value) {
    //   setFooEvents((previous) => [...previous, value]);
    // }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    // socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      // socket.off('foo', onFooEvent);
    };
  }, []);
  return (
    <>
      <h1>Socket Test</h1>
      <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
      <button
        onClick={() => {
          socket.connect();
          // setConnected(socket.connected);
        }}
      >
        Connect to io
      </button>
      <button
        onClick={() => {
          socket.disconnect();
        }}
      >
        Disconnect IO
      </button>
    </>
  );
}

export default App;
