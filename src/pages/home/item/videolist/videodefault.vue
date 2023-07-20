<template>
<div>
    <van-card
        v-for="(vid,i) in videolist" :key="i"
        @click="playvid(vid.id)"
        :title="vid.artistName"
        :thumb="vid.imgurl"
    >
        <template #desc>
            <div class="desc">
                <span>标题: {{vid.name.substring(0,25)}}</span>
                <span>播放次数: {{vid.playCount}}</span>
                <span>上映时间: {{vid.publishTime}}</span>
            </div>
        </template>
    </van-card>

    <van-popup v-model:show="videoplay" position="top" :style="{ height: '40%' }" >
        <div class="vidplay">
            <video :src="vidurl" controls/>
        </div>
    </van-popup>

</div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {getCurrentInstance, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import emitter from "../../../../hooks/mitt/index.js";

const {proxy}=getCurrentInstance()
const store=useStore()
const route=useRoute()
const videolist=ref()
onBeforeMount(async ()=>{
    try {
        let r=await proxy.$Netreq.get(`/artist/mv?id=${route.query.id}`)
        videolist.value=r.mvs
    }catch (e) {
        console.log(e)
    }
})

let vidurl=ref()
async function getvideourl(i){
    let r=await proxy.$Netreq.get(`/mv/url?id=${i}&r=1080`)
    vidurl.value=r.data.url
}
const videoplay=ref(false)
const playvid=(id)=>{
    emitter.emit('audioStatusChangebyMV',{p:false})
    store.commit('musicaudio/changePlay',2)
    videoplay.value=true
    getvideourl(id)
}

</script>

<style scoped lang="less">
*{
    box-sizing: border-box;
}
.desc{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    padding: 5px;
    //grid-template-rows: repeat(4,1fr);
    flex-direction: column;
    justify-content: space-around;
    >span{
        display: block;
    }
}
.vidplay{
    padding: 15px;
    width: 100%;
    height: 100%;
    video{
        width: 100%;
        height: 100%;
    }
}
</style>