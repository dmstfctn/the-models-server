import React from 'react';


import { getTxt, T } from '../translation.js';


function Timer({name, value, total}){
    return <div 
        className="timer"
        style={{
            opacity: (value <= 0) ? 0 : 1 
        }}
    >
        <div>{getTxt(T.TIMENEXT1)} <span className="timer--value">{value}</span> {getTxt(T.TIMENEXT2)}</div>
    </div>
}

export default Timer;