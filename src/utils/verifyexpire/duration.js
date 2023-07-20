import {APPNAME,APPKEYTIME} from "./key.js";
import {getStorage, setStorage} from "../storage/localstorage.js";

export const setAppkeyTime=()=>{
    setStorage(APPNAME,Date.now())
}

export const getAppkeyTime=()=>{
    return  getStorage(APPNAME)
}

export const diffAppkeyTime=()=>{
    const currentTime=Date.now()
    const appkeyTime=getAppkeyTime()
    return currentTime-appkeyTime > APPKEYTIME
}