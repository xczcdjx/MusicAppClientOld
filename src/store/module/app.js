import req from "../../utils/axios/request.js"

const actions = {
    async getUpgrade(s,version) {
        try {
            let r = await req.get(`/version/checkVersion?version=${version}`)
            // console.log(r.data)
            if (r.code == 200){
                s.commit('putUpgrade', r.data)
                let run=r.data.run
                if (run===0){
                    s.commit('closeUpdateShow',true)
                }else if (run<=10){
                    s.commit('closeUpdateShow',false)
                }else {
                    s.commit('closeUpdateShow',true)
                }
            }
        } catch (e) {
            console.log(e)
            s.commit('closeUpdateShow',true)
        }
    }
}
const mutations = {
    putUpgrade(m,i){
        m.upgrade=i
    },
    closeUpdateShow(m,i){
        m.updateShow=i
    }
}
const state = {
    upgrade:{
        run:11,
        top:'网络错误',
        msg:'请打开手机网络后重试',
        notify:'请打开网络以获取更多内容'
    },
    version:'',
    updateShow:false
}
const getters = {

}
export default {
    namespaced: true,
    actions, mutations, state, getters
}