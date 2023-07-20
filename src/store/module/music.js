import req from "../../utils/axios/request.js";

const actions={
    async getmusic({commit}){
        let r=await req.get('music/musiclist')
        if (r.code==200) commit('addmusic',r.data)
    }
}
const mutations={
    addmusic(m,i){
        m.foreignList=i
    },
    changePlayMode(m,i){
        m.flayMode=i
    }
}
const state={
    foreignList:[],
    flayMode:'exchange'
}
const getters={

}
export default {
    namespaced:true,
    actions,mutations,state,getters
}