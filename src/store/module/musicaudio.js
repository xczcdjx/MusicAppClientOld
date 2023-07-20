import Netreq from "../../utils/axios/NetRequest.js";

const actions = {
    async getMusiclyric(s,i){
        try {
            let r=await Netreq.get(`/lyric?id=${i}`)
            s.commit('updateLyric',r.lrc.lyric)
        }catch (e) {
            console.log(e)
        }
    }
}
const mutations = {
    changeaudioS(s, i) {
        s.audioShow = !s.audioShow
        s.lyricShow=!s.lyricShow
    },
    changePlay(s, i) {
        if (i===2){
            return s.isPlay=false
        }
        s.isPlay = !s.isPlay
    },
    updateitemM(s,i){
        // console.log(i)
        s.itemM=i
    },
    updateitemMIndex(s,i){
        // console.log(2)
        s.itemMIndex=i
    },
    deleteitemMIndex(s,i){
      s.itemM.splice(i,1)
    },
    updateLyric(s,i){
        s.lyric=i
        // console.log(123)
    },
    updateCurrentTime(s,i){
        // console.log(i)
        s.currentTime=i
        // console.log(123)
    },
    updateDuration(s,i){
        // console.log(i)
        s.duration=i
        // console.log(123)
    },
    spliceitemM(s,i){
        // console.log(s.itemMIndex)
        // s.itemM.push(i)
        s.itemM.splice(s.itemMIndex+1,0,i)
        console.log('music change')
    }
}
const state = {
    audioShow: true,
    itemM: [{
        name:'小城夏天',
        al: {
            id: 142885776,
            name: "小城夏天",
            pic: 109951166254691360,
            picUrl: "http://p3.music.126.net/wYuFxK1i_5jqs58xXQ-Jfg==/109951167350445378.jpg",
            pic_str: "109951167350445378"
        },
        id:1934251776,
        ar:[
            {
                name: 'LBI利比'
            }
        ]
    }],
    itemMIndex:0,
    isPlay:false,
    lyricShow:false,
    lyric:{},
    currentTime:0,
    duration:0
}
const getters = {}
export default {
    namespaced: true,
    actions, mutations, state, getters
}