import React, { useState, useEffect, useContext } from 'react';
import { getTxt, T } from '../translation.js';
import { GameContext } from '../contexts/GameContext.js';

function Onboarding({ onClick=()=>{} }){
    const {queueInfo, setQueueInfo, backdrop, isInLobby, setIsInLobby, roles, setRoles} = useContext(GameContext);
    
    return <div 
            className="app-onboarding" 
            onClick={ onClick }
    >
        <div className='inner'>
            <div>
                You have joined the queue to interact with The Models. 
            </div>
            <div>
                Up to 3 people at a time can choose AI characters and props to form the basis of an improvised scene on stage.
            </div>            
            <div>
                Do not re-scan the QR code or you will lose your place in the queue.
            </div>
            <div>
                <button>
                    Get started
                </button>
            </div>
        </div>
    </div>
}

export default Onboarding;