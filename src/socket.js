import { io } from 'socket.io-client';
const baseURL = process.env.REACT_APP_SERVER_URI;
const socketURL = process.env.REACT_APP_SOCKET_URI
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : `${socketURL}`;

export const socket = io(URL,{autoConnect:false});