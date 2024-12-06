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

  sendBeginPlay( choices ) {
    console.log('Unreal: sendBeginPlay(), choices=', choices);
    this.socket.emit('begin-play', { choices });
  }
}

export default Unreal;