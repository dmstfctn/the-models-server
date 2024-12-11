import EventEmitter from 'events';
import ROLES from '../client/src/shared/ROLES.js';

const timeToStartLength = 5;
const timeToChooseLength = 5;

class Lobby extends EventEmitter {
  id = new Date().getTime();
  players = [];
  choices = [];
  startTimeout = false;
  timeToStart = timeToStartLength;
  choiceTimeout = false;
  timeToChoose = timeToChooseLength;
  possibleRoles = [ ROLES.MASK1, ROLES.PROP, ROLES.MASK2 ];
  maxPlayers = this.possibleRoles.length;
  constructor(){
    super();
  }

  addPlayer( player ){
    if( this.players.length < this.maxPlayers ){
      player.assignRole( this.possibleRoles.shift() )
      this.players.push( player );
      this.startJoinTimeout();
      return true;
    } else {
      return false;
    }
  }

  startJoinTimeout(){
    if( !this.startTimeout ){
      this.players.forEach( ( player ) => {
        player.sendUpdateTimer( 'Waiting for others to join', this.timeToStart, timeToStartLength );
      });
      this.startTimeout = setInterval( () => {
        this.timeToStart -= 1;
        this.players.forEach( ( player ) => {
          player.sendUpdateTimer( 'Waiting for others to join', this.timeToStart, timeToStartLength );
        });
        if( this.timeToStart <= 0 ){
          clearInterval( this.startTimeout );
          this.beginGame();
        }
      }, 1000 );
    }
  }

  startChoiceTimeout(){
    if( !this.choiceTimeout ){
      this.players.forEach( ( player ) => {
        player.sendUpdateTimer( 'Waiting for everyone to choose', this.timeToChoose, timeToChooseLength );
      });
      this.choiceTimeout = setInterval( () => {
        this.timeToChoose -= 1;
        this.players.forEach( ( player ) => {
          player.sendUpdateTimer( 'Waiting for everyone to choose', this.timeToChoose, timeToChooseLength );
        });
        if( this.timeToChoose <= 0 ){
          clearInterval( this.choiceTimeout );
          this.closeLobby();
        }
      }, 1000 );
    }
  }


  ensureFullParticipation(){
    let i = 0;
    while( this.possibleRoles.length > 0 ){
      this.players[ i % this.players.length ].addRole( this.possibleRoles.shift() );
      i++;
    }
  }

  beginGame(){
    this.ensureFullParticipation();
    this.emit( 'begin-game' );
    this.players.forEach( ( player ) => {
      player.sendBeginGame();
    });
    this.startChoiceTimeout();
  }

  closeLobby(){
    this.players.forEach(( player ) => {
      player.roles.forEach( (role) => {
        this.choices.push( role );
      })
    });
    this.emit( 'close-lobby', this.choices )
    console.log(`Closing Lobby ${this.id} with choices: ${JSON.stringify(this.choices, false, 2)}`)
  }
};

export default Lobby;