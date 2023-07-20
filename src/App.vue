<template>
    <div @click="updateLastTime()">
        <router-view v-slot="{ Component }">
            <transition name="scale" mode="out-in" :duration="{ enter: 500, leave: 300 }">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>


</template>

<script setup>
import {useStore} from "vuex";
import {getToken} from "./utils/storage/token.js";
import {diffTokenTime} from "./utils/autologout/duration.js";
import {diffAppkeyTime, getAppkeyTime} from "./utils/verifyexpire/duration.js";
import {useRouter} from "vue-router";
import {Notify, Toast} from "vant";
import {getCurrentInstance, onMounted,ref} from "vue";
import {Cur_version} from "./utils/version/constant.js";
const store=useStore()
const router=useRouter()
const updateLastTime=()=>{
    if (getToken()){
        // console.log(diffTokenTime(),'tokenTime')
        if(diffTokenTime()){
            Toast('身份认证已过期,请重新登录')
            store.dispatch('user/logout')
            router.replace('/singIn')
        }
    }
    if (getAppkeyTime()){
        // console.log(diffAppkeyTime())
        if (diffAppkeyTime()){
            Notify({type:'warning',message:'激活码失效,请重新联系管理员获取'})
            store.commit('user/removeverify')
            router.replace('/verify')
        }
    }
}

const {proxy}=getCurrentInstance()


onMounted(()=>{
    store.dispatch('app/getUpgrade',Cur_version)
})
</script>

<style lang="less">
*{
    //font-size: 20px;
}
.scale-enter-active,
.scale-leave-active {
    transition: all 0.5s ease;
}


.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>