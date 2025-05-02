import React, { useState, useContext, useEffect } from 'react';

import { GameContext } from '../contexts/GameContext.js';

import { getTxt, getImg, T, I } from '../translation.js';

import CHARACTERS, { TENDENCIES } from '../shared/CHARACTERS.js';
import ROLES from '../shared/ROLES.js';
import PROPS from '../shared/PROPS.js';


function SelectTendencyInterface({ title, active, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section className='select-section'>
        <h1 className="section-title">{title}</h1>
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
                    <img src={getImg( I[tendency.name] )} />
                </div>
            })}
        </div>
    </section>
}

function SelectCharacterInterface({title, active, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section className='select-section'>
        <h1 className="section-title">{title}</h1>
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
        <h1 className="section-title">{title}</h1>
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
                    <img src={getImg( I[prop.name] )} />
                </div>
            })}
        </div>
    </section>;
}

function PlayInterface({ active, roles, onSelect=()=>{}, onComplete=()=>{} }){
    const {queueInfo, setQueueInfo, backdrop} = useContext(GameContext);
    const shouldSelectMask1 = !!roles.find( (r) => r.role === ROLES.MASK1 );
    const shouldSelectProp = !!roles.find( (r) => r.role === ROLES.PROP );
    const shouldSelectMask2 = !!roles.find( (r) => r.role === ROLES.MASK2 );
    const [choices, setChoices] = useState({})
    const [isChoiceComplete, setIsChoiceComplete] = useState( false );

    useEffect(() => {
        if( Object.keys( choices ).length === roles.length ){
            setIsChoiceComplete( true );
        }
    })

    return <>
        <article className={`play-interface${(!active) ? ' disabled' : ''}`}>
            {/* <SelectCharacterInterface 
                active={ shouldSelectMask1 }
                onSelect={ ( character ) => {
                    onSelect( ROLES.MASK1, character )
                }}
            /> */}
            { shouldSelectMask1 ? <SelectTendencyInterface 
                active={ shouldSelectMask1 }
                title={`${getTxt(T.SELECTAI)}:`}
                onSelect={ ( tendency ) => {
                    const c = {}
                    for( let i in choices ){
                        c[i] = choices[i]
                    }
                    c[ROLES.MASK1] = tendency;
                    setChoices( c );                  
                }}
            /> : '' }
            { shouldSelectMask2 ? <SelectTendencyInterface 
                title={(shouldSelectMask1) ? `${getTxt(T.SELECTANOTHERAI)}:` : `${getTxt(T.SELECTAI)}:` }
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
            { shouldSelectProp ? <SelectPropInterface 
                active={ shouldSelectProp }
                title={`${getTxt(T.SELECTPROP)}:`}
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
            <button 
                className={`play-button${(isChoiceComplete) ? ' active' : ''}`}
                disabled={ !isChoiceComplete }
                onClick={() => { 
                    console.log( choices )
                    for( let i in choices ){
                        onSelect( parseInt(i), choices[i] )
                    }
                    onComplete( choices );
                }}
            >
                <img src={getImg( I.button )} />
            </button>
        </article>
    </>
}

export default PlayInterface;