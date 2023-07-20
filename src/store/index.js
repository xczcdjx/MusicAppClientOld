import {createStore} from "vuex";
import createPersistedState from 'vuex-persistedstate'
import app from './module/app.js'
import user from './module/user.js'
import homepage from './module/homepage.js'
import music from './module/music.js'
import musicaudio from './module/musicaudio.js'
export default createStore({
    modules:{
        app,user,homepage,music,musicaudio
    },
    plugins: [createPersistedState({
        storage: window.localStorage,
        /*reducer(val) {
            return {
                // 只储存state中的assessmentData
                assessmentData: val.assessmentData
            }
        }*/
        paths: ["users","homepage","music","musicaudio"]
    })]
})
