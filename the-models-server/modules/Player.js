const EventEmitter = require( 'events' );
const Config = require( './Config.js' );

class Player extends EventEmitter {
    constructor( id, socket ){
        super();
        this.id = id;
        this.language = Config.interface_lang;
        console.log('player lang = ', this.language );
        this.ready = false;
        this.socket = socket;
        this.socket.emit('config', this.getConfig() );
        this.setupEvents();
    }

    setupEvents(){
        this.socket.on( 'ready-to-play', () => {
            this.ready = true;
            this.emit( 'ready-to-play' );            
        });
        this.socket.on( 'disconnect', () => {
            this.emit( 'disconnect' );
        });
    }

    getConfig(){
        return {
            id: this.id, 
            language: this.language 
        };
    }

    sendQueueUpdate( position, total ){
        this.socket.emit( 'queue-update', { position, total });
    }
};

module.exports = Player;