import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
//const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

const URL = (window.location.href.indexOf('localhost') > -1 ) ? 'http://localhost:5040/audience' : 'https://godmode.dmstfctn.net/themodels/audience'

console.log('SOCKET URL: ', URL )

//export const socket = io('http://localhost:5040/audience', {path: '/themodels/themodels'});
export const socket = io( URL, {path: '/themodels/themodels'});