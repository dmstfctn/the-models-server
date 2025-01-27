import React, { useState, useContext } from 'react';

import "./PlayInterface.css";

import { GameContext } from '../contexts/GameContext.js';

import CHARACTERS, { TENDENCIES } from '../shared/CHARACTERS.js';
import ROLES from '../shared/ROLES.js';
import PROPS from '../shared/PROPS.js';

function SelectTendencyInterface({title,active, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section>
        <h1>{title}</h1>
        <div className={`select-interface select-interface__character ${(!active) ? 'disabled' : ''}`}> 
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

function SelectCharacterInterface({title, active, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section>
        <h1>{title}</h1>
        <div className={`select-interface select-interface__character ${(!active) ? ' disabled' : ''}`}>         
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

function SelectPropInterface({title, active, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section className='select-section'>
        <h1>{title}</h1>
        <div className={`select-interface select-interface__prop ${(!active) ? 'disabled' : ''}`}>
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
            })}s
        </div>
    </section>;
}

function PlayInterface({ active, roles, onSelect=()=>{} }){
    const {queueInfo, setQueueInfo, backdrop} = useContext(GameContext);
    const shouldSelectMask1 = !!roles.find( (r) => r.role === ROLES.MASK1 );
    const shouldSelectProp = !!roles.find( (r) => r.role === ROLES.PROP );
    const shouldSelectMask2 = !!roles.find( (r) => r.role === ROLES.MASK2 );
    const [choices, setChoices] = useState({})


    return <>
        <article className={`play-interface${(!active) ? ' disabled' : ''}`}>
            {(backdrop) ? 
            <p><strong>Setting for the next play:</strong><br></br>{backdrop.description}</p>
            : ''} 
            {/* <SelectCharacterInterface 
                active={ shouldSelectMask1 }
                onSelect={ ( character ) => {
                    onSelect( ROLES.MASK1, character )
                }}
            /> */}
            { shouldSelectMask1 ? <SelectTendencyInterface 
                active={ shouldSelectMask1 }
                title="Mask 1"
                onSelect={ ( tendency ) => {
                    const c = {}
                    for( let i in choices ){
                        c[i] = choices[i]
                    }
                    c[ROLES.MASK1] = tendency;
                    setChoices( c );                  
                }}
            /> : '' }
            { shouldSelectProp ? <SelectPropInterface 
                active={ shouldSelectProp }
                title="Prop"
                onSelect={ ( prop ) => {
                    const c = {}
                    for( let i in choices ){
                        c[i] = choices[i]
                    }
                    c[ROLES.PROP] = prop;
                    setChoices( c );
                }}
            /> : '' }
            {/* <SelectCharacterInterface 
                active={ shouldSelectMask2 }
                onSelect={ ( character ) => {
                    onSelect( ROLES.MASK2, character )
                }}
            /> */}
            { shouldSelectMask2 ? <SelectTendencyInterface 
                title="Mask 2"
                active={ shouldSelectMask2 }
                onSelect={ ( tendency ) => {
                    const c = {}
                    for( let i in choices ){
                        c[i] = choices[i]
                    }
                    c[ROLES.MASK2] = tendency;
                    setChoices( c );
                }}
            /> : '' }
            <button 
                className="button button--choose"
                onClick={() => { 
                    console.log( choices )
                    for( let i in choices ){
                        onSelect( parseInt(i), choices[i] )
                    }
                }}
            >
                CHOICE COMPLETE
            </button>
        </article>
    </>
}

export default PlayInterface;