import React, { useState, useContext, useEffect } from 'react';

import { GameContext } from '../contexts/GameContext.js';

import CHARACTERS, { TENDENCIES } from '../shared/CHARACTERS.js';
import ROLES from '../shared/ROLES.js';
import PROPS from '../shared/PROPS.js';

import tendency_friendly from '../images/tendency-friendly.png';
import tendency_waluigi from '../images/tendency-waluigi.png';
import tendency_confabulate from '../images/tendency-confabulate.png';

import prop_mirror from '../images/prop-mirror.png';
import prop_globe from '../images/prop-globe.png';
import prop_cat from '../images/prop-cat.png';
import prop_moon from '../images/prop-moon.png';
import prop_apple from '../images/prop-apple.png';
import prop_ball from '../images/prop-ball.png';
import prop_calculator from '../images/prop-calculator.png';
import prop_calendar from '../images/prop-calendar.png';
import prop_english from '../images/prop-english.png';
import prop_glass from '../images/prop-glass.png';
import prop_latin from '../images/prop-latin.png';
import prop_lens from '../images/prop-lens.png';
import prop_maccheroni from '../images/prop-maccheroni.png';
import prop_sack from '../images/prop-sack.png';

import img_button from '../images/button.png';

const images = {
    friendly: tendency_friendly,
    waluigi: tendency_waluigi,
    confabulate: tendency_confabulate,
    mirror: prop_mirror,
    globe: prop_globe,
    cat: prop_cat,
    moon: prop_moon,
    apple: prop_apple,
    ball: prop_ball,
    calculator: prop_calculator,
    calendar: prop_calendar,
    english: prop_english,
    glass: prop_glass,
    latin: prop_latin,
    lens: prop_lens,
    maccheroni: prop_maccheroni,
    sack: prop_sack,
    button: img_button
};


function SelectTendencyInterface({ title, active, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section className='select-section'>
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
                    <img src={images[tendency.name]} />
                </div>
            })}
        </div>
    </section>
}

function SelectCharacterInterface({title, active, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section className='select-section'>
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
                    <img src={images[prop.name]} />
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
                title="Scegli un modello di intelligenza artificiale:"
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
                title={(shouldSelectMask1) ? `Scegli l'altro modello:` : `Scegli un modello di intelligenza artificiale:` }
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
                title="Scegli un oggetto da aggiungere sul palco:"
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
                <img src={images.button} />
            </button>
        </article>
    </>
}

export default PlayInterface;