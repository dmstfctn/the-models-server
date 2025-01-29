import React, { useState, useEffect, useContext } from 'react';
import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';
import { GameContext } from '../contexts/GameContext.js';

function StatePlay(){
    const {rating, setRating} = useContext(GameContext)
    
    return <WrapperForStates>
        <div className="text-info">
        
                 
        </div> 
        <section className="app-interface">    
            <h1>What do you think?</h1>
            <div className="feedback-interface">
                <button onClick={() => {
                    socket.emit( 'rate-script', { rating: 1, type: 'coin', total: rating + 1 })
                    setRating( rating + 1 );
                }}>MONIES</button>
                <button onClick={() => {
                    socket.emit( 'rate-script', { rating: 1, type: 'flower', total: rating + 1 })
                    setRating( rating + 1 );
                }}>FLOWER</button>
                <button onClick={() => {
                    socket.emit( 'rate-script', { rating: -1, type: 'tomati', total: rating - 1 })
                    setRating( rating - 1 );
                }}>TOMATI</button>
                <button onClick={() => {
                    socket.emit( 'rate-script', { rating: -1, type: 'egg', total: rating - 1 })
                    setRating( rating - 1 );
                }}>EGG</button>
            </div>
        </section>
    </WrapperForStates>
}

export default StatePlay;