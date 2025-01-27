import React, { useState, useEffect } from 'react';
import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';

function StatePlay(){
    return <WrapperForStates>
        <div className="text-info">
        
                 
        </div> 
        <section className="app-interface">    
            <h1>What do you think?</h1>
            <div className="feedback-interface">
                <button onClick={() => { socket.emit( 'rate-script', { rating: 1, type: 'coin' })}}>MONIES</button>
                <button onClick={() => { socket.emit( 'rate-script', { rating: 1, type: 'flower' })}}>FLOWER</button>
                <button onClick={() => { socket.emit( 'rate-script', { rating: -1, type: 'tomati' })}}>TOMATI</button>
                <button onClick={() => { socket.emit( 'rate-script', { rating: -1, type: 'egg' })}}>EGG</button>
            </div>
        </section>
    </WrapperForStates>
}

export default StatePlay;