import EventEmitter from 'events';
import Config from './Config.js';

import STATES from '../client/src/shared/STATES.js';

class Player extends EventEmitter {
  socket;
  id;
  language;
  ready = false;
  roles = [];
  choiceCount = 0;
  complete = false;
  metaState = STATES.Idle;
  sentiment = 0;
  constructor( id, socket ){
    super();
    this.id = id;
    this.language = Config.interface_lang;    
    this.socket = socket;
    this.socket.emit('config', this.getConfig() );
    this.setupEvents();
  }

  setMetaState( state ){
    this.metaState = state;
    console.log('player set to state: ', this.metaState );
    this.socket.emit( 'set-meta-state', this.metaState );
  }

  setReadyToPlay(){
    this.ready = true;
    this.emit( 'ready-to-play' );  
  }

  reset(){
    this.ready = false;
    this.roles = [];
    this.choiceCount = 0;
    this.complete = false;
  }

  setupEvents(){
    this.socket.on( 'ready-to-play', () => {
      this.setReadyToPlay();  
    });
    this.socket.on( 'disconnect', () => {
      this.emit( 'disconnect' );
    });
    this.socket.on( 'decision', ({ role, choice }) => {
      this.chooseForRole( role, choice );
      this.emit( 'decision' );
    });
    this.socket.on('choices-complete', (choices) => {
      for( let role in choices ){
        this.chooseForRole( role, choices[role] );
      }
    });
    this.socket.on( 'rate-script', ( rating ) => {
      this.sentiment = rating.total;
      console.log('emit: rate-script, rating=', rating )
      this.emit( 'rate-script', rating )
    })
  }

  getConfig(){
    return {
      id: this.id, 
      language: this.language 
    };
  }

  assignRole( role ){
    this.roles = [{
      role: role,
      choice: false
    }]; 
  }

  addRole( role ){
    this.roles.push({
      role: role,
      choice: false
    });
  }

  chooseForRole( role, choice ){
    console.log( 'chooseForRole()', 'role=', role, 'choice=', choice );
    const r = this.roles.find( ( other ) => parseInt(other.role) === parseInt(role) );
    r.choice = choice;
    this.choiceCount++;
    if( this.choiceCount >= this.roles.length ){
      this.complete = true;
      this.sendChoicesComplete();
    }
  }

  getStatus(){

  }

  sendBeginGame(){
    this.socket.emit( 'begin-game', {
      roles: this.roles
    })
  }

  sendUpdateTimer( name, value, total ){
    this.socket.emit( 'update-timer', {
      name,
      value,
      total
    });
  }

  sendChoicesComplete(){
    this.emit( 'choices-complete', { roles: this.roles });
    this.socket.emit( 'choices-complete', { roles: this.roles });
  }
  
  sendQueueUpdate( position, total ){
    this.socket.emit( 'queue-update', { position, total });
  }

  sendSetBackdrop( backdrop ){
    this.socket.emit( 'set-backdrop', {
      backdrop
    })
  }
};

export default Player;