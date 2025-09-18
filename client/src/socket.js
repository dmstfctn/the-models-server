import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
//const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

const URL = (window.location.href.indexOf('localhost') > -1 ) ? 'http://localhost:5040/audience' : 'https://godmode.dmstfctn.net/audience';
//const PATH = (window.location.href.indexOf('localhost') > -1 ) ? '/themodels/themodels' : '/themodels';
const PATH = '/themodels/themodels'

console.log('SOCKET URL: ', URL );
console.log( 'SOCKET_PATH: ', PATH );

//export const socket = io('http://localhost:5040/audience', {path: '/themodels/themodels'});
export const socket = io( 
    URL, 
    {
        path: PATH,
        transports: ["polling", "websocket"]
    }
);