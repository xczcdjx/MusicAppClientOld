import { createApp } from 'vue'
import App from './App.vue'

import './style.css'
import 'amfe-flexible'
import 'vant/lib/index.css'

import Vant from 'vant'
import store from "./store/index.js";
import router from './router/index.js'
import req from './utils/axios/request.js'
import Netreq from './utils/axios/NetRequest.js'
import inf from './utils/axios/interface.js'
import Netinf from './utils/axios/Netinterface.js'
import emitter from "./hooks/mitt/index.js";
import {Lazyload} from 'vant'
import dragBtn from "./directives/dragBtn.js";
// 引入模块mouse转touch事件
import '@vant/touch-emulator';

const app=createApp(App)
app.config.globalProperties.$req=req
app.config.globalProperties.$Netreq=Netreq
app.config.globalProperties.$i=inf
app.config.globalProperties.$ni=Netinf
app.config.globalProperties.$emitter=emitter
app.use(router).use(store).use(Vant).use(Lazyload).use(dragBtn).mount('#app')
