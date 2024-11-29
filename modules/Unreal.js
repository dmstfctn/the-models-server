const Backdrops = require( './Backdrops.js' );

const Unreal = function(){
    this.socket = false;
}
Unreal.prototype = {
    connect: function( socket ){
        this.socket = socket
        console.log( '==> Connected to Unreal')
    },
    disconnect: function(){
        this.socket = false;
        console.log('==> Disconnected from Unreal')
    },
    setupNext: function(){
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
        console.log( `Made ${this.countChoices} choices` );
    },
    sendSetConfiguration: function( dataFolder ){
        const configuration = { dataFolder };
        this.socket.emit( 'set-configuration', configuration );
    }
}

module.exports = Unreal;