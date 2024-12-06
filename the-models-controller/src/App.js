import React, { useState, useEffect } from 'react';

import './App.css';

import { socket } from './socket';

import PlayInterface from './components/PlayInterface';

function App() {
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);
  const [queueInfo, setQueueInfo] = useState({
    isQueued: false,
    position: 0,
    length: 0
  });
  const [roles, setRoles] = useState([]);
  
  useEffect(() => {
    function onConnect() {
      setIsSocketConnected(true);
    }

    function onDisconnect() {
      setIsSocketConnected(false);
    }

    function onQueueUpdate({position, total}) {
      console.log('event (receive): queue-update', position, total );
      setQueueInfo({
        isQueued: !!position,
        position: position,
        length: total
      });
    }

    function onBeginGame({roles}){
      setRoles( roles );
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('queue-update', onQueueUpdate);
    socket.on('begin-game', onBeginGame);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('queue-update', onQueueUpdate);
    };
  }, []);

  return <>
    <header className="app-header">
      <div>
        { isSocketConnected ? 'CONNECTED' : 'NOT CONNECTED' }
      </div>
      { ( !queueInfo.isQueued ) ? <div>
        <button onClick={() => { socket.emit( 'ready-to-play' )}}>
          READY - JOIN QUEUE
        </button>
      </div> : <div>
        In queue: {queueInfo.position} of {queueInfo.length}
      </div> }
    </header>
    <section className="app-interface">
      {( queueInfo.isQueued && queueInfo.position < 4 ) ? <PlayInterface roles={roles}/> : '' }
    </section>
  </>
}

export default App;
