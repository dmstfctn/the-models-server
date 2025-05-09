import React, { useState, useEffect } from 'react';

import { useWakeLock } from 'react-screen-wake-lock';

import './App.css';

import { socket } from './socket.js';

import STATES, {STATES_getName, STATES_DEFAULT} from './shared/STATES.js';
import StateIdle from './components/StateIdle.js';
import StateAcceptInput from './components/StateAcceptInput.js';
import StatePlay from './components/StatePlay.js';
import StateRestart from './components/StateRestart.js';
import StateStandby from './components/StateStandby.js';
import Onboarding from './components/Onboarding.js';
import Timer from './components/Timer.js';
import { GameContext, queueDefault } from './contexts/GameContext.js';

import { getTxt, T, setLang, getSceneDescription } from './translation.js';
setLang('es');

function App() {
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);

  const { isSupported, released, request, release } = useWakeLock({
    onRequest: () => console.log('wakelock: requested'),
    onError: () => console.log('wakelock: error'),
    onRelease: () => console.log('wakelock: released'),
    reacquireOnPageVisible: true,
  });

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
  
  const [justJoined, setJustJoined] = useState( true );

  const [stateHistory, setStateHistory] = useState([]);

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

    function onSetMetaState( state, acknowledgementCallback ){
      console.log('set-meta-state', state )
      if( state !== metaState && state === STATES.Play ){
        setRating( 0 );
      }
      setMetaState( state );      
      
      const h = [state].concat(stateHistory);      
      setStateHistory( h );
      
      acknowledgementCallback({state});
    }

    // function onSetMetaState( state ){
    //   console.log( 'set-meta-state', state );
    //   if( state !== metaState && state === STATES.Play ){
    //     setRating( 0 );
    //   }
    //   setMetaState( state );      
    //   const h = [state].concat(stateHistory);     
    //   setStateHistory( h );
    // }

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

    function onDead(){
      window.location.reload();
    }
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('set-meta-state', onSetMetaState );
    socket.on('update-timer', onUpdateTimer )
    socket.on('queue-update', onQueueUpdate);    
    socket.on('set-backdrop', onSetBackdrop);    
    socket.on('config', onConfig);  
    socket.on('begin-game', onBeginGame);  
    socket.on('dead', onDead);
        
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('set-meta-state', onSetMetaState )
      socket.off('update-timer', onUpdateTimer )
      socket.off('queue-update', onQueueUpdate);
      socket.off('set-backdrop', onSetBackdrop); 
      socket.off('config', onConfig); 
      socket.off('begin-game', onBeginGame);
      socket.off('dead', onDead);
    };
  }, [stateHistory, setStateHistory]);

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
        {(!isInLobby) 
          ? <div className="app-meta--block">
            {queueInfo.isQueued 
              ? `${getTxt(T.QINFO1)} ${ Math.floor(queueInfo.position / 3) + 1} ${getTxt(T.QINFO2)}` 
              : ``
            }
            </div> 
          : ( !timer && metaState !== STATES.AcceptInput && queueInfo.isQueued ) 
            ? <div className="app-meta--block">...</div> 
            : '' 
        }
        {(isInLobby && backdrop && metaState === STATES.AcceptInput) 
          ? <div className="next-scene-info app-meta--block">
              {getTxt(T.NEXTSCENE)} <span className="where">{ getSceneDescription( backdrop ) }</span>.
            </div>
          : ''
        } 
        { (isInLobby && timer && timer.value >= 0) 
          ? <div className="app-meta--block">
              <Timer name={timer.name} value={timer.value} total={timer.total}/> 
            </div>
          : ''
        }
      </aside>

      {( !queueInfo.isQueued && !isInLobby ) 
        ? <section className='app-join'>
            <div className='join-buttons'>
              <button 
                className="button "
                onClick={() => {
                  if( released ){ 
                    console.log('no wake lock, requesting')
                    request();
                  } else {
                    console.log('wake lock already');
                  }
                  setLang( 'es' );
                  socket.emit( 'ready-to-play' )
                }}
              >
                {getTxt(T.LANGUAGE, 'es')}
              </button> 
              <button 
                className="button button--join"
                onClick={() => { 
                  if( released ){ 
                    console.log('no wake lock, requesting')
                    request();
                  } else {
                    console.log('wake lock already');
                  }
                  setLang( 'en' );
                  socket.emit( 'ready-to-play' )
                }}
              >
                {getTxt(T.LANGUAGE, 'en')}
              </button> 
            </div>
          </section>
        : (justJoined) 
                ? <Onboarding 
                    onClick={() => {                      
                      setJustJoined( false );
                    }}
                  />
                : ''
      }
        
      

      { (metaState === STATES.Idle) ? <StateIdle /> : '' }
      { (metaState === STATES.AcceptInput) 
          ? 
            ( isInLobby ) 
              ? <StateAcceptInput />
              : <StateStandby />
          : '' }
      { ( metaState === STATES.ConstructStage 
          || metaState === STATES.InstructCharacters  
        ) 
          ? <StateStandby />
          : ''
      }
      { ( metaState === STATES.Play 
          || metaState === STATES.Conclude 
          || metaState === STATES.BadEnding
          || metaState === STATES.Emergency
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
        Screen Wake Lock API supported: {`${isSupported}`}
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
      <div>
        <ul>
          {stateHistory.map((h) => {
            return <li>{STATES_getName(h)}</li>
          })}
        </ul>
      </div>
    </aside> : '' } 
  </>
}

export default App;
