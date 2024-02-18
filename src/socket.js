import { io } from 'socket.io-client';
const baseURL = process.env.REACT_APP_SERVER_URI;
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : `${baseURL}/chat`;

export const socket = io(URL,{autoConnect:false});