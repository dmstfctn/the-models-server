import React, { useState, useEffect } from 'react';
import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';

function StatePlay(){
    return <WrapperForStates>
        <h1>PLAYING</h1>
        <button onClick={() => { socket.emit( 'audience-input', { value: 1 })}}>CHEER</button>
        <br/>
        <button onClick={() => { socket.emit( 'audience-input', { value: -1 })}}>BOO</button>
    </WrapperForStates>
}

export default StatePlay;