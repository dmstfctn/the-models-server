const Player = require( './Player.js' );
const Backdrops = require( './Backdrops.js' );

const PlayerManager = function(){
    this.allTimeCount = 0;
    this.list = [];
    this.queue = [];
    this.setupNextChoice();
}

PlayerManager.prototype = {
    addPlayer: function( socket ){
        const player = new Player( this.allTimeCount, socket );
        this.allTimeCount++;
        this.list.push( player );

        player.on('disconnect', () => {
            this.removePlayer( player );
        });

        player.on( 'ready-to-play', () => {
            if( !this.isPlayerQueued( player ) ){
                this.queue.push( player );                
                this.queueRefresh();
            }
        });

        return player;
    },
    removePlayer: function( player ){
        const index = this.list.findIndex( ( other ) => other.id === player.id );
        console.log( `removing player with id: ${player.id}` );
        this.list.splice( index, 1 );
        console.log( `queue is ${this.list.length} long`);
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