import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../contexts/GameContext.js';
import WrapperForStates from './WrapperForStates.js';

function StateRestart(){
    const { isInLobby } = useContext( GameContext );

    useEffect( () => {
        if( isInLobby ){
            window.location.reload();
        }
    });

    return <WrapperForStates>
      
    </WrapperForStates>
}

export default StateRestart;