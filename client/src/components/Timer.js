import React from 'react';


function Timer({name, value, total}){
    return <div 
        className="timer"
        style={{
            opacity: (value <= 0) ? 0 : 1 
        }}
    >
        <div>Hai <span className="timer--value">{value}</span> secondi per comporre la scena.</div>
    </div>
}

export default Timer;