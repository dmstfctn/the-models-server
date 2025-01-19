import React, { useState, useEffect } from 'react';

import "./PlayInterface.css";

import CHARACTERS, { TENDENCIES } from '../shared/CHARACTERS.js';
import ROLES from '../shared/ROLES.js';
import PROPS from '../shared/PROPS.js';

function SelectTendencyInterface({active, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section className={`${(!active) ? 'disabled' : ''}`}> 
        <div className={`select-interface select-interface__character`}>
            {TENDENCIES.map( ( tendency, i ) => {
                return <div 
                    className={`select-option${tendency.name === selected?.name ? ' selected' : '' }`}
                    key={tendency.name}
                    onClick={()=>{
                        setSelected( tendency );
                        onSelect( tendency );
                    }}
                >
                    <div><strong>{tendency.name}</strong></div>
                    <div>{tendency.characters.map((c) => {return c.name}).join(', ')}</div>
                </div>
            })}
        </div>
    </section>
}

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
            {/* <SelectCharacterInterface 
                active={ shouldSelectMask1 }
                onSelect={ ( character ) => {
                    onSelect( ROLES.MASK1, character )
                }}
            /> */}
            <SelectTendencyInterface 
                active={ shouldSelectMask1 }
                onSelect={ ( tendency ) => {
                    onSelect( ROLES.MASK1, tendency )
                }}
            />
            <SelectPropInterface 
                active={ shouldSelectProp }
                onSelect={ ( character ) => {
                    onSelect( ROLES.PROP, character )
                }}
            />
            {/* <SelectCharacterInterface 
                active={ shouldSelectMask2 }
                onSelect={ ( character ) => {
                    onSelect( ROLES.MASK2, character )
                }}
            /> */}
            <SelectTendencyInterface 
                active={ shouldSelectMask2 }
                onSelect={ ( tendency ) => {
                    onSelect( ROLES.MASK2, tendency )
                }}
            />
        </article>
    </>
}

export default PlayInterface;