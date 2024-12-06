import React, { useState, useEffect } from 'react';
import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';

import PlayInterface from './PlayInterface.js';
import STATES from '../shared/STATES.js';

function StateSelect() {
  const [queueInfo, setQueueInfo] = useState({
    isQueued: false,
    position: 0,
    length: 0
  });
  const [roles, setRoles] = useState([]);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    function onQueueUpdate({ position, total }) {
      setQueueInfo({
        isQueued: !!position,
        position: position,
        length: total
      });
    }

    function onBeginGame({ roles }) {
      setRoles(roles);
    }

    function onChoicesComplete({ roles }) {
      setHasChosen(true);
    }

    function onLobbyClosed() {
      setQueueInfo({
        isQueued: false,
        position: 0,
        length: 0
      })
    }

    socket.on('queue-update', onQueueUpdate);
    socket.on('begin-game', onBeginGame);
    socket.on('choices-complete', onChoicesComplete);
    socket.on('lobby-closed', onLobbyClosed);

    return () => {
      socket.off('queue-update', onQueueUpdate);
      socket.off('begin-game', onBeginGame);
      socket.off('choices-complete', onChoicesComplete);
      socket.off('lobby-closed', onLobbyClosed);
    };
  }, []);

  return <WrapperForStates>
    { ( !queueInfo.isQueued ) 
      ? 
        <div>
          <button onClick={() => { socket.emit( 'ready-to-play' )}}>
            READY - JOIN QUEUE
          </button>
        </div> 
      : 
        <div>
          In queue: {queueInfo.position} of {queueInfo.length}
        </div> 
    }
    <section className="app-interface">
      {( queueInfo.isQueued && queueInfo.position < 4 ) 
        ? 
          <PlayInterface 
            roles={roles}
            active={ !hasChosen }
            onSelect={( role, choice ) => {
              socket.emit('decision', {role,choice})
            }}
          /> 
        : 
          '' 
      }
    </section>
  </WrapperForStates>
}

export default StateSelect;