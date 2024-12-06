import React, { useState, useEffect } from 'react';

import "./PlayInterface.css";

import CHARACTERS from '../shared/CHARACTERS.js';
import ROLES from '../shared/ROLES.js';
import PROPS from '../shared/PROPS.js';

function SelectCharacterInterface({active, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section className={`${(!active) ? 'disabled' : ''}`}> 
        <div className={`select-interface select-interface__character`}>
            {CHARACTERS.map( ( character, i ) => {
                return <div 
                    className={`select-option${character.name === selected?.name ? ' selected' : '' }`}
                    key={character.name}
                    onClick={()=>{
                        setSelected( character );
                        onSelect( character );
                    }}
                >
                    <div><strong>{character.name}</strong></div>
                    <div>{character.tendency}</div>
                </div>
            })}
        </div>
    </section>
}

function SelectPropInterface({active, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section className={`${(!active) ? 'disabled' : ''}`}>
        <div className={`select-interface select-interface__prop`}>
            {PROPS.map( ( prop, i ) => {
                return <div 
                    className={`select-option${prop.name === selected?.name ? ' selected' : '' }`}
                    key={prop.name}
                    onClick={()=>{
                        setSelected( prop );
                        onSelect( prop );
                    }}
                >
                    <div><strong>{prop.name}</strong></div>
                </div>
            })}
        </div>
    </section>;
}

function PlayInterface({ active, roles, onSelect=()=>{} }){
    const shouldSelectMask1 = !!roles.find( (r) => r.role === ROLES.MASK1 );
    const shouldSelectProp = !!roles.find( (r) => r.role === ROLES.PROP );
    const shouldSelectMask2 = !!roles.find( (r) => r.role === ROLES.MASK2 );


    return <>
        <article className={`play-interface${(!active) ? ' disabled' : ''}`}>
            <SelectCharacterInterface 
                active={ shouldSelectMask1 }
                onSelect={ ( character ) => {
                    onSelect( ROLES.MASK1, character )
                }}
            />
            <SelectPropInterface 
                active={ shouldSelectProp }
                onSelect={ ( character ) => {
                    onSelect( ROLES.PROP, character )
                }}
            />
            <SelectCharacterInterface 
                active={ shouldSelectMask2 }
                onSelect={ ( character ) => {
                    onSelect( ROLES.MASK2, character )
                }}
            />
        </article>
    </>
}

export default PlayInterface;