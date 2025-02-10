import React, { useState, useEffect, useContext } from 'react';
import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';
import { GameContext } from '../contexts/GameContext.js';

import img_btn_coin from '../images/button-coin.png';
import img_btn_flower from '../images/button-flower.png';
import img_btn_tomati from '../images/button-tomati.png';
import img_btn_egg from '../images/button-egg.png';

import { RATING_MAX, RATING_MIN, NEGATIVE_SENTIMENT_THRESHOLD } from '../shared/Sentiment.js';

const mapNumRange = (num, inMin, inMax, outMin, outMax) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const ratingToPercent = (val) => mapNumRange( val, RATING_MIN, RATING_MAX, 0, 100 );

const BTN_RATE_LIMIT = 5;
const BTN_AMMO_LIMIT = 5;

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
                    <h1 className="section-title">{`${(queueInfo.isQueued) ? `Nel frattempo.. s` : `S`}e ti piace la scena`}</h1>
                    <div className="feedback-interface-buttons">                    
                        <div className='feedback-interface-cell'>
                            <RateAndPressLimitedFeedbackButton 
                                imgsrc={img_btn_coin}
                                maxRate={BTN_RATE_LIMIT}
                                maxPress={BTN_AMMO_LIMIT}
                                onClick={() => {
                                    socket.emit( 'rate-script', { rating: 1, type: 'coin', total: adjustAndClampRating( 1 ) })
                                }}
                            />
                        </div>
                        <div className='feedback-interface-cell'>
                            <RateAndPressLimitedFeedbackButton 
                                imgsrc={img_btn_flower}
                                maxRate={BTN_RATE_LIMIT}
                                maxPress={BTN_AMMO_LIMIT}
                                onClick={() => {
                                    socket.emit( 'rate-script', { rating: 1, type: 'flower', total: adjustAndClampRating( 1 ) })
                                }}
                            />
                        </div>
                    </div>
                    <h1 className="section-title">Se non ti piace</h1>
                    <div className="feedback-interface-buttons">
                        <div className='feedback-interface-cell'>
                            <RateAndPressLimitedFeedbackButton 
                                imgsrc={img_btn_tomati}
                                maxRate={BTN_RATE_LIMIT}
                                maxPress={BTN_AMMO_LIMIT}
                                onClick={() => {
                                    socket.emit( 'rate-script', { rating: -1, type: 'tomati', total: adjustAndClampRating( -1 ) });
                                }}
                            />
                        </div>
                        <div className='feedback-interface-cell'>
                            <RateAndPressLimitedFeedbackButton 
                                imgsrc={img_btn_egg}
                                maxRate={BTN_RATE_LIMIT}
                                maxPress={BTN_AMMO_LIMIT}
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
                        <div className="negative-region" style={{width: ratingToPercent( NEGATIVE_SENTIMENT_THRESHOLD) + '%'}}></div>
                        <div className="indicator-track">
                            <div 
                                className="indicator"
                                style={{
                                    left: ratingToPercent( rating ) + '%'
                                }}
                            ></div>
                        </div>
                    </div>
                    <div 
                        className="section-title"
                        style={{
                            paddingBottom: "8px"
                        }}
                    >
                        Se la scena non piace verrá interrotta
                    </div>
                </div>
            </div>
        </section>
    </WrapperForStates>
}

export default StatePlay;