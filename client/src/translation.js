import tendency_friendly_it from './images/it/tendency-friendly.png';
import tendency_waluigi_it from './images/it/tendency-waluigi.png';
import tendency_confabulate_it from './images/it/tendency-confabulate.png';

import prop_mirror_it from './images/it/prop-mirror.png';
import prop_globe_it from './images/it/prop-globe.png';
import prop_cat_it from './images/it/prop-cat.png';
import prop_moon_it from './images/it/prop-moon.png';
import prop_apple_it from './images/it/prop-apple.png';
import prop_ball_it from './images/it/prop-ball.png';
import prop_calculator_it from './images/it/prop-calculator.png';
import prop_calendar_it from './images/it/prop-calendar.png';
import prop_english_it from './images/it/prop-english.png';
import prop_glass_it from './images/it/prop-glass.png';
import prop_latin_it from './images/it/prop-latin.png';
import prop_lens_it from './images/it/prop-lens.png';
import prop_maccheroni_it from './images/it/prop-maccheroni.png';
import prop_sack_it from './images/it/prop-sack.png';

import img_button_it from './images/it/button.png';

import img_btn_coin_it from './images/it/button-coin.png';
import img_btn_flower_it from './images/it/button-flower.png';
import img_btn_tomati_it from './images/it/button-tomati.png';
import img_btn_egg_it from './images/it/button-egg.png';



import tendency_friendly_es from './images/es/tendency-friendly.png';
import tendency_waluigi_es from './images/es/tendency-waluigi.png';
import tendency_confabulate_es from './images/es/tendency-confabulate.png';

import prop_mirror_es from './images/es/prop-mirror.png';
import prop_globe_es from './images/es/prop-globe.png';
import prop_cat_es from './images/es/prop-cat.png';
import prop_moon_es from './images/es/prop-moon.png';
import prop_apple_es from './images/es/prop-apple.png';
import prop_ball_es from './images/es/prop-ball.png';
import prop_calculator_es from './images/es/prop-calculator.png';
import prop_calendar_es from './images/es/prop-calendar.png';
import prop_english_es from './images/es/prop-english.png';
import prop_glass_es from './images/es/prop-glass.png';
import prop_latin_es from './images/es/prop-latin.png';
import prop_lens_es from './images/es/prop-lens.png';
import prop_maccheroni_es from './images/es/prop-maccheroni.png';
import prop_sack_es from './images/es/prop-sack.png';

import img_button_es from './images/es/button.png';

import img_btn_coin_es from './images/es/button-coin.png';
import img_btn_flower_es from './images/es/button-flower.png';
import img_btn_tomati_es from './images/es/button-tomati.png';
import img_btn_egg_es from './images/es/button-egg.png';


import tendency_friendly_en from './images/en/tendency-friendly.png';
import tendency_waluigi_en from './images/en/tendency-waluigi.png';
import tendency_confabulate_en from './images/en/tendency-confabulate.png';

import prop_mirror_en from './images/en/prop-mirror.png';
import prop_globe_en from './images/en/prop-globe.png';
import prop_cat_en from './images/en/prop-cat.png';
import prop_moon_en from './images/en/prop-moon.png';
import prop_apple_en from './images/en/prop-apple.png';
import prop_ball_en from './images/en/prop-ball.png';
import prop_calculator_en from './images/en/prop-calculator.png';
import prop_calendar_en from './images/en/prop-calendar.png';
import prop_english_en from './images/en/prop-english.png';
import prop_glass_en from './images/en/prop-glass.png';
import prop_latin_en from './images/en/prop-latin.png';
import prop_lens_en from './images/en/prop-lens.png';
import prop_maccheroni_en from './images/en/prop-maccheroni.png';
import prop_sack_en from './images/en/prop-sack.png';

import img_button_en from './images/en/button.png';

import img_btn_coin_en from './images/en/button-coin.png';
import img_btn_flower_en from './images/en/button-flower.png';
import img_btn_tomati_en from './images/en/button-tomati.png';
import img_btn_egg_en from './images/en/button-egg.png';


export let LANG = 'en';

export const setLang = ( lang = 'en' ) => {
    if( lang in texts[T.DEFAULT] ){
        LANG = lang;
    }
}



export const T = {
    DEFAULT: 0,
    START: 1,
    QINFO1: 2,
    QINFO2: 3,
    NEXTSCENE: 4,
    TIMENEXT1: 5,
    TIMENEXT2: 6,
    SELECTAI: 7,
    SELECTANOTHERAI: 8,
    SELECTPROP: 9,
    DISLIKEINFO: 10,
    IFLIKEQUEUED: 11,
    IFLIKEOWN: 12,
    IFNOTLIKE: 13,
    STANDBY: 14,
    LIKELABEL: 15,
    DISLIKELABEL: 16,
    WAITFORCHOICE: 17,
    HOWTO1: 18,
    HOWTO2: 19,
    HOWTO3: 20,
    LANGUAGE: 30
}

export const texts = {
    [T.DEFAULT]: {
        'en': '',
        'it': '',
        'es': ''
    },
    [T.LANGUAGE]: {
        'en': 'english',
        'it': 'italiano',
        'es': 'español'
    },
    [T.START]: {
        'en': 'start',
        'it': 'pertecipa',
        'es': 'participa'
    },
    [T.QINFO1]: {
        'en': 'You\'re in the queue. In',
        'it': 'Sei in coda. Tra',
        'es': 'Estás en la cola. Ene'
    },
    [T.QINFO2]: {
        'en': 'scenes time you will be able to compose a scene.',
        'it': 'sketch potrai comporre la scena.',
        'es': 'scenas podrás componer la escena.'
    },
    [T.NEXTSCENE]: {
        'en': 'The next scene is',
        'it': 'La prossima scena si svolge',
        'es': 'La siguiente escena es'
    },
    [T.TIMENEXT1]: {
        'en': 'You have',
        'it': 'Hai',
        'es': 'Tienes'
    },
    [T.TIMENEXT2]: {
        'en': 'seconds to compose the scene.',
        'it': 'secondi per comporre la scena.',
        'es': 'segundos para componer la escena.'
    },
    [T.SELECTAI]: {
        'en': 'Pick an AI model',
        'it': 'Scegli un modello di intelligenza artificiale',
        'es': 'Elija un modelo de IA'
    },
    [T.SELECTANOTHERAI]: {
        'en': 'Pick another model',
        'it': 'Scegli l\'altro modello',
        'es': 'Elige el otro modelo'
    },
    [T.SELECTPROP]: {
        'en': 'Pick a prop to place on stage',
        'it': 'Scegli un oggetto da aggiungere sul palco',
        'es': 'Elige un objeto para agregarlo al escenario'
    },
    [T.DISLIKEINFO]: {
        'en': 'A negative reaction will interrupt the scene',
        'it': 'Se la scena non piace verrá interrotta',
        'es': 'Si no te gusta la escena será interrumpida'
    },
    [T.IFLIKEQUEUED]: {
        'en': 'Meanwhile, if you like the scene',
        'it': 'Nel frattempo.. se ti piace la scena',
        'es': 'Mientras tanto..si te gusta la escena'
    },
    [T.IFLIKEOWN]: {
        'en': 'If you like the scene',
        'it': 'Se ti piace la scena',
        'es': 'Si te gusta la escena'            
    },
    [T.IFNOTLIKE]: {
        'en': 'or, if you don\'t',
        'it': 'Se non ti piace',
        'es': 'o, si no te gusta'
    },
    [T.LIKELABEL]: {
        'en': 'you like',
        'it': 'ti piace',
        'es': 'te gusta'
    },
    [T.DISLIKELABEL]: {
        'en': 'you dislike',
        'it': 'non ti piace',
        'es': 'no te gusta'
    },
    [T.STANDBY]: {
        'en': 'Once the next scene begins you will be able to give the masks feedback.',
        'it': 'Una volta iniziata la scena successiva, potrai fornire un feedback alle maschere.',
        'es': 'Una vez que comience la siguiente escena, podrás darles retroalimentación a las máscaras.'
    },
    [T.WAITFORCHOICE]: {
        'en': 'Please wait for the other players to make their choices.',
        'it': 'Attendi che gli altri giocatori facciano le loro scelte.',
        'es': 'Por favor, espere a que los demás jugadores tomen sus decisiones.',
    },
    [T.HOWTO1]: {
        'en': 'You have joined the queue to interact with The Models.',
        'it': 'Ti sei unito alla coda per interagire con i Modelli.',
        'es': 'Te has unido a la cola para interactuar con Las Modelos.',
    },
    [T.HOWTO2]: {
        'en': 'After each improvised scene up to 3 people can choose the characters and props for the next.',
        'it': 'Dopo ogni scena improvvisata, fino a 3 persone possono scegliere i personaggi e gli oggetti di scena per la scena successiva.',
        'es': 'Después de cada escena improvisada, hasta 3 personas pueden elegir los personajes y los accesorios para la siguiente.'
    },
    [T.HOWTO3]: {
        'en': 'Do not re-scan the QR code or you will lose your place in the queue.',
        'it': 'Non scansionare nuovamente il codice QR altrimenti perderai il posto in coda.',
        'es': 'No vuelva a escanear el código QR o perderá su lugar en la cola.',
    }

}

export const getTxt = ( ENUM, languageoverride = false ) => {
    const lang = (languageoverride) ? languageoverride : LANG;
    if( !texts[ENUM] ) return texts[T.DEFAULT].en;
    return ( texts[ENUM][lang] ) ? texts[ENUM][lang] : (texts[ENUM].en) ? texts[T.DEFAULT].en : '';
}



export const I = {    
    friendly: 0,
    waluigi: 1,
    confabulate: 2,
    mirror: 3,
    globe: 4,
    cat: 5,
    moon: 6,
    apple: 7,
    ball: 8,
    calculator: 9,
    calendar: 10,
    english: 1,
    glass: 12,
    latin: 13,
    lens: 14,
    maccheroni: 15,
    sack: 16,
    button: 17,
    button_coin: 18,
    button_flower: 19,
    button_tomati: 20,
    button_egg: 21
}

const images = {
    [I.friendly]: {
        'en': tendency_friendly_en,
        'it': tendency_friendly_it,
        'es': tendency_friendly_es
    },
    [I.waluigi]: {
        'en': tendency_waluigi_en,
        'it': tendency_waluigi_it,
        'es': tendency_waluigi_es
    },
    [I.confabulate]: {
        'en': tendency_confabulate_en,
        'it': tendency_confabulate_it,
        'es': tendency_confabulate_es
    },
    [I.mirror]: {
        'en': prop_mirror_en,
        'it': prop_mirror_it,
        'es': prop_mirror_es
    },
    [I.globe]: {
        'en': prop_globe_en,
        'it': prop_globe_it,
        'es': prop_globe_es
    },
    [I.cat]: {
        'en': prop_cat_en,
        'it': prop_cat_it,
        'es': prop_cat_es
    },
    [I.moon]: {
        'en': prop_moon_en,
        'it': prop_moon_it,
        'es': prop_moon_es
    },
    [I.apple]: {
        'en': prop_apple_en,
        'it': prop_apple_it,
        'es': prop_apple_es
    },
    [I.ball]: {
        'en': prop_ball_en,
        'it': prop_ball_it,
        'es': prop_ball_es
    },
    [I.calculator]: {
        'en': prop_calculator_en,
        'it': prop_calculator_it,
        'es': prop_calculator_es
    },
    [I.calendar]: {
        'en': prop_calendar_en,
        'it': prop_calendar_it,
        'es': prop_calendar_es
    },
    [I.english]: {
        'en': prop_english_en,
        'it': prop_english_it,
        'es': prop_english_es
    },
    [I.glass]: {
        'en': prop_glass_en,
        'it': prop_glass_it,
        'es': prop_glass_es
    },
    [I.latin]: {
        'en': prop_latin_en,
        'it': prop_latin_it,
        'es': prop_latin_es
    },
    [I.lens]: {
        'en': prop_lens_en,
        'it': prop_lens_it,
        'es': prop_lens_es
    },
    [I.maccheroni]: {
        'en': prop_maccheroni_en,
        'it': prop_maccheroni_it,
        'es': prop_maccheroni_es
    },
    [I.sack]: {
        'en': prop_sack_en,
        'it': prop_sack_it,
        'es': prop_sack_es
    },
    [I.button]: {
        'en': img_button_en,
        'it': img_button_it,
        'es': img_button_es
    },
    [I.button_coin]: {
        'en': img_btn_coin_en,
        'it': img_btn_coin_it,
        'es': img_btn_coin_es
    },
    [I.button_flower]: {
        'en': img_btn_flower_en,
        'it': img_btn_flower_it,
        'es': img_btn_flower_es
    },
    [I.button_tomati]: {
        'en': img_btn_tomati_en,
        'it': img_btn_tomati_it,
        'es': img_btn_tomati_es
    },
    [I.button_egg]: {
        'en': img_btn_egg_en,
        'it': img_btn_egg_it,
        'es': img_btn_egg_es
    }
};

export const getImg = ( ENUM, languageoverride = false ) => {
    const lang = (languageoverride) ? languageoverride : LANG;
    if( !images[ENUM] ) return '';
    return ( images[ENUM][lang] ) ? images[ENUM][lang] : (images[ENUM].en) ? (images[ENUM].en) : '';
}



export const getSceneDescription = ( backdrop, languageoverride = false ) => {
    const lang = (languageoverride) ? languageoverride : LANG;
    let langKey;
    switch( lang ){
        case 'en':
            langKey = 'phoneCategoryEn';
            break;
        case 'es':
            langKey = 'phoneCategoryEs';
            break;
        case 'it':
            langKey = 'phoneCategoryIt'
            break;
        default:
            langKey = 'phoneCategoryEn'
    }        
    return backdrop[ langKey ]
}