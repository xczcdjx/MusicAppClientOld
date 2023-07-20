import {computed} from "vue";
import store from "../../store/index.js";
import {Toast} from "vant";
const playListIndex=computed(()=>store.state.musicaudio.itemMIndex)
const playList=computed(()=>store.state.musicaudio.itemM)
const musicControls=(i)=>{
    // console.log(1)
    let index=i+playListIndex.value
    if (index<0) {
        index = playList.value.length - 1
    } else if (index===playList.value.length){
        index=0
    }
    store.commit('musicaudio/updateitemMIndex',index)
}
const resetList=(item)=>{
    store.commit('musicaudio/updateitemM',item)
    store.commit('musicaudio/updateitemMIndex',0)
}

const fillMusic=(e2)=>{
    // console.log(new Set(playList.value.map(item=>item[e1])).size,e2.length)
    if(playList.value.length===e2.length){
        return true
    }else {
        return false
    }
}
const compareExist=(e1,e2)=>{
    if([...new Set(playList.value.map(item=>item[e1]))].includes(e2)){
        return true
    }else {
        return false
    }
}

export {
    musicControls,resetList,compareExist,fillMusic
}