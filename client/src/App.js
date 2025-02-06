import React, { useState, useEffect } from 'react';

import './App.css';

import { socket } from './socket.js';

import STATES, {STATES_getName, STATES_DEFAULT} from './shared/STATES.js';
import StateIdle from './components/StateIdle.js';
import StateAcceptInput from './components/StateAcceptInput.js';
import StatePlay from './components/StatePlay.js';
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
  const [rating, setRating] = useState(0);
  const [timer, setTimer] = useState();
  const [isDebug, setIsDebug] = useState();
  const [config,setConfig] = useState();
  const [roles, setRoles] = useState([]);
  
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
      if( state !== metaState && state === STATES.Play ){
        setRating( 0 );
      }
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

    function onConfig(config){
      setConfig( config );
    }
    
    function onBeginGame({ roles }) {
      console.log('onBeginGame(), roles = ', roles );
      setRoles(roles);
      setIsInLobby( true );
    }
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('set-meta-state', onSetMetaState );
    socket.on('update-timer', onUpdateTimer )
    socket.on('queue-update', onQueueUpdate);    
    socket.on('set-backdrop', onSetBackdrop);    
    socket.on('config', onConfig);  
    socket.on('begin-game', onBeginGame);  
        
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('set-meta-state', onSetMetaState )
      socket.off('update-timer', onUpdateTimer )
      socket.off('queue-update', onQueueUpdate);
      socket.off('set-backdrop', onSetBackdrop); 
      socket.off('config', onConfig); 
      socket.off('begin-game', onBeginGame);
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
      timer,
      rating,
      setRating,
      roles,
      setRoles
    }}>
      <aside className="app-meta">                
        {(!isInLobby) ? <div>
          {queueInfo.isQueued 
            ? `Tra ${ Math.floor(queueInfo.position / 3) } sketch potrai comporre la scena` 
            : ``
          }
        </div> : '' }
        {(backdrop && metaState === STATES.AcceptInput) ? <div className="next-scene-info">La prossima scena si svolge <span className="where">{backdrop.phoneCategoryIt}</span>.</div> : ''} 
        { (isInLobby && timer && timer.value >= 0) ? <Timer name={timer.name} value={timer.value} total={timer.total}/> : ''}
      </aside>

      {( !queueInfo.isQueued && !isInLobby ) 
        ? <section className='app-join'>
          <button 
            className="button button--join"
            onClick={() => { socket.emit( 'ready-to-play' )}}
          >
            PARTECIPA
          </button> 
          </section>
        : '' 
      }
        
      

      { (metaState === STATES.Idle) ? <StateIdle /> : '' }
      { (metaState === STATES.AcceptInput) ? <StateAcceptInput /> : '' }
      { ( metaState === STATES.ConstructStage 
          || metaState === STATES.InstructCharacters 
          || metaState === STATES.Play 
          || metaState === STATES.Conclude 
          || metaState === STATES.BadEnding
        )
          ? <StatePlay /> 
          : '' 
      }
      { (metaState === STATES.Restart) ? <StateRestart /> : '' }
    </GameContext.Provider>

    {(isDebug) ? <aside className="app-debug">
      <div>
        { isSocketConnected ? 'CONNECTED' : 'NOT CONNECTED' }
      </div>
      <div>
        State: {STATES_getName( metaState )}
      </div>
      <div>
        Config:
        <div>
          {JSON.stringify( config )}
        </div>
      </div>
    </aside> : '' } 
  </>
}

export default App;
