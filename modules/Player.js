const Player = function( id, socket ){
    this.id = id;
    this.language = interface_lang;
    this.socket = socket;
}

Player.prototype = {
    getConfig: function(){
        return {id: this.id, language: this.language };
    }
}

module.exports = Player;