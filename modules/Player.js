import EventEmitter from 'events';


import STATES from '../client/src/shared/STATES.js';

let counter = 0;
//const PLAYER_LIFESPAN = 10000;
const PLAYER_LIFESPAN = 60000 * 30;


class Player extends EventEmitter {
  socket;
  id
  language;
  ready = false;
  roles = [];
  choiceCount = 0;
  complete = false;
  metaState = STATES.Idle;
  sentiment = 0;
  lifeTimeout = false;
  constructor( socket ){
    super();
    this.id = counter;
    counter++;
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

  keepAlive(){
    clearInterval( this.lifeTimeout );
    this.lifeTimeout = setTimeout( () => {
      this.socket.emit( 'check-alive' );
      this.lifeTimeout = setTimeout( () => {
        console.log( 'Player ' + this.id + ' dead.' );
        this.socket.emit( 'dead' );
        this.emit('disconnect');
      });
    }, PLAYER_LIFESPAN );
  }

  setupEvents(){
    this.socket.on( 'ready-to-play', () => {
      this.setReadyToPlay();
      this.keepAlive();
    });
    this.socket.on( 'keep-alive', () => {
      this.keepAlive();
    })
    this.socket.on( 'disconnect', () => {
      this.emit( 'disconnect' );
    });
    this.socket.on( 'decision', ({ role, choice }) => {
      this.chooseForRole( role, choice );
      this.emit( 'decision' );
      this.keepAlive();
    });
    this.socket.on('choices-complete', (choices) => {
      console.log('PLAYER CHOICES COMPLETE')
      for( let role in choices ){
        this.chooseForRole( role, choices[role] );
      }
      this.sendChoicesComplete();
      this.keepAlive();
    });
    this.socket.on( 'rate-script', ( rating ) => {
      this.sentiment = rating.total;
      console.log('emit: rate-script, rating=', rating )
      this.emit( 'rate-script', rating )
      this.keepAlive();
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
    // if( this.choiceCount >= this.roles.length ){
    //   this.sendChoicesComplete();
    // }
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
    this.complete = true;
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