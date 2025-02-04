import EventEmitter from 'events';

import STATES, {STATES_DEFAULT} from '../client/src/shared/STATES.js';
import ROLES from '../client/src/shared/ROLES.js';

class Unreal extends EventEmitter{
  socket;
  engineState = STATES_DEFAULT;
  constructor() {
    super();
  }

  connect(socket) {
    this.socket = socket
    console.log( 'Unreal: connect()' );

    this.socket.on('send-state', ( data ) =>{
      console.log('Unreal: on send-state, state=', data.state );
      this.engineState = STATES[data.state];
      this.emit('send-state', this.engineState );
    });

    this.socket.on('countdown-update', ( data ) => {
      const duration = Math.floor(data.duration);
      const progress = Math.floor(data.progress);
      const remaining = duration - progress;
      //console.log('Unreal: countdown-update', data)
      this.emit( 'countdown-update', {duration, remaining, progress} );
    });

    this.socket.on('countdown-end', () => {
      console.log('Unreal: countdown-end')
      this.emit( 'countdown-end' );
    });
  }

  disconnect() {
    this.socket = false;
    console.log('Unreal: disconnect()')
  }

  sendLoadAndBeginScript( choices  ) {
    console.log('Unreal: sendLoadAndBeginScript(), choices=', choices );
  
    const mask1Choice = choices.find( (other) => other.role === ROLES.MASK1 ).choice;
    const mask2Choice = choices.find( (other) => other.role === ROLES.MASK2 ).choice;
    const propChoice = choices.find( (other) => other.role === ROLES.PROP ).choice;
    const backdropChoice = choices.find( (other) => other.role === ROLES.BACKDROP ).choice;

    console.log( mask1Choice, mask2Choice );

    let masks = []

    if( mask1Choice.name === mask2Choice.name ){
      /* if same tendency, ensure the two masks are different */    
      const c1 = mask1Choice.characters;
      const m1 = c1[0];
      const m2 = c1[1];
      masks = [m1, m2];
    } else {
      /* if different tendencies, pick a random mask from each tendency */
      const c1 = mask1Choice.characters;
      const c2 = mask2Choice.characters;
      const m1 = c1[ Math.floor( c1.length * Math.random() )];
      const m2 = c2[ Math.floor( c2.length * Math.random() )];
      masks = [m1, m2];
    }

    //ensure the mask names are sent in the order they exist in the folders
    masks = masks.sort( (a, b) => parseInt( a.id ) - parseInt( b.id ) );

    const result = {};
    result[ROLES.MASK1] = {name: masks[0].name};
    result[ROLES.MASK2] = {name: masks[1].name};
    result[ROLES.PROP] = {name: propChoice.name};
    result[ROLES.BACKDROP] = {id: backdropChoice.id}
    
    console.log('PARSED CHOICES: ', result )

    if( this.socket ){
      this.socket.emit('load-and-begin-script', { choices: result });
    }

    return true;
  }

  sendRateScript( rating, playerSentiment ){
    if( this.socket ){
      this.socket.emit( 'rate-script', { 
        ...rating,  
        playerSentiment
      })
    }
  }

  getState(){
    console.log('UNREAL STATE:', this.engineState )
    return this.engineState;
  }
}

export default new Unreal();