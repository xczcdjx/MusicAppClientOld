import {TOKEN_TIME,TOKEN_TIME_VALUE} from "./auth.js";
import {getStorage, setStorage} from "../storage/localstorage.js";

export const setTokenTime=()=>{
    setStorage(TOKEN_TIME,Date.now())
}

export const getTokenTime=()=>{
    return  getStorage(TOKEN_TIME)
}

export const diffTokenTime=()=>{
    const currentTime=Date.now()
    const tokenTime=getTokenTime()
    return currentTime-tokenTime > TOKEN_TIME_VALUE
}