import React from 'react';


function Timer({name, value, total}){
    return <div 
        className="timer"
        style={{
            opacity: (value <= 0) ? 0 : 1 
        }}
    >
        <div>{name}: {value}/{total}</div>
    </div>
}

export default Timer;