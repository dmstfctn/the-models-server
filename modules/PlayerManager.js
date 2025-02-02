import EventEmitter from 'events';

import Player from './Player.js';
import Backdrops from '../client/src/shared/Backdrops.js';
import Lobby from './Lobby.js';
import ROLES from '../client/src/shared/ROLES.js';
import STATES, {STATES_DEFAULT} from '../client/src/shared/STATES.js';
import { NEGATIVE_SENTIMENT_THRESHOLD, SOLO_NEGATIVE_SENTIMENT_THRESHOLD } from '../client/src/shared/Sentiment.js';

class PlayerManager extends EventEmitter {
  state = STATES_DEFAULT;
  allTimeCount = 0;
  list = [];
  queue = [];
  lobby = false;
  choices = {};
  playerSentiment = 0;
  constructor(){
    super();
    this.setupNextChoice();
  }

  setState( state ){
    if( this.state === state ) return;
    this.state = state;

    if( this.state === STATES.AcceptInput ){
      this.setupNextChoice();
      this.updateQueueToLobby();
    }

    this.list.forEach( (player) => {
      player.setMetaState( this.state );
    });

    this.queueRefresh();

  }

  calculatePlayerSentiment(){
    let total = 0;
    let countNegative = 0;
    let countPositive = 0;
    let countNeutral = 0
    this.list.forEach(( player ) => {
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
    this.playerSentiment = {
      playerCount: this.list.length,
      negative: countNegative / this.list.length,
      positive: countPositive / this.list.length,
      neutral: countNeutral / this.list.length
    }
  }

  addPlayer( socket ){
    const player = new Player( this.allTimeCount, socket );
    this.allTimeCount++;
    this.list.push( player );

    player.sendQueueUpdate( false, this.queue.length );
    player.sendSetBackdrop( this.choices[ROLES.BACKDROP] );

    player.on('disconnect', () => {
      this.removePlayerFromQueue( player );
      this.removePlayerFromList( player );
      this.removePlayerFromLobby( player );
    });

    player.on( 'ready-to-play', () => {
      this.addPlayertoQueue( player );
    });

    player.on( 'rate-script', ( rating ) => {
      this.calculatePlayerSentiment();
      this.emit('rate-script', rating );
    });

    //player.setReadyToPlay();

    return player;
  }

  sendUpdateTimer({duration,remaining}){
    this.list.forEach( ( player ) => {
      player.sendUpdateTimer( 'time remaining', remaining, duration );
    });
    if( remaining <= 0 && this.lobby ){
      this.lobby.closeLobby(); 
    }
  }

  removePlayerFromList( player ){
    const index = this.list.findIndex( ( other ) => other.id === player.id );
    console.log( `removing player with id from LIST: ${player.id}` );
    this.list.splice( index, 1 );
    console.log( `list is ${this.list.length} long`);
    if( this.list.length <= 0 && this.lobby ){
      this.lobby.closeLobby();
    }
  }

  startLobby(){
    this.lobby = new Lobby();
    this.lobby.on('close-lobby', (choices) => {
      if( this.lobby ){
        this.lobby.players.forEach( (player) => {
          this.removePlayerFromQueue( player );
        });
      }
      choices.forEach( ( choice ) => {
        this.choices[ choice.role ] = choice.choice;
      });
      this.emit( 'choice-update', this.choices )
      this.emit( 'begin-play', this.choices );
      this.lobby = null;
    });
  }

  closeLobbyIfExists(){
    console.log( 'closeLobbyIfExists()')
    if( !this.lobby ){
      console.log('no lobby so making a fake one' );
      this.startLobby();
    }
    this.lobby.closeLobby();
    console.log('Lobby Closed');
  }

  addPlayertoQueue( player ){
    if( !this.isPlayerQueued( player ) ){
      this.queue.push( player );
      this.queueRefresh();
      this.addPlayerToLobby( player );
    }
  }

  removePlayerFromQueue( player ){
    const index = this.queue.findIndex( ( other ) => other.id === player.id );
    console.log( `removing player with id from QUEUE ${player.id}` );
    this.queue.splice( index, 1 );
    console.log( `queue is ${this.list.length} long`);
    this.queueRefresh();
  }

  updateQueueToLobby(){
    this.queueRefresh();
    this.queue.forEach( (player) => {
      this.addPlayerToLobby( player )
    });
  }

  addPlayerToLobby( player ){
    if( !this.lobby ){
      this.startLobby();
    }
    const inLobby = this.lobby.addPlayer( player );
  }

  removePlayerFromLobby( player ){
    if( this.lobby ){
      this.lobby.removePlayer( player );
    }
  }

  isPlayerQueued( player ){
    console.log( 'PlayerManager . isPlayerQueued()' );
    // console.log( this.queue );
    // console.log( this.queue.find( ( other ) => other.id === player.id ) );
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

    //console.log('NEXT CHOICE: ', this.choices)

    this.emit( 'choice-update', this.choices )

    this.list.forEach( (player) => {
      player.sendSetBackdrop( this.choices[ROLES.BACKDROP] );
    });

    //console.log('PlayerManager : setupNextChoices() : this.choices = ', this.choices )
  }

  countChoices(){
    return Object.values( this.choices ).reduce( ( acc, c ) => (!!c) ? acc + 1 : acc );
  }

  makeChoice( choice, value ){
    if( !!this.choices[ choice ] ){
      this.choices[ choice ] = value;
    }
    this.list.forEach( (player) => {
      player.sendSetBackdrop( this.choices[ROLES.BACKDROP] );
    });
    console.log( `Made ${this.countChoices()} choices` );
  }
}

export default PlayerManager;