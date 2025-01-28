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
    console.log('Unreal: connect()')

    this.socket.on('send-state', ( data ) =>{
      console.log('Unreal: on send-state, state=', data.state );
      this.engineState = STATES[data.state];
      this.emit('send-state', this.engineState );
    })
  }

  disconnect() {
    this.socket = false;
    console.log('Unreal: disconnect()')
  }

  sendLoadAndBeginScript( choicesRaw  ) {
    console.log('Unreal: sendLoadAndBeginScript(), choices=', choicesRaw );
    for( let c in choicesRaw ){
      if( !choicesRaw[c] ){
        return false;
      }
    }
    const choices = {}
    choices[ROLES.PROP] = { name: choicesRaw[ROLES.PROP].name };
    choices[ROLES.BACKDROP] = { id: choicesRaw[ROLES.BACKDROP].id };

    let masks = []

    if( choicesRaw[ROLES.MASK1].name === choicesRaw[ROLES.MASK2].name ){
      /* if same tendency, ensure the two masks are different */    
      const c1 = choicesRaw[ROLES.MASK1].characters;
      const m1 = c1[0];
      const m2 = c1[1];
      masks = [m1, m2];
    } else {
      /* if different tendencies, pick a random mask from each tendency */
      const c1 = choicesRaw[ROLES.MASK1].characters;
      const c2 = choicesRaw[ROLES.MASK2].characters;
      const m1 = c1[ Math.floor( c1.length * Math.random() )];
      const m2 = c2[ Math.floor( c2.length * Math.random() )];
      masks = [m1, m2];
    }

    //ensure the mask names are sent in the order they exist in the folders
    masks = masks.sort( (a, b) => parseInt( a.id ) - parseInt( b.id ) );

    choices[ROLES.MASK1] = {name: masks[0].name}
    choices[ROLES.MASK2] = {name: masks[1].name}

    console.log('PARSED CHOICES: ', choices )

    if( this.socket ){
      this.socket.emit('load-and-begin-script', { choices });
    }

    return true;
  }

  sendRateScript( rating ){
    if( this.socket ){
      this.socket.emit( 'rate-script', rating )
    }
  }

  getState(){
    console.log('UNREAL STATE:', this.engineState )
    return this.engineState;
  }
}

export default Unreal;