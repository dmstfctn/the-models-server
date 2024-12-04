const path = require('path');
const http = require('http');

const express = require('express');
const { Server, Socket } = require("socket.io");

const Config = require( './modules/Config.js' );
const PlayerManager = require( './modules/PlayerManager.js' );
const Unreal = require( './modules/Unreal.js' );

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	path: '/themodels'
});

app.get('/', (req, res) => {  
    res.sendFile( path.join(__dirname, 'public', 'index.html' ) );
});

const playerManager = new PlayerManager();
const unreal = new Unreal();

io.on('connection', (socket) => {
    unreal.connect( socket );
    
    socket.on('disconnect', function(){
        unreal.disconnect()
    });
    socket.on('setlang', function( data ){
        Config.interface_lang = data.language;
    });
});

io.of('/audience').on('connection', (socket) => {  
    const player = playerManager.addPlayer( socket );
    player.on('disconnect', () => {
        unreal.sendPlayerDisconnect( player );
    });
});



server.listen(5040, () => {
    console.log('listening on *:5040');
});
