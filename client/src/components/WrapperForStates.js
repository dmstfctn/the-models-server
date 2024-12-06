import React, { useState, useEffect } from 'react';

function WrapperForStates({ children }){
    return <div className="app-state">
        {children}
    </div>
}

export default WrapperForStates;