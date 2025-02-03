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
  array.splice( index, 1 );
  return array;
}

const checkIfNoPlayersLeft = function(){
  if( list.length <= 0 ){
    //do things
  }
}

const calculatePlayerSentiment = function(){
  let total = 0;
  let countNegative = 0;
  let countPositive = 0;
  let countNeutral = 0
  queue.forEach(( player ) => {
    total = (player.sentiment > 0 ) ? total + 1 : total - 1
    if( player.sentiment < NEGATIVE_SENTIMENT_THRESHOLD ){
      total -= 1;
      if( this.list.length > 1 ){          
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
    playerCount: this.list.length,
    negative: countNegative / this.list.length,
    positive: countPositive / this.list.length,
    neutral: countNeutral / this.list.length
  }
}

const setupNextChoice = function(){
  const roles = [ ROLES.MASK1, ROLES.PROP, ROLES.MASK2 ];
  const choices = {};
  choices[ ROLES.BACKDROP ] = Backdrops.getRandom();
  choices[ ROLES.MASK1 ] = false;
  choices[ ROLES.PROP ] = false;
  choices[ ROLES.MASK2 ] = false
  
  console.log('setupNextChoice() : this.choices = ', choices );
  return {choices, roles};
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
  if( !choices.find( (other) => other.role === role ) ){
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
      choice.choice = randomiseChoice( choice )
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

const isLobbyComplete = function(){
  for( let i = 0; i < lobby.length; i++ ){
    if( !lobby[i].complete ) return false;
  }
  return true;
}

const addPlayerToLobby = function( player ){
  lobby.push( player );
  player.assignRole( roles.shift() );
}

const addPlayerToQueue = function( player ){
  queue.push( player );

}

const addPlayerToList = function( player ){
  list.push( player );
}

const ensureFullParticipation = function(){
  let i = 0;
  while( roles.length > 0 ){
    lobby[ i % lobby.length ].addRole( roles.shift() );
    i++;
  }
}

const beginGame = function( ){
  if( lobby.length < 3 ){
    ensureFullParticipation();
  }
  lobby.forEach( (player) => {
    player.sendBeginGame();
  });
}

const list = [];
const queue = [];
const lobby = [];
let {choices: nextChoices, roles} = setupNextChoice();

io.of('/audience').on('connection', (socket) => { 
  const player = new Player( socket );
  
  addPlayerToList( player );

  player.on('disconnect', () => {
    removePlayerFromArray( player, lobby );
    removePlayerFromArray( player, queue );
    removePlayerFromArray( player, list );    
    
    checkIfNoPlayersLeft(); 
  });

  player.on( 'ready-to-play', () => {    
    if( lobby.length <= 0 ){
      addPlayerToLobby( player );
      beginGame();
    } else {
      addPlayerToQueue( player );
    }
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
  }, 1000 )
});

//send choices to unreal
//

unreal.on('send-state', ( state ) => {
  console.log('Unreal on send-state, send ', state, 'to player manager. State name = ', STATES_getName( state ) );
  // loop over all players and set state
  if( state === STATES.AcceptInput ){
    while( !isLobbyFull() && queue.length > 0 ){
      addPlayerToLobby( queue.shift() );
    }
  }
  this.list.forEach( ( player ) => {
    player.setMetaState( state );
  });
});


unreal.on('countdown-update', ( timer ) => {
  this.list.forEach( ( player ) => {
    player.sendUpdateTimer( 'time remaining', timer.remaining, timer.duration );
  });
  // if( timer.remaining <= 0 ){
  //   // pick something and run it?? only if ppl are picking tho??
  // }
});

unreal.on('countdown-end', () => {
  //send or randomise choices    
  unreal.sendLoadAndBeginScript( validateOrRandomiseLobby() );
});