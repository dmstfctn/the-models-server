import EventEmitter from 'events';

class Unreal extends EventEmitter{
  socket;
  constructor() {
    super();
  }

  connect(socket) {
    this.socket = socket
    console.log('Unreal: connect()')

    this.socket.on('send-state', ( data ) =>{
      console.log('Unreal: on send-state, state=', data.state );
      this.emit('send-state', data.state );
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
}

export default Unreal;