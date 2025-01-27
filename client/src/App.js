import React, { useState, useEffect } from 'react';

import './App.css';

import { socket } from './socket.js';

import Backdrops from './shared/Backdrops.js';
import STATES, {STATES_getName, STATES_DEFAULT} from './shared/STATES.js';
import StateIdle from './components/StateIdle.js';
import StateAcceptInput from './components/StateAcceptInput.js';
import StateConstructStage from './components/StateConstructStage.js';
import StateInstructCharacters from './components/StateInstructCharacters.js';
import StatePlay from './components/StatePlay.js';
import StateConclude from './components/StateConclude.js';
import StateRestart from './components/StateRestart.js';

import Timer from './components/Timer.js';
import { GameContext, queueDefault } from './contexts/GameContext.js';

function App() {
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);
  const [queueInfo, setQueueInfo] = useState( queueDefault );
  const [isInLobby, setIsInLobby] = useState( false );
  const [backdrop,setBackdrop] = useState(false);
  //const [metaState, setMetaState] = useState( STATES.Idle );
  const [metaState, setMetaState] = useState( STATES_DEFAULT );
  const [timer, setTimer] = useState();
  const [isDebug, setIsDebug] = useState();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dbg = urlParams.get('debug');    
    setIsDebug( !!dbg );
  })
  
  useEffect(() => {
    function onConnect() {
      setIsSocketConnected(true);
    }

    function onDisconnect() {
      setIsSocketConnected(false);
    }

    function onSetMetaState( state ){
      console.log('set-meta-state', state )
      setMetaState( state );
    }

    function onSetBackdrop( {backdrop} ){
      console.log('set-backdrop', backdrop )
      setBackdrop( backdrop );
    }

    function onUpdateTimer( { name, value, total } ){
      setTimer({
        name,
        value,
        total
      })
    }

    function onQueueUpdate({ position, total }) {
      setQueueInfo({
        isQueued: !!position,
        position: position,
        length: total
      });
    }
    
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('set-meta-state', onSetMetaState );
    socket.on('update-timer', onUpdateTimer )
    socket.on('queue-update', onQueueUpdate);    
    socket.on('set-backdrop', onSetBackdrop);    
        
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('set-meta-state', onSetMetaState )
      socket.off('update-timer', onUpdateTimer )
      socket.off('queue-update', onQueueUpdate);
      socket.off('set-backdrop', onSetBackdrop); 
    };
  }, []);

  return <>
    <GameContext.Provider value={{ 
      isDebug,
      queueInfo, 
      setQueueInfo,
      backdrop,
      isInLobby, 
      setIsInLobby,
      timer
    }}>
      <aside className="app-meta">
        
        <div>
          {queueInfo.isQueued 
            ? `You are number ${queueInfo.position} of ${queueInfo.length}, ` 
            : `${queueInfo.length} people queued, `
          }
          {Math.floor( queueInfo.length / 3 )} plays to go.
        </div>
        { (timer && timer.value >= 0) ? <Timer name={timer.name} value={timer.value} total={timer.total}/> : ''}
      </aside>     
      { (metaState === STATES.Idle) ? <StateIdle /> : '' }
      { (metaState === STATES.AcceptInput) ? <StateAcceptInput /> : '' }
      { ( metaState === STATES.ConstructStage 
          || metaState === STATES.InstructCharacters 
          || metaState === STATES.Play 
          || metaState === STATES.Conclude 
        )
          ? <StatePlay /> 
          : '' 
      }
      { (metaState === STATES.Restart) ? <StateRestart /> : '' }
      <div className="fake-button button"></div>
    </GameContext.Provider>

    {(isDebug) ? <aside className="app-debug">
      <div>
        { isSocketConnected ? 'CONNECTED' : 'NOT CONNECTED' }
      </div>
      <div>
        State: {STATES_getName( metaState )}
      </div>
    </aside> : '' } 
  </>
}

export default App;
