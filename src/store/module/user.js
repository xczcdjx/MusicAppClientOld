import req from "../../utils/axios/request.js";
import inf from "../../utils/axios/interface.js";
import {removeToken} from "../../utils/storage/token.js";
import router from "../../router/index.js";
import {removeStorage} from "../../utils/storage/localstorage.js";
const actions={
    async logout({commit}){
        let r=await req.get('users/logout')
        if (r.code==200) commit('addlogout',r.data)
    },
    async getuserinfo({commit}){
        let r=await req.get('users/getinfo')
        if (r.code==200) commit('adduserinfo',r.row)
    }
}
const mutations={
    addlogout(m,i){
        removeToken()
        // removeStorage('vuex')
        router.replace({
            name:'singIn'
        })
    },
    adduserinfo(m,i){
        m.userinfo=i
    },
    removeverify(m,i){
        localStorage.clear()
    },
}
const state={
    userinfo:{}
}
const getters={

}
export default {
    namespaced:true,
    actions,mutations,state,getters
}