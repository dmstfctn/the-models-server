import React, { useState, useEffect } from 'react';

import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';

function StateConclude(){
    return <WrapperForStates>
        <h1>Conclude</h1>
        <button onClick={() => { socket.emit( 'rate-script', { rating: 1 })}}>&lt;3 It</button>
    </WrapperForStates>
}

export default StateConclude;