import React, { useState, useEffect, useContext } from 'react';
import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';
import { GameContext } from '../contexts/GameContext.js';

import { getTxt, getImg, T, I } from '../translation.js';

import { RATING_MAX, RATING_MIN, NEGATIVE_SENTIMENT_THRESHOLD, AMMO_COUNT } from '../shared/Sentiment.js';

const mapNumRange = (num, inMin, inMax, outMin, outMax) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const ratingToPercent = (val) => mapNumRange( val, RATING_MIN, RATING_MAX, 0, 100 );

const BTN_RATE_LIMIT = 5;

function RateAndPressLimitedFeedbackButton({onClick=()=>{}, imgsrc, maxRate, maxPress}){
    const [lastPress,setLastPress] = useState(0);
    const [pressRemaining, setPressRemaining] = useState( maxPress );
    const [isEmpty,setIsEmpty] = useState( false );
    return <button 
        className={`feedback-button${(isEmpty) ? ' empty' : ''}`}
        onClick={() => {
            if( isEmpty ) return;
            const now = new Date().getTime();
            if( now - lastPress >= maxRate){
                onClick();
                setLastPress( now );
                const nuPressRemaining = pressRemaining - 1;
                setPressRemaining( nuPressRemaining );                
            }
            if( pressRemaining <= 1 ){
                setIsEmpty( true );
            }
        }}
    >
        <img 
            src={imgsrc} 
        />
        <div 
            className="ammo"
            style={{
                transform: `rotate(${(Math.random() * 10 ) - 5}deg)`
            }}
        >
            {pressRemaining}
        </div>
    </button>
}

function StatePlay(){
    const {rating, setRating, queueInfo} = useContext(GameContext)
    
    function adjustAndClampRating( change ){
        if( rating + change < RATING_MIN ){
            setRating( RATING_MIN );
            return RATING_MIN;
        } else if( rating + change > RATING_MAX ){
            setRating( RATING_MAX );
            return RATING_MAX;
        } else {
            const newRating = rating + change;
            setRating( newRating );
            return newRating;
        }
    }

    return <WrapperForStates> 
        <section className="app-interface">
            <div className="feedback-interface">
                <div>
                    <h1 className="section-title">{(queueInfo.isQueued) ? getTxt(T.IFLIKEQUEUED) : getTxt(T.IFLIKEOWN)}</h1>
                    <div className="feedback-interface-buttons">                    
                        <div className='feedback-interface-cell'>
                            <RateAndPressLimitedFeedbackButton 
                                imgsrc={getImg( I.button_coin )}
                                maxRate={BTN_RATE_LIMIT}
                                maxPress={AMMO_COUNT}
                                onClick={() => {
                                    socket.emit( 'rate-script', { rating: 1, type: 'coin', total: adjustAndClampRating( 1 ) })
                                }}
                            />
                        </div>
                        <div className='feedback-interface-cell'>
                            <RateAndPressLimitedFeedbackButton 
                                imgsrc={getImg( I.button_flower )}
                                maxRate={BTN_RATE_LIMIT}
                                maxPress={AMMO_COUNT}
                                onClick={() => {
                                    socket.emit( 'rate-script', { rating: 1, type: 'flower', total: adjustAndClampRating( 1 ) })
                                }}
                            />
                        </div>
                    </div>
                    <h1 className="section-title">
                        {getTxt( T.IFNOTLIKE )}
                    </h1>
                    <div className="feedback-interface-buttons">
                        <div className='feedback-interface-cell'>
                            <RateAndPressLimitedFeedbackButton 
                                imgsrc={getImg( I.button_tomati )}
                                maxRate={BTN_RATE_LIMIT}
                                maxPress={AMMO_COUNT}
                                onClick={() => {
                                    socket.emit( 'rate-script', { rating: -1, type: 'tomati', total: adjustAndClampRating( -1 ) });
                                }}
                            />
                        </div>
                        <div className='feedback-interface-cell'>
                            <RateAndPressLimitedFeedbackButton 
                                imgsrc={getImg( I.button_egg )}
                                maxRate={BTN_RATE_LIMIT}
                                maxPress={AMMO_COUNT}
                                onClick={() => {
                                    socket.emit( 'rate-script', { rating: -1, type: 'egg', total: adjustAndClampRating( -1 ) })
                                }}
                            />
                        </div>                        
                    </div>
                </div>
                <div>
                    {/* <h1 className="section-title">Il tuo voto:</h1> */}
                    <div className='feedback-interface-meta'>
                        <span className="label label__l">
                            {getTxt( T.DISLIKELABEL )}
                        </span>
                        <div className="negative-region" style={{width: ratingToPercent( NEGATIVE_SENTIMENT_THRESHOLD) + '%'}}></div>
                        <div className="indicator-track">
                            <div 
                                className="indicator"
                                style={{
                                    left: ratingToPercent( rating ) + '%'
                                }}
                            ></div>
                        </div>
                        <span className="label label__r">
                            {getTxt( T.LIKELABEL )}
                        </span>
                    </div>
                    <div 
                        className="section-title"
                        style={{
                            paddingBottom: "8px"
                        }}
                    >
                        {getTxt(T.DISLIKEINFO)}
                    </div>
                </div>
            </div>
        </section>
    </WrapperForStates>
}

export default StatePlay;