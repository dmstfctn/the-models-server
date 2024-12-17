import EventEmitter from 'events';

import STATES from '../client/src/shared/STATES.js';

class Unreal extends EventEmitter{
  socket;
  engineState = STATES.Idle;
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

  sendLoadAndBeginScript( choices ) {
    console.log('Unreal: sendLoadAndBeginScript(), choices=', choices);
    this.socket.emit('load-and-begin-script', { choices });
  }

  sendRateScript( rating ){
    this.socket.emit( 'rate-script', { rating })
  }

  getState(){
    console.log('UNREAL STATE:', this.engineState )
    return this.engineState;
  }
}

export default Unreal;