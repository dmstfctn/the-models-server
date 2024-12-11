import React, { useState, useEffect } from 'react';

import './App.css';

import { socket } from './socket.js';

import STATES, {STATES_getName} from './shared/STATES.js';
import StateIdle from './components/StateIdle.js';
import StateAcceptInput from './components/StateAcceptInput.js';
import StateConstructStage from './components/StateConstructStage.js';
import StateInstructCharacters from './components/StateInstructCharacters.js';
import StatePlay from './components/StatePlay.js';
import StateConclude from './components/StateConclude.js';
import StateRestart from './components/StateRestart.js';

import Timer from './components/Timer.js';

function App() {
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);
  const [metaState, setMetaState] = useState( STATES.Idle );
  const [timer, setTimer] = useState();
  
  
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

    function onUpdateTimer( { name, value, total } ){
      setTimer({
        name,
        value,
        total
      })
    }
  
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('set-meta-state', onSetMetaState );
    socket.on('update-timer', onUpdateTimer )
   
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('set-meta-state', onSetMetaState )
      socket.off('update-timer', onUpdateTimer )
    };
  }, []);

  return <>
    <aside className="app-debug">
      <div>
        { isSocketConnected ? 'CONNECTED' : 'NOT CONNECTED' }
      </div>
      <div>
        State: {STATES_getName( metaState )}
      </div>
    </aside>
    {(timer && timer.value >= 0) ? <Timer name={timer.name} value={timer.value} total={timer.total}/> : ''}
    { (metaState === STATES.Idle) ? <StateIdle /> : '' }
    { (metaState === STATES.AcceptInput) ? <StateAcceptInput /> : '' }
    { (metaState === STATES.ConstructStage) ? <StateConstructStage /> : '' }
    { (metaState === STATES.InstructCharacters) ? <StateInstructCharacters /> : '' }
    { (metaState === STATES.Play) ? <StatePlay /> : '' }
    { (metaState === STATES.Concludee) ? <StateConclude /> : '' }
    { (metaState === STATES.Restart) ? <StateRestart /> : '' }
  </>
}

export default App;
