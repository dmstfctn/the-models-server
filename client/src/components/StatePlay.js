import React, { useState, useEffect } from 'react';
import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';

function StatePlay(){
    return <WrapperForStates>
        <h1>PLAYING</h1>
        <button onClick={() => { socket.emit( 'rate-script', { rating: 1 })}}>MONIES</button>
        <br/>
        <button onClick={() => { socket.emit( 'rate-script', { rating: -1 })}}>TOMATI</button>
    </WrapperForStates>
}

export default StatePlay;