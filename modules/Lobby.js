import EventEmitter from 'events';
import ROLES from '../client/src/shared/ROLES.js';
import { TENDENCIES } from '../client/src/shared/CHARACTERS.js';
import PROPS from '../client/src/shared/PROPS.js';

const timeToStartLength = 0;
const timeToChooseLength = 60;

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
      
      player.on('choices-complete', () => {
        const completeCount = this.players.filter( (player) => {
          return player.complete
        }).length;
        if( completeCount === this.players.length ){
          clearInterval( this.choiceTimeout );
          this.closeLobby();
        }
      })

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

  randomiseChoice( choice ){
    if( !choice.choice ){
      if( choice.role === ROLES.MASK1 || choice.role === ROLES.MASK2 ){
        choice.choice = TENDENCIES[ Math.floor( Math.random() * TENDENCIES.length ) ];
      }
      if( choice.role === ROLES.PROP ){
        choice.choice = PROPS[ Math.floor( Math.random() * PROPS.length )  ]
      }
    }
    return choice;
  }

  validateOrRandomiseChoices(){
    console.log('validateOrRandomiseChoices()');
    this.choices.forEach( (choice) => {
      console.log('choice:', choice );
      choice = this.randomiseChoice( choice );
    });

    if( !this.choices.find( ({role}) => role === ROLES.MASK1 ) ){
      this.choices.push(this.randomiseChoice(
        {
          role: ROLES.MASK1,
          choice: false
        }
      ))
    }

    if( !this.choices.find( ({role}) => role === ROLES.MASK2 ) ){
      this.choices.push(this.randomiseChoice(
        {
          role: ROLES.MASK2,
          choice: false
        }
      ))
    }

    if( !this.choices.find( ({role}) => role === ROLES.PROP ) ){
      this.choices.push(this.randomiseChoice(
        {
          role: ROLES.PROP,
          choice: false
        }
      ))
    }
  }

  removePlayer( player ){
    const index = this.players.findIndex( ( other ) => other.id === player.id );
    this.players.splice( index, 1 );
    if( this.players.length <= 0 ){
      this.closeLobby();
    }
  }

  closeLobby(){    
    this.players.forEach(( player ) => {      
      player.sendUpdateTimer( '', 0, 0 );

      player.roles.forEach( (role) => {
        this.choices.push( role );
      })
    });
    this.validateOrRandomiseChoices();
    this.emit( 'close-lobby', this.choices )
    console.log(`Closing Lobby ${this.id} with choices: ${JSON.stringify(this.choices, false, 2)}`)
  }
};

export default Lobby;