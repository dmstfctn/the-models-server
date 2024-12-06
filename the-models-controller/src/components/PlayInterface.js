import React, { useState, useEffect } from 'react';

import "./PlayInterface.css";

const Characters = [
    { 'name': 'arlecchino',	'tendency': 'waluigi' },
    { 'name': 'balanzone',  'tendency': 'confabulate' },
    { 'name': 'brighella',  'tendency': 'waluigi' },
    { 'name': 'colombina',  'tendency': 'friendly' },
    { 'name': 'pantalone',  'tendency': 'confabulate' },
    { 'name': 'pulcinella', 'tendency': 'friendly' }
];

const Props = [
    { 'name': 'globe' },
    { 'name': 'mirror' },
    { 'name': 'cat' }
];

const ROLES = {
    'PLAYER1': 0,
    'PROP': 1,
    'PLAYER2': 2 
}


function SelectCharacterInterface({active, onSelect=()=>{}}){
    const [isSelected, setIsSelected] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0)
    return <div className={`select-interface select-interface__character${(!active) ? ' disabled' : ''}`}>
        {Characters.map( ( character, i ) => {
            return <div 
                className={`select-option${i === selectedIndex ? ' selected' : '' }`}
                key={character.name}
                onClick={()=>{
                    onSelect( character );
                    setIsSelected( true );
                    setSelectedIndex( i );
                }}
            >
                <div><strong>{character.name}</strong></div>
                <div>{character.tendency}</div>
            </div>
        })}
    </div>
}

function SelectPropInterface({active, onSelect=()=>{}}){
    const [isSelected, setIsSelected] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0)
    return <div className={`select-interface select-interface__prop${(!active) ? ' disabled' : ''}`}>
        {Props.map( ( prop, i ) => {
            return <div 
                className={`select-option${i === selectedIndex ? ' selected' : '' }`}
                key={prop.name}
                onClick={()=>{
                    onSelect( prop );
                    setIsSelected( true );
                    setSelectedIndex( i );
                }}
            >
                <div><strong>{prop.name}</strong></div>
            </div>
        })}
    </div>
}

function PlayInterface({roles, onSelect=()=>{}}){
    const shouldSelectPlayer1 = !!roles.find( (r) => r.role === ROLES.PLAYER1 );
    const shouldSelectProp = !!roles.find( (r) => r.role === ROLES.PROP );
    const shouldSelectPlayer2 = !!roles.find( (r) => r.role === ROLES.PLAYER2 );

    return <>
        <article className="play-interface">
            <section>
                <SelectCharacterInterface 
                    active={ shouldSelectPlayer1 }
                    onSelect={ onSelect }
                />
            </section>
            <section>
                <SelectPropInterface 
                    active={ shouldSelectProp }
                    onSelect={ onSelect }
                />
            </section>
            <section>
                <SelectCharacterInterface 
                    active={ shouldSelectPlayer2 }
                    onSelect={ onSelect }
                />
            </section>
        </article>
    </>
}

export default PlayInterface;