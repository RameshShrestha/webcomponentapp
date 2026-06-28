import { io } from 'socket.io-client';
import { getSocketURL} from "./Data/ContextHandler/constant";
//const baseURL = process.env.REACT_APP_SERVER_URI;
//const baseURL = getDataProvider();//"MyDataprovider";
//const socketURL = "MyChatServer";
const socketURL = getSocketURL();//"wss://myapp2025.cfapps.us10-001.hana.ondemand.com/chat";

// "undefined" means the URL will be computed from the `window.location` object
const urlpart1 = window.location.href.split("/index")[0];
//let fullpath = urlpart1 + "/MyDataprovider/";
//const URL = process.env.NODE_ENV === 'production' ? undefined : `./${socketURL}/chat`;
//const URL =  `./MyDataprovider/chat`;
export const socket = io(socketURL,{autoConnect:false, withCredentials: false});