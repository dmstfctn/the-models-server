import React, { useState, useEffect } from 'react';
import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';

function StatePlay(){
    const [rating, setRating] = useState(0);
    
    return <WrapperForStates>
        <div className="text-info">
        
                 
        </div> 
        <section className="app-interface">    
            <h1>What do you think?</h1>
            <div className="feedback-interface">
                <button onClick={() => { 
                    setRating( rating + 1 );
                    socket.emit( 'rate-script', { rating: 1, type: 'coin', total: rating })
                }}>MONIES</button>
                <button onClick={() => { 
                    setRating( rating + 1 );
                    socket.emit( 'rate-script', { rating: 1, type: 'flower', total: rating })
                }}>FLOWER</button>
                <button onClick={() => { 
                    setRating( rating - 1 );
                    socket.emit( 'rate-script', { rating: -1, type: 'tomati', total: rating })
                }}>TOMATI</button>
                <button onClick={() => { 
                    setRating( rating - 1 );
                    socket.emit( 'rate-script', { rating: -1, type: 'egg', total: rating })
                }}>EGG</button>
            </div>
        </section>
    </WrapperForStates>
}

export default StatePlay;