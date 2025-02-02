import React, { useState, useEffect, useContext } from 'react';
import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';

import PlayInterface from './PlayInterface.js';
import STATES from '../shared/STATES.js';
import { GameContext } from '../contexts/GameContext.js';

function StateAcceptInput({ queue }) {
  console.log(useContext(GameContext));
  const {queueInfo, setQueueInfo, backdrop, isInLobby, setIsInLobby} = useContext(GameContext);
  const [roles, setRoles] = useState([]);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    function onBeginGame({ roles }) {
      setRoles(roles);
      setIsInLobby( true );
    }

    function onChoicesComplete({ roles }) {
      setHasChosen(true);
    }

    function onLobbyClosed() {
      setQueueInfo({
        isQueued: false,
        position: 0,
        length: queueInfo.length
      })
    }

    
    socket.on('begin-game', onBeginGame);
    socket.on('choices-complete', onChoicesComplete);
    socket.on('lobby-closed', onLobbyClosed);

    return () => {      
      socket.off('begin-game', onBeginGame);
      socket.off('choices-complete', onChoicesComplete);
      socket.off('lobby-closed', onLobbyClosed);
    };
  }, []);

  return <WrapperForStates>
    <section className="app-interface">
      {( isInLobby ) 
        ? 
          <PlayInterface 
            roles={roles}
            active={ !hasChosen }
            onComplete={(choices) => {
              socket.emit('choices-complete', choices );
            }}
          /> 
        : 
          '' 
      }
    </section>
  </WrapperForStates>
}

export default StateAcceptInput;