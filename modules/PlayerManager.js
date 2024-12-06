import EventEmitter from 'events';

import Player from './Player.js';
import Backdrops from '../client/src/shared/Backdrops.js';
import Lobby from './Lobby.js';
import ROLES from '../client/src/shared/ROLES.js';
import STATES from '../client/src/shared/STATES.js';

class PlayerManager extends EventEmitter {
  state = STATES.WATCH;
  allTimeCount = 0;
  list = [];
  queue = [];
  lobby = false;
  constructor(){
    super();
    this.setupNextChoice();
  }

  setState( state ){
    this.state = state;
    this.list.forEach( (player) => {
      player.setMetaState( state );
    })
  }

  addPlayer( socket ){
    const player = new Player( this.allTimeCount, socket );
    this.allTimeCount++;
    this.list.push( player );

    player.sendQueueUpdate( false, this.queue.length );

    player.on('disconnect', () => {
      this.removePlayerFromQueue( player );
      this.removePlayerFromList( player );
    });

    player.on( 'ready-to-play', () => {
      this.addPlayertoQueue( player );
    });

    return player;
  }

  removePlayerFromList( player ){
    const index = this.list.findIndex( ( other ) => other.id === player.id );
    console.log( `removing player with id from LIST: ${player.id}` );
    this.list.splice( index, 1 );
    console.log( `list is ${this.list.length} long`);
  }

  startLobby(){
    this.lobby = new Lobby();
    this.lobby.on('close-lobby', (choices) => {
      choices.forEach( ( choice ) => {
        this.choices[ choice.role ] = choice.choice;
      });
      this.emit( 'begin-play', this.choices )
    });
  }

  addPlayertoQueue( player ){
    if( !this.isPlayerQueued( player ) ){
      this.queue.push( player );
      this.queueRefresh();
      if( !this.lobby ){
        this.startLobby();
      }
      const inLobby = this.lobby.addPlayer( player );
    }
  }

  removePlayerFromQueue( player ){
    const index = this.queue.findIndex( ( other ) => other.id === player.id );
    console.log( `removing player with id from QUEUE ${player.id}` );
    this.queue.splice( index, 1 );
    console.log( `queue is ${this.list.length} long`);
    this.queueRefresh();
  }

  isPlayerQueued( player ){
    console.log( 'PlayerManager . isPlayerQueued()' );
    console.log( this.queue );
    console.log( this.queue.find( ( other ) => other.id === player.id ) );
    return !!this.queue.find( ( other ) => other.id === player.id );
  }

  queueRefresh(){
    this.queue.forEach( ( player, i ) => {
      player.sendQueueUpdate( i + 1, this.queue.length );
    });
  }

  setupNextChoice(){
    this.choices = {};
    this.choices[ ROLES.BACKDROP ] = Backdrops.getRandom();
    this.choices[ ROLES.MASK1 ] = false;
    this.choices[ ROLES.PROP ] = false;
    this.choices[ ROLES.MASK2 ] = false;
  }

  countChoices(){
    return Object.values( this.choices ).reduce( ( acc, c ) => (!!c) ? acc + 1 : acc );
  }

  makeChoice( choice, value ){
    if( !!this.choices[ choice ] ){
      this.choices[ choice ] = value;
    }
    console.log( `Made ${this.countChoices()} choices` );
  }
}

export default PlayerManager;