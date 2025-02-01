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



function StatePlay(){
    const {rating, setRating} = useContext(GameContext)
    
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
                <div className='feedback-interface-meta'>
                    <div className="negative-region" style={{width: ratingToPercent( NEGATIVE_SENTIMENT_THRESHOLD) + '%'}}></div>
                    <div 
                        className="indicator"
                        style={{
                            left: ratingToPercent( rating ) + '%'
                        }}
                    ></div>
                </div>
                <div className="feedback-interface-buttons">
                <div className='feedback-interface-cell'>
                        <button 
                            className='feedback-button'
                            onClick={() => {
                                socket.emit( 'rate-script', { rating: -1, type: 'tomati', total: adjustAndClampRating( -1 ) })
                                
                            }}
                        >
                            <img 
                                src={img_btn_tomati} 
                                //style={{transform: `rotate(${(Math.random() * 30) - 15}deg)`}} 
                            />
                        </button>
                    </div>
                    <div className='feedback-interface-cell'>
                        <button 
                            className='feedback-button'
                            onClick={() => {
                                socket.emit( 'rate-script', { rating: -1, type: 'egg', total: adjustAndClampRating( -1 ) })
                            }}
                        >
                            <img 
                                src={img_btn_egg} 
                                //style={{transform: `rotate(${(Math.random() * 30) - 15}deg)`}} 
                            />
                        </button>
                    </div>
                    <div className='feedback-interface-cell'>
                        <button 
                            className='feedback-button'
                            onClick={() => {
                                socket.emit( 'rate-script', { rating: 1, type: 'coin', total: adjustAndClampRating( 1 ) })
                            }}
                        >
                            <img 
                                src={img_btn_coin} 
                                //style={{transform: `rotate(${(Math.random() * 30) - 15}deg)`}} 
                            />
                        </button>
                    </div>
                    <div className='feedback-interface-cell'>
                        <button 
                            className='feedback-button'
                            onClick={() => {
                                socket.emit( 'rate-script', { rating: 1, type: 'flower', total: adjustAndClampRating( 1 ) })
                            }}
                        >
                            <img 
                                src={img_btn_flower} 
                                //style={{transform: `rotate(${(Math.random() * 30) - 15}deg)`}} 
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </WrapperForStates>
}

export default StatePlay;