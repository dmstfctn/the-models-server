import React, { useState, useEffect } from 'react';

import WrapperForStates from './WrapperForStates.js';

function StateRestart(){
    window.location.reload();

    return <WrapperForStates>
        <h1>Restart</h1>
    </WrapperForStates>
}

export default StateRestart;