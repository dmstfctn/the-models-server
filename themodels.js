const path = require('path');
const http = require('http');

const express = require('express');
const { Server, Socket } = require("socket.io");
const { type } = require('os');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	path: '/themodels'
});

app.get('/', (req, res) => {  
    res.sendFile( path.join(__dirname, 'public', 'index.html' ) );
});

let unrealSocket = false;

let interface_lang = 'english';

const players = {
    alltime: 0,
    max: Infinity,
    active: []
}

const removePlayer = function( config ){
    const playerIndex = players.active.findIndex( (p) => p.id === config.id );
    console.log('removing player with id: ' + config.id );
    players.active.splice( playerIndex, 1 );
    console.log( players.active.length + ' players remaining' );
}

io.on('connection', (socket) => {
    unrealSocket = socket;   
    console.log( '==> Connected to Unreal')
    socket.on('disconnect', function(){
       unrealSocket = false;
       console.log('==> Disconnected from Unreal')
    });
    socket.on('setlang', function( data ){
        interface_lang = data.language;
    })

});


io.of('/controller').on('connection', (socket) => {  
//for( let i = 0; i < 100; i++ ){
//	const offX = Math.random() - 0.5;
//	const offY = Math.random() - 0.5; 
   if( players.active.length >= players.max ){
        console.log( 'max players reached: ', players.max );
    }
    const config = {
        id: players.alltime,
	language: interface_lang
    }
    players.alltime++;
    socket.emit('config', config);
    if( unrealSocket ){
        unrealSocket.emit( 'player-connect', {config} );
    }
    socket.on('control', function( data ){
        console.log( 'control', config, data )
        if( unrealSocket ){
	    unrealSocket.emit( 'control', {config, data} );
//            unrealSocket.emit('control', { config, data: {x: data.x + offX, y: data.y + offY, pressed: data.pressed }} );
        }
    });
    socket.on('disconnect', function(){
        console.log('controller disconnected');
        removePlayer( config );
        if( unrealSocket ){
            unrealSocket.emit( 'player-disconnect', { config } );
        }
    });
    players.active.push( config );
//}
});

server.listen(5040, () => {  
    console.log('listening on *:5040');
});
