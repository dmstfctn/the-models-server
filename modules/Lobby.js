import EventEmitter from 'events';
import ROLES from '../client/src/shared/ROLES.js';

class Lobby extends EventEmitter {
  id = new Date().getTime();
  players = [];
  choices = [];
  startTimeout = false;
  timeToStart = 5;
  choiceTimeout = false;
  timeToChoose = 5;
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
      this.startTimeout = setInterval( () => {
        this.timeToStart -= 1;
        if( this.timeToStart <= 0 ){
          clearInterval( this.startTimeout );
          this.beginGame();
        }
      }, 1000 );
    }
  }

  startChoiceTimeout(){
    if( !this.choiceTimeout ){
      this.choiceTimeout = setInterval( () => {
        this.timeToChoose -= 1;
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