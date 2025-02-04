const STATES = {
    'Idle': 0,
    'AcceptInput': 10,
    'ConstructStage': 20,
    'InstructCharacters': 30,
    'Play': 40,
    'Conclude': 50,
    'Restart': 60
}

export default STATES;

export const STATES_getName = function( state ){
    console.log('STATE:', state );
    const k = Object.keys( STATES );
    const v = Object.values( STATES );
    return k[v.indexOf( state )];
}

export const STATES_DEFAULT = STATES.Idle;