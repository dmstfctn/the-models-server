const Player = require( './Player.js' );
const Backdrops = require( './Backdrops.js' );
const Lobby = require( './Lobby.js' );

const PlayerManager = function(){
    this.allTimeCount = 0;
    this.list = [];
    this.queue = [];
    this.lobby = false;
    this.setupNextChoice();
}

PlayerManager.prototype = {
    addPlayer: function( socket ){
        const player = new Player( this.allTimeCount, socket );
        this.allTimeCount++;
        this.list.push( player );

        player.sendQueueUpdate( false, this.queue.length );

        player.on('disconnect', () => {
            this.removePlayerFromQueue( player );
            this.removePlayerFromList( player );
        });

        player.on( 'ready-to-play', () => {
            this.addPlayertoQueue( player );
        });

        return player;
    },
    removePlayerFromList: function( player ){
        const index = this.list.findIndex( ( other ) => other.id === player.id );
        console.log( `removing player with id from LIST: ${player.id}` );
        this.list.splice( index, 1 );
        console.log( `list is ${this.list.length} long`);
    },
    addPlayertoQueue: function( player ){
        if( !this.isPlayerQueued( player ) ){
            this.queue.push( player );
            this.queueRefresh();
            if( !this.lobby ){
                this.lobby = new Lobby();
            }
            const inLobby = this.lobby.addPlayer( player );
        }
    },
    removePlayerFromQueue: function( player ){
        const index = this.queue.findIndex( ( other ) => other.id === player.id );
        console.log( `removing player with id from QUEUE ${player.id}` );
        this.queue.splice( index, 1 );
        console.log( `queue is ${this.list.length} long`);
        this.queueRefresh();
    },
    isPlayerQueued: function( player ){
        console.log( 'PlayerManager . isPlayerQueued()' );
        console.log( this.queue );
        console.log( this.queue.find( ( other ) => other.id === player.id ) );
        return !!this.queue.find( ( other ) => other.id === player.id );
    },
    queueRefresh: function(){
        this.queue.forEach( ( player, i ) => {
            player.sendQueueUpdate( i + 1, this.queue.length );
        });
    },
    setupNextChoice: function(){
        this.choices = {
            backdrop: Backdrops.getRandom(),
            mask1: false,
            mask2: false,
            prop: false
        }
    },
    countChoices: function(){
        return Object.values( this.choices ).reduce( ( acc, c ) => (!!c) ? acc + 1 : acc );
    },
    makeChoice: function( choice, value ){
        if( !!this.choices[ choice ] ){
            this.choices[ choice ] = value;
        }
        console.log( `Made ${this.countChoices()} choices` );
    },
}

module.exports = PlayerManager;