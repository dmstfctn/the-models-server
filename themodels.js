import{ createInterface } from 'node:readline';

import unreal from './modules/unreal.js';
import io from './modules/io.js';

import Player from './modules/Player.js';

import STATES, { STATES_getName } from "./client/src/shared/STATES.js";
import { NEGATIVE_SENTIMENT_THRESHOLD, SOLO_NEGATIVE_SENTIMENT_THRESHOLD } from './client/src/shared/Sentiment.js';
import Backdrops from './client/src/shared/Backdrops.js';
import ROLES from './client/src/shared/ROLES.js';
import { TENDENCIES } from './client/src/shared/CHARACTERS.js';
import PROPS from './client/src/shared/PROPS.js';

io.on('connection', (socket) => {
  unreal.connect( socket );
    
  socket.on('disconnect', function(){
    unreal.disconnect()
  });
});

const isPlayerInArray = function( player, array ){
  return !!array.find( ( other ) => other.id === player.id );
}

const removePlayerFromArray = function( player, array ){
  const index = array.findIndex( ( other ) => other.id === player.id );
  if( index >= 0 ){
    array.splice( index, 1 );
  }
  return array;
}

const checkIfNoPlayersLeft = function(){
  if( list.length <= 0 ){
    //ensure empty queue
    if( queue.length > 0 ){
      queue.forEach(( player ) => {
        removePlayerFromArray( player, queue );
      });
    }
    //ensure empty lobby
    if( lobby.length > 0 ){
      lobby.forEach(( player ) => {
        removePlayerFromArray( player, lobby );
      });
    }
  }
}

const checkIfLobbyEmptyButInputIsAccepted = function(){
  if( unreal.engineState === STATES.AcceptInput ){
    if( lobby.length <= 0 ){
      roles = setupNextRoles();
      setupLobbyAndBegin();
    }
  }
}

const calculatePlayerSentiment = function(){
  const players = queue.concat(lobby);
  const playerCount = players.length;

  let total = 0;
  let countNegative = 0;
  let countPositive = 0;
  let countNeutral = 0;

  players.forEach(( player ) => {
    total = (player.sentiment > 0 ) ? total + 1 : total - 1
    if( player.sentiment < NEGATIVE_SENTIMENT_THRESHOLD ){
      total -= 1;
      if( playerCount > 1 ){          
        countNegative += 1;
      } else {
        if( player.sentiment < SOLO_NEGATIVE_SENTIMENT_THRESHOLD ){
          // if only one player they have to have 10 negative to count as negative overall and stop play
          countNegative += 1;
        }
      }
    } else if( player.sentiment > 0 ){
      total += 1;
      countPositive += 1;
    } else {
      countNeutral += 1;
    }
  });

  return {
    playerCount,
    negative: countNegative / playerCount,
    positive: countPositive / playerCount,
    neutral: countNeutral / playerCount
  }
}

const setupNextRoles = function(){
  return [ ROLES.MASK1, ROLES.PROP, ROLES.MASK2 ];
}

const setupNextChoices = function(){
  const choices = {};
  choices[ ROLES.BACKDROP ] = Backdrops.getRandom();
  choices[ ROLES.MASK1 ] = false;
  choices[ ROLES.PROP ] = false;
  choices[ ROLES.MASK2 ] = false
  
  console.log('setupNextChoices() : this.choices = ', choices );
  return choices;
}

const randomiseChoice = function( choice ){
  if( choice.role === ROLES.MASK1 || choice.role === ROLES.MASK2 ){
    choice.choice = TENDENCIES[ Math.floor( Math.random() * TENDENCIES.length ) ];
  }
  if( choice.role === ROLES.PROP ){
    choice.choice = PROPS[ Math.floor( Math.random() * PROPS.length )  ];
  }
  return choice;
}

const randomiseChoiceForRoleIfNotExists = function(choices, role){
  if( !choices.find( other => other.role === role ) ){
    choices.push( randomiseChoice({
      role: role,
      choice: false
    }));
  }
}

const validateOrRandomiseLobby = function(){
  console.log('validateOrRandomiseLobby()');
  const choices = [];
  lobby.forEach( (player) => {
    player.roles.forEach( (role) => {
      choices.push( role );
    });
  });
  //if a role has been set but not chosen
  choices.forEach( (choice) => {    
    if( !choice.choice ){
      choice = randomiseChoice( choice )
    }
  });

  //ensure all nexessary roles exist
  randomiseChoiceForRoleIfNotExists( choices, ROLES.MASK1 );
  randomiseChoiceForRoleIfNotExists( choices, ROLES.MASK2 );
  randomiseChoiceForRoleIfNotExists( choices, ROLES.PROP );

  //port over randomised backdrop from nextChoice
  choices.push({
    role: ROLES.BACKDROP,
    choice: nextChoices[ROLES.BACKDROP]
  });

  return choices;
}

const isLobbyFull = function(){
  return lobby.length >= 3;
}

const isLobbyComplete = function(){
  for( let i = 0; i < lobby.length; i++ ){
    if( !lobby[i].complete ) return false;
  }
  return true;
}

const addPlayerToLobby = function( player ){
  if( !isPlayerInArray( player, lobby ) ){
    player.assignRole( roles.shift() );
    lobby.push( player );
    //in case is also in queue
    removePlayerFromArray( player, queue );
    return true;
  }
  return false;
}

const addPlayerToQueue = function( player ){
  if( !isPlayerInArray( player, queue )){
    queue.push( player );
    //in case is somehow still in lobby
    removePlayerFromArray( player, lobby );
    queueRefresh();
    return true;
  }
  return false;
}

const addPlayerToList = function( player ){
  if( !isPlayerInArray( player, list ) ){
    list.push( player );
    return true;
  }
  return false;
}

const queueRefresh = function(){
  queue.forEach( ( player, i ) => {
    player.sendQueueUpdate( i + 1, queue.length );
  })
}

const ensureFullParticipation = function(){
  let i = 0;
  while( roles.length > 0 ){
    lobby[ i % lobby.length ].addRole( roles.shift() );
    i++;
  }
}

const beginGame = function( ){
  ensureFullParticipation();
  console.log(`beginGame with player(s) ${lobby.map( p => p.id).join(', ')}`)
  lobby.forEach( (player) => {
    player.sendBeginGame();
  });
}

const setupLobbyAndBegin = function(){
  while( !isLobbyFull() && queue.length > 0 ){
    const nextPlayer = queue.shift();
    console.log('add player to lobby: ', nextPlayer.id );
    addPlayerToLobby( nextPlayer );
  }

  queueRefresh();

  if( lobby.length > 0 ){
    beginGame();
  }
}

const list = [];
const queue = [];
const lobby = [];
let nextChoices = setupNextChoices();
let roles = setupNextRoles()

io.of('/audience').on('connection', (socket) => { 
  const player = new Player( socket );
  
  addPlayerToList( player );

  player.on('disconnect', () => {
    console.log(`Player ${player.id} disconnected. Remove from lobby, queue, list.`)
    removePlayerFromArray( player, lobby );
    removePlayerFromArray( player, queue );
    removePlayerFromArray( player, list );    
    console.log('check if lobby empty');
    checkIfLobbyEmptyButInputIsAccepted();
    console.log('check if no players left');
    checkIfNoPlayersLeft(); 
    console.log( `Player ${player.id} cleaned up.`)
  });

  player.on( 'ready-to-play', () => {
    console.log( `player ${player.id} ready to play`)
    if( lobby.length <= 0 ){
      console.log('lobby empty, add there')
      if( unreal.engineState === STATES.AcceptInput ){        
        addPlayerToLobby( player );
        console.log( 'player added to lobby, beginning game' );
        beginGame();
      } else {
        console.log( 'unreal not ready, wait in queue' )
        addPlayerToQueue( player );
      }
    } else {
      console.log( 'lobby exists, wait in queue' )
      addPlayerToQueue( player );
    }

    player.setMetaState( unreal.getState() );
  });

  player.on('choices-complete', () => {
    const isInLobby = isPlayerInArray( player, lobby );
    if( !isInLobby ) return;
    if( isLobbyComplete() ){
      unreal.sendLoadAndBeginScript( validateOrRandomiseLobby() );
    }
  });

  player.on( 'rate-script', ( rating ) => {
    unreal.sendRateScript( rating, calculatePlayerSentiment() );
  });

  console.log('new player. send unreal state( ' + unreal.getState() + ' )' );
  
  //this timeout is because of prefetching. There is definitely a better way but i am just too dumb
  setTimeout( function(){
    player.setMetaState( unreal.getState() );
    player.sendSetBackdrop( nextChoices[ROLES.BACKDROP] );
  }, 1000 );
});

//send choices to unreal
//
let globalState = STATES.Idle;

const sendState = ( state ) => {
  console.log('Unreal on send-state, send ', state, 'to player manager. State name = ', STATES_getName( state ) );
  console.log( `LOBBY: ${lobby.map(p=>p.id).join(', ')} / QUEUE: ${queue.map(p=>p.id).join(', ')} / LIST: : ${list.map(p=>p.id).join(', ')}`)

  // loop over all players and set state
  if( state === STATES.AcceptInput ){
    nextChoices = setupNextChoices();
    roles = setupNextRoles();

    setupLobbyAndBegin();
  }

  list.forEach( ( player ) => {
    player.setMetaState( state );
    player.sendSetBackdrop( nextChoices[ROLES.BACKDROP] );
  });
};

const countdownUpdate = ( timer ) => {
  list.forEach( ( player ) => {
    player.sendUpdateTimer( 'time remaining', timer.remaining, timer.duration );
  });
  // if( timer.remaining <= 0 ){
  //   // pick something and run it?? only if ppl are picking tho??
  // }
};

const countdownHalf = () => {
  countdownUpdate({
    remaining: 30,
    duration: 60
  });
};

const countdownClear = () => {
  countdownUpdate({
    remaining: -1,
    duration: 60
  });
};

const countdownEnd = () => {
  //send or randomise choices    
  unreal.sendLoadAndBeginScript( validateOrRandomiseLobby() );
}

unreal.on('send-state', sendState );
unreal.on('countdown-update', countdownUpdate );
unreal.on('countdown-end', countdownEnd );

const printArray = ( arr, label = 'ARRAY:' ) => {
  console.log( '------------')
  console.log( label )      
  console.log( '-' + queue.map( p=>p.id).join('\n-') );
  console.log( '------------')  
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'CMD> ',
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'stateIdle':
      unreal.engineState = STATES.Idle;
      sendState(STATES.Idle);
      break;
    case 'stateAcceptInput':
      unreal.engineState = STATES.AcceptInput;
      sendState(STATES.AcceptInput);
      break;
    case 'stateConstructStage':
      unreal.engineState = STATES.ConstructStage;
      sendState(STATES.ConstructStage);
      break;
    case 'stateInstructCharacters':
      unreal.engineState = STATES.InstructCharacters;
      sendState(STATES.InstructCharacters);
      break;
    case 'statePlay':
      unreal.engineState = STATES.Play;
      sendState(STATES.Play);
      break;
    case 'stateConclude':
      unreal.engineState = STATES.Conclude;
      sendState(STATES.Conclude);
      break;
    case 'stateRestart':
      unreal.engineState = STATES.Restart;
      sendState(STATES.Restart);
      break;
    case 'stateBadEnding':
      unreal.engineState = STATES.BadEnding;
      sendState(STATES.BadEnding);
      break;
    case 'stateEmergency':
      unreal.engineState = STATES.Emergency;
      sendState(STATES.Emergency);
      break;
    case 'countdownHalf':
      countdownHalf();
      break
    case 'countdownEnd':
      countdownClear();
      countdownEnd();      
      break;
    case 'printQueue':
      printArray( queue, 'QUEUE:' );
      break;
    case 'printList':
      printArray( list, 'LIST:' );
      break;
    case 'printLobby':
      printArray( lobby, 'LOBBY:' );
      break;
    default:
      console.log( `
================
How to:    
================

state<StateName>
-----------------
Write stateStateName to toggle Unreal state. E.g. stateBadEnding will trigger BadEnding state.
All options:
${'\tstate' + Object.keys( STATES ).join( '\n\tstate' )}

countdownEnd
------------
As if the countdown in unreal has ended. Triggers randomisation of choices.
`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});