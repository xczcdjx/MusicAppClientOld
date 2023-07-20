<template>
<div class="contain">
    <div class="left">
        <van-image :src="playlist[playListIndex].al.picUrl" round fit="fill" :class="playstatus?'pic_active':'pic_paused'"/>
        <div class="a" @click="enterlyric">
<!--        <div class="a">-->
            <span :class="playstatus?'wrapper':''">{{playlist[playListIndex].name}}</span>
            <span>横滑切换上下首哦</span>
        </div>
    </div>
    <div class="right">
        <van-icon :name="playstatus?'pause-circle-o':'play-circle-o'" @click="audioControl" :class="playstatus?'play':''"/>
        <van-icon name="ellipsis" @click="openMusiclist"/>
    </div>
    <audio :src="playlist[playListIndex].musurl?playlist[playListIndex].musurl:`https://music.163.com/song/media/outer/url?id=${playlist[playListIndex].id}.mp3`" ref="audio"/>
</div>

</template>

<script setup>
import {useStore} from "vuex";
import {computed, onMounted, onUpdated, ref, watch} from "vue";
import emitter from "../../hooks/mitt/index.js";

const store=useStore()
const playlist=computed(()=>store.state.musicaudio.itemM)
const playListIndex=computed(()=>store.state.musicaudio.itemMIndex)

const audio=ref()
const playstatus=computed(()=>store.state.musicaudio.isPlay)

const audioControl=()=>{
    store.commit('musicaudio/changePlay')
    // console.log(audio.value)
    audioC()
}
onMounted(()=>{
    store.dispatch('musicaudio/getMusiclyric',playlist.value[playListIndex.value].id)
    updateMusicTime()
    emitter.on("audioStatusChangebyMV",fun=>{
        // console.log(fun)
        audio.value.pause()
    })
    emitter.on("changeMusicState",fun=>{
        audioC()
    })
    emitter.on("changeMusicState2",fun=>{
        setTimeout(()=>{
            audioControl()
        },400)
    })
})

function audioC() {
    if (playstatus.value){
        audio.value.play()
        updateMusicTime()
    }else {
        audio.value.pause()
        clearInterval(timer)
    }
}
const enterlyric=()=>{
    store.commit('musicaudio/changeaudioS')
}
// 更新歌词时间
let timer;
const updateMusicTime=()=>{
   timer=setInterval(()=>{
       if (audio.value) store.commit('musicaudio/updateCurrentTime',audio.value.currentTime||0)
        // console.log(1)
    },1000)
    store.commit('musicaudio/updateDuration',audio.value.duration||0)
}
const openMusiclist=()=>{
    emitter.emit('musiclistStatus',{s:true})
}

watch(playListIndex,(n,i)=>{
    console.log('index已改变')
    if (n!==i) {
        store.commit('musicaudio/changePlay', 2)
        clearInterval(timer)
        setTimeout(() => {
            store.commit('musicaudio/changePlay')
            audio.value.play()
            updateMusicTime()
        }, 300)
        store.dispatch('musicaudio/getMusiclyric',playlist.value[playListIndex.value].id)
    }
})
watch(playlist,(n,i)=>{
    if (n!==i){
        store.commit('musicaudio/changePlay', 2)
        if (!playstatus.value){
            setTimeout(()=>{
                store.commit('musicaudio/changePlay')
                audio.value.play()
            },300)
            updateMusicTime()
            store.dispatch('musicaudio/getMusiclyric',playlist.value[playListIndex.value].id)
        }
    }
})
/*watch(playstatus,(n,i)=>{
    if (!n){
        audio.value.pause()
    }else {
        audio.value.play()
    }
})*/
defineExpose({
    control:audioControl
})
</script>

<style scoped lang="less">
@import "../../style/overflex";
@import "../../style/usual";
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.contain{
    position: fixed;
    width: 100%;
    height: 80px;
    background: #fff;
    bottom: 0;
    border-top: 1px solid #999;
    border-radius: 15px;
    padding:0 10px;
    z-index: 10;
    .flex_center(@row: @align_type1);
    .left{
        .flex_center(@row: @align_type1);
        >.a{
            .mouse_hover();
            font-size: 20px;
            margin-left: 10px;
            >span:first-child{
                height: 60%;
                overflow: hidden;
            }
            >span:last-child{
                font-size: 15px;
            }
            .flex_center(@dir: @direction,@row: @flex_start,@col: @flex_start);
        }
        .van-image{
            width: 50px;
            height: 50px;
            animation: rotate_pic 10s infinite linear;
        }
        .pic_active{
            animation-play-state: running;
        }
        .pic_paused{
            animation-play-state: paused;
        }
    }
    .right{
        .van-icon{
            font-size: 40px;
            &:first-child{
                .mouse_hover();
            }
            &:last-child{
                margin-left: 20px;
                .mouse_hover(@fontC: #0aeeaa);
            }
        }
    }
    .play{
        color: purple;
    }
    .wrapper{
        height: 60%;
        cursor: default;
        background:linear-gradient(135deg,#14ffe9,#ffeb3b,#ff00e0);
        border-radius: 10px;
        animation: animate 1.5s linear infinite;
    }
}
@keyframes animate {
    100%{
        filter:hue-rotate(360deg);
    }
}
@keyframes rotate_pic {
    0%{
        transform: rotateZ(0deg);
    }
    100%{
        transform: rotateZ(360deg);
    }
}
</style>