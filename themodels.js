import path from "path";
import http from "http";

import express from "express";

import { Server, Socket } from "socket.io";

import Config from './modules/Config.js';
import PlayerManager from './modules/PlayerManager.js';
import Unreal from './modules/Unreal.js';

import STATES from "./client/src/shared/STATES.js";

const __dirname = import.meta.dirname;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	path: '/themodels',
  connectionStateRecovery: {},
  cors: {
    origin: [
      "http://localhost:3000",
      "http://themodels.org",
      "https://themodels.org"
    ]
  }
});

app.get('/', (req, res) => {  
  res.sendFile( path.join(__dirname, '..', 'the-models-controller', 'build', 'index.html' ) );
});

app.use('/public', express.static(path.join(__dirname, '..', 'the-models-controller', 'build')));

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
  console.log('new player. send unreal state( ' + unreal.getState() + ' )' );
  setTimeout( function(){
    player.setMetaState( unreal.getState() );
  }, 1000 )
});

playerManager.on('begin-play', ( choices ) => {
  const valid = unreal.sendLoadAndBeginScript( choices );
  if( !valid ){
    console.log( 'unreal sez choices not valid' );
  }
});

playerManager.on( 'rate-script', ({ rating }) => {
  unreal.sendRateScript( rating );
});

unreal.on('send-state', ( state ) => {
  console.log('unreal on send-state, send ', state, 'to player manager, value = ', STATES[state] );
  playerManager.setState( state );
});

server.listen(5040, () => {
  console.log('listening on *:5040');
});
