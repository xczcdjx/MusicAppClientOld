import { createRouter, createWebHashHistory } from 'vue-router'
import loading from '../pages/loading.vue'
import login from '../pages/login/signIn.vue'
import register from '../pages/login/register.vue'
import verify from '../pages/access/verify.vue'
import {getToken} from "../utils/storage/token.js";
import {getStorage} from "../utils/storage/localstorage.js";

const routes = [
    {
        path:'/',
        name:'loading',
        component:loading
    },
    {
        path: '/verify',
        name: 'verify',
        component: verify
    },
    {
        path:'/singIn',
        name:'singIn',
        component:login
    },
    {
        path:'/register',
        name:'register',
        component:register
    },
    {
        path:'/home',
        name:'home',
        component:()=>import('../pages/home/index.vue'),
        redirect:'/home/homepage',
        children:[         /*   meta属性
                                        *   t:'导航标题'
                                        *   show:'导航栏显示隐藏'
                                        *   status:'底部标题栏显示隐藏'
                                        *   is: // 1:主页导航 2:音乐单独导航
                                        *   // 控制返回图标显示隐藏
                             */
            {
                path:'homepage',
                name:'homepage',
                component:()=>import('../pages/home/item/homepage/index.vue'),
                meta:{t:'主页',is:1,show:true}
            },
            {
                path:'foreignDetail',
                name:'foreignDetail',
                component:()=>import('../pages/home/item/homepage/foreignDetail/index.vue'),
                meta:{status:1,t:'欧美音乐详情'}
            },
            {
                path:'moreMusic',
                name:'moreMusic',
                component:()=>import('../pages/home/item/homepage/musicMore/index.vue'),
                meta:{status:1,t:'更多音乐'}
            },
            {
                path:'listdefault',
                name:'listdefault',
                component:()=>import('../pages/home/item/musiclist/listdefault.vue'),
                meta:{t:'歌单详情',is:1,show:true,status: true}
            },
            {
                path:'videodefault',
                name:'videodefault',
                component:()=>import('../pages/home/item/videolist/videodefault.vue'),
                meta:{t:'mv详情',status: true}
            },
            {
                path:'music',
                name:'music',
                component:()=>import('../pages/home/item/music/index.vue'),
                meta:{t:'音乐',is:2,show:true}
            },
            {
                path:'musicsearch',
                name:'musicsearch',
                component:()=>import('../pages/home/item/music/search/index2.vue'),
                meta: {show:true,status:1}
            },
            {
                path:'musicsearchdetail',
                name:'musicsearchdetail',
                component:()=>import('../pages/home/item/music/search/searchDetail/index.vue'),
                meta: {t:'音乐详情',status: 1}
            },
            {
                path:'podcast',
                name:'podcast',
                component:()=>import('../pages/home/item/podcast/index.vue'),
                meta:{t:'播客',is:3,show:false}
            },
            {
                path:'user',
                name:'user',
                component:()=>import('../pages/home/item/user/index.vue'),
                meta:{t:'用户',is:4,show:false}
            },
            {
                path:'updateinfo',
                name:'updateinfo',
                component:()=>import('../pages/home/item/user/updateinfo/index.vue'),
                meta:{status:1,t:'个人信息修改'}
            },
            {
                path:'updatepass',
                name:'updatepass',
                component:()=>import('../pages/home/item/user/updatepass/index.vue'),
                meta:{status:1,t:'密码修改'}
            },
            {
                path:'usercomment',
                name:'usercomment',
                component:()=>import('../pages/home/item/user/usercomment/index.vue'),
                meta:{status:1,t:'用户评论'}
            },
            {
                path:'test',
                name:'test',
                component:()=>import('../pages/test.vue'),
                meta:{is:3,show:true,status: 1}
            },
        ]
    }
]

let router = createRouter({
    history: createWebHashHistory(),
    routes
})

const whiteLists=['/singIn','/register']
/*router.beforeEach((to, from, next) => {
    if (to.path==='/'){
       next()
    }else {
        if (getToken()){
            if (to.path === '/singIn'){
                next('/home')
            }else {
                next()
            }
        }else {
            if (whiteLists.includes(to.path)){
                next()
            }else {
                next('/singIn')
            }
        }
    }
})*/
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next()
    } else {
        if (getStorage('appkey')) {
            if (to.path === '/verify') {
                next('/singIn')
            } else {
                // next()
                if (getToken()) {
                    if (to.path === '/singIn') {
                        next('/home')
                    } else {
                        next()
                    }
                } else {
                    if (whiteLists.includes(to.path)) {
                        next()
                    } else {
                        next('/singIn')
                    }
                }
            }
        } else {
            if (to.path === '/verify') {
                next()
            } else {
                next('/verify')
            }
        }
    }
})

export default router
