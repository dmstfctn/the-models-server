import React, { useState, useEffect, useContext } from 'react';
import { socket } from '../socket.js';

import WrapperForStates from './WrapperForStates.js';
import { GameContext } from '../contexts/GameContext.js';

import img_btn_coin from '../images/button-coin.png';
import img_btn_flower from '../images/button-flower.png';
import img_btn_tomati from '../images/button-tomati.png';
import img_btn_egg from '../images/button-egg.png';

function StatePlay(){
    const {rating, setRating} = useContext(GameContext)
    
    return <WrapperForStates> 
        <section className="app-interface">
            <div className="feedback-interface">
                <div className='feedback-interface-cell'>
                    <button 
                        className='feedback-button'
                        onClick={() => {
                            socket.emit( 'rate-script', { rating: 1, type: 'coin', total: rating + 1 })
                            setRating( rating + 1 );
                        }}
                    >
                        <img src={img_btn_coin} />
                    </button>
                </div>
                <div className='feedback-interface-cell'>
                    <button 
                        className='feedback-button'
                        onClick={() => {
                            socket.emit( 'rate-script', { rating: 1, type: 'flower', total: rating + 1 })
                            setRating( rating + 1 );
                        }}
                    >
                        <img src={img_btn_flower} />
                    </button>
                </div>
                <div className='feedback-interface-cell'>
                    <button 
                        className='feedback-button'
                        onClick={() => {
                            socket.emit( 'rate-script', { rating: -1, type: 'tomati', total: rating - 1 })
                            setRating( rating - 1 );
                        }}
                    >
                        <img src={img_btn_tomati} />
                    </button>
                </div>
                <div className='feedback-interface-cell'>
                    <button 
                        className='feedback-button'
                        onClick={() => {
                            socket.emit( 'rate-script', { rating: -1, type: 'egg', total: rating - 1 })
                            setRating( rating - 1 );
                        }}
                    >
                        <img src={img_btn_egg} />
                    </button>
                </div>
            </div>
        </section>
    </WrapperForStates>
}

export default StatePlay;