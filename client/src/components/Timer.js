import React from 'react';


function StateRestart({name, value, total}){
    return <div 
        className="timer"
        style={{
            opacity: (value <= 0) ? 0 : 1 
        }}
    >
        <div>{name}</div>
        <div>{value}/{total}</div>
    </div>
}

export default StateRestart;