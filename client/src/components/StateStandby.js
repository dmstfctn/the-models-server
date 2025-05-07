import React, { useState, useEffect } from 'react';

import WrapperForStates from './WrapperForStates.js';
import { getTxt, T } from '../translation.js';

function StateStandby(){
    return <WrapperForStates>
        <section className="app-standby">
            <div className="app-meta--block">
                {getTxt( T.STANDBY )}
            </div>
        </section>
    </WrapperForStates>
}

export default StateStandby;