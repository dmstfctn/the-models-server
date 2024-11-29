const path = require('path');
const http = require('http');

const express = require('express');
const { Server, Socket } = require("socket.io");
const { type } = require('os');
const { disconnect } = require('process');

const QueueManager = require( './modules/QueueManager.js' );
const Unreal = require( './modules/Unreal.js' );

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

const queue = new QueueManager();
const unreal = new Unreal();

io.on('connection', (socket) => {
    unreal.connect( socket );
    
    socket.on('disconnect', function(){
        unreal.disconnect()
    });
    socket.on('setlang', function( data ){
        interface_lang = data.language;
    })
});

io.of('/audience').on('connection', (socket) => {  
    const player = queue.add( socket );
    socket.emit('config', player.getConfig() );

    socket.on('choice', function( data ){
        console.log( 'choice', player.getConfig(), data )
        if( unrealSocket ){
	        unrealSocket.emit( 'control', {config: player.getConfig(), data} );
        }
    });
    socket.on('disconnect', function(){
        console.log('controller disconnected');
        queue.remove( player );
        if( unrealSocket ){
            unrealSocket.emit( 'player-disconnect', { config: player.getConfig() } );
        }
    });
    audience.queue.push( config );
});

server.listen(5040, () => {
    console.log('listening on *:5040');
});
