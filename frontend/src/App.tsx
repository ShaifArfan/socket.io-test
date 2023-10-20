import { useEffect, useState } from 'react';
import './App.css';
import { socket } from './socket.ts';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [data, setData] = useState({});
  const [string, setString] = useState('');

  // useEffect(() => {
  //   return () => {
  //     socket.off('get-string', listener);
  //   };
  // }, [string]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onGetString(data) {
      console.log(data);
      setString(data);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('get-string', onGetString);
    // socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('get-string', onGetString);
      // socket.off('foo', onFooEvent);
    };
  }, []);
  return (
    <>
      <h1>Socket Test</h1>
      <p>{socket.id}</p>
      {data && <p>Data: {JSON.stringify(data)}</p>}
      <p>{string}</p>
      <input
        type="text"
        value={string}
        onChange={(v) => {
          setString(v.currentTarget.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          socket.emit('set-string', string);
        }}
      >
        pass
      </button>
      {/* <button
        onClick={() => {
          socket.on('get-string', (data) => {
            console.log(data);
            setData(data);
          });
        }}
      >
        Get
      </button> */}
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
          console.log(socket.id);
          socket.emit('custom-event', 2, (res) => {
            console.log(res);
            setData(res);
          });
        }}
      >
        custom event
      </button>
      <button
        onClick={() => {
          socket.disconnect();
          // socket.emit('disconnect');
        }}
      >
        Disconnect IO
      </button>
    </>
  );
}

export default App;
