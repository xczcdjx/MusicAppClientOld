import Netreq from "../../utils/axios/NetRequest.js";
import {randomArr, sliceArr} from "../../hooks/statisticMethod/arrMethod.js";

const actions = {
    async getRecommend({commit}) {
        try {
            let r = await Netreq.get('/personalized')
            if (r.code == 200) commit('addRecommend', randomArr(r.result,30))
        } catch (e) {
            console.log(e)
        }
    },
    async getmusicMv({commit}) {
        try {
            let r = await Netreq.get('/mv/exclusive/rcmd')
            // let r = await Netreq.get('/mv/first')
            if (r.code == 200) commit('addmusicMv', randomArr(r.data,10))
        } catch (e) {
            console.log(e)
        }
    },
    async gethotMusic({commit}) {
        try {
            let r = await Netreq.get('/top/playlist/limit=9&order=hot')
            let r2 = await Netreq.get('/top/playlist/limit=9&order=new')
            r2.playlists.reverse()
            commit('addhotMusic',[Object.assign(r,{order:'hot'}),Object.assign(r2,{order:'new'})])
        } catch (e) {
            console.log(e)
        }
    }
}
const mutations = {
    addRecommend(m, i) {
        m.recommend = i
    },
    addmusicMv(m, i) {
        m.musicMv = i
    },
    addhotMusic(m, i) {
        // console.log(i)
        m.hotMusic = i
    },
    changeMusicTopic(m,i){
        m.musicTopic=i
    }
}
const state = {
    recommend: [],
    musicMv: [],
    hotMusic: [
        {
            order:'hot',
            playlists:[]
        },{
            order:'new',
            playlists:[]
        }
    ],
    musicTopic:'new'
}
const getters = {
    filterHotMusic(state){
        return sliceArr(state.hotMusic.find(item=>item.order=== state.musicTopic).playlists,3)
    }
}
export default {
    namespaced: true,
    actions, mutations, state, getters
}