const EventEmitter = require( 'events' );
const Config = require( './Config.js' );
const ROLES = require( './ROLES.js' );

class Lobby extends EventEmitter {
    players = [];
    startTimeout = false;
    timeToStart = 15;
    choiceTimeout = false;
    timeToChoose = 30;
    possibleRoles = [ ROLES.PLAYER1, ROLES.PROP, ROLES.PLAYER2 ];
    maxPlayers = this.possibleRoles.length;
    constructor(){
        super();
    }

    addPlayer( player ){
        if( this.players.length < this.maxPlayers ){
            player.assignRole( this.possibleRoles.shift() )
            this.players.push( player );
            this.startJoinTimeout();
            return true;
        } else {
            return false;
        }
    }

    startJoinTimeout(){
        if( !this.startTimeout ){
            this.startTimeout = setInterval( () => {
                this.timeToStart -= 1;
                if( this.timeToStart <= 0 ){
                    clearInterval( this.startTimeout );
                    this.beginGame();
                }
            }, 1000 );
        }
    }

    startChoiceTimeout(){
        if( !this.choiceTimeout ){
            this.choiceTimeout = setInterval( () => {
                this.timeToChoose -= 1;
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
        this.players.forEach( ( player ) => {
            player.sendBeginGame();
        });
    }

    closeLobby(){

    }
};

module.exports = Lobby;