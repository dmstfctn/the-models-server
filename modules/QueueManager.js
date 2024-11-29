const Player = require( './Player.js' );

const QueueManager = function(){
    this.alltime = 0;
    this.list = [];

    this.setupNextChoice();
}

QueueManager.prototype = {
    add: function( socket ){
        const player = new Player( this.alltime, socket );
        this.alltime++;
        this.list.push( player );
        return player;
    },
    remove: function( player ){
        const index = this.list.findIndex( ( other ) => other.id === player.id );
        console.log( `removing player with id: ${player.id}` );
        this.list.splice( index, 1 );
        console.log( `queue is ${this.list.length} long`);
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

module.exports = QueueManager;