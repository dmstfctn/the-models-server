import React, { useState, useContext, useEffect } from 'react';

import { GameContext } from '../contexts/GameContext.js';

import { getTxt, getImg, T, I } from '../translation.js';

import CHARACTERS, { TENDENCIES } from '../shared/CHARACTERS.js';
import ROLES from '../shared/ROLES.js';
import PROPS from '../shared/PROPS.js';


function SelectTendencyInterface({ title, active, layer=0, reverse=false, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    let interfaceEles = TENDENCIES.map( ( tendency, i ) => {
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
    })

    if( reverse ) interfaceEles = interfaceEles.reverse();

    return <section 
        className={`select-section${(active) ? ' select-section__active' : ''}`}
        style={{zIndex: layer}}
    >
        <h1 className="section-title section-title__bright">{title}</h1>
        <div className={`select-interface select-interface__character ${(!active) ? 'disabled' : ''}`}> 
            { interfaceEles }
        </div>
    </section>
}

function SelectPropInterface({title, active, layer=0, onSelect=()=>{} }){
    const [selected, setSelected] = useState();
    return <section 
        className={`select-section${(active) ? ' select-section__active' : ''}`} 
        style={{zIndex: layer}
    }>
        <h1 className="section-title section-title__bright">{title}</h1>
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
    </section>
}

function PlayInterface({ active, roles, onSelect=()=>{}, onComplete=()=>{} }){
    const {queueInfo, setQueueInfo, backdrop} = useContext(GameContext);
    const shouldSelectMask1 = !!roles.find( (r) => r.role === ROLES.MASK1 );
    const shouldSelectProp = !!roles.find( (r) => r.role === ROLES.PROP );
    const shouldSelectMask2 = !!roles.find( (r) => r.role === ROLES.MASK2 );
    const [choices, setChoices] = useState({});
    const [isChoiceComplete, setIsChoiceComplete] = useState( false );

    useEffect(() => {
        if( Object.keys( choices ).length === roles.length && !isChoiceComplete){
            setIsChoiceComplete( true );
            console.log('Choices complete: ', choices );
            for( let i in choices ){
                onSelect( parseInt(i), choices[i] )
            }
            onComplete( choices );
        }
    }, [choices])

    return <>
        <article className={`play-interface${(!active) ? ' disabled' : ''}`}>
            <SelectTendencyInterface 
                active={ shouldSelectMask1 && !choices[ROLES.MASK1] }
                title={`${getTxt(T.SELECTAI)}:`}
                layer={3}
                onSelect={ ( tendency ) => {
                    const c = {}
                    for( let i in choices ){
                        c[i] = choices[i]
                    }
                    c[ROLES.MASK1] = tendency;
                    setChoices( c );
                }}
            />
            <SelectTendencyInterface 
                title={(shouldSelectMask1) ? `${getTxt(T.SELECTANOTHERAI)}:` : `${getTxt(T.SELECTAI)}:` }
                active={ shouldSelectMask2  && !choices[ROLES.MASK2] }
                layer={2}
                reverse={true}
                onSelect={ ( tendency ) => {
                    const c = {}
                    for( let i in choices ){
                        c[i] = choices[i]
                    }
                    c[ROLES.MASK2] = tendency;
                    setChoices( c );
                }}
            />
            <SelectPropInterface 
                active={ shouldSelectProp && !choices[ROLES.PROP] }
                title={(shouldSelectMask1 && shouldSelectMask2) ? getTxt(T.SELECTFINALPROP) : getTxt(T.SELECTPROP)}
                layer={1}
                onSelect={ ( prop ) => {
                    const c = {}
                    for( let i in choices ){
                        c[i] = choices[i]
                    }
                    c[ROLES.PROP] = prop;
                    setChoices( c );                    
                }}
            />
            <div>
               <div className='app-meta--block app-meta--block__bright'>
                    {getTxt(T.WAITFORCHOICE)}
                </div>
            </div>
        </article>
    </>
}

export default PlayInterface;