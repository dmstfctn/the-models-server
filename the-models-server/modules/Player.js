const EventEmitter = require( 'events' );
const Config = require( './Config.js' );
const ROLES = require( './ROLES.js' );

class Player extends EventEmitter {
    constructor( id, socket ){
        super();
        this.id = id;
        this.language = Config.interface_lang;
        console.log('player lang = ', this.language );
        this.ready = false;
        this.roles = [];
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
        this.socket.on( 'decision', ({ role, choice }) => {
            this.chooseForRole( role, choice );
            this.emit( 'decision' );
        });
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
        const r = this.roles.find( ( other ) => other.role === role );
        r.choice = choice;
    }

    getStatus(){

    }

    sendBeginGame(){
        this.socket.emit( 'begin-game', {
            roles: this.roles
        })
    }

    sendQueueUpdate( position, total ){
        this.socket.emit( 'queue-update', { position, total });
    }
};

module.exports = Player;