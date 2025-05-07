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
                {getTxt( T.HOWTO1 )}
            </div>
            <div>
                {getTxt( T.HOWTO2 )}
            </div>            
            <div>
                {getTxt( T.HOWTO3 )}
            </div>
            <div>
                <button>
                    {getTxt( T.START )}
                </button>
            </div>
        </div>
    </div>
}

export default Onboarding;