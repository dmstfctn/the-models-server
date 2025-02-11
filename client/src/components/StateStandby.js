import React, { useState, useEffect } from 'react';

import WrapperForStates from './WrapperForStates.js';

function StateStandby(){
    return <WrapperForStates>
        <section className="app-standby">
            <div>
                Stand by. Once the next sketch begins, you will be able to give feedback to the masks.
            </div>
        </section>
    </WrapperForStates>
}

export default StateStandby;