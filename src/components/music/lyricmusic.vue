<template>
    <div class="contain">
        <img :src="playlist[playListIndex].al.picUrl"/>
        <div class="top">
            <div>
                <van-icon name="arrow-left" @click="closelyric"/>
                <div class="a">
                    <van-notice-bar scrollable :text="playlist[playListIndex].name" speed="20"
                                    background="transparent"/>
                    <div>
                    <span v-for="(item,i) in playlist[playListIndex].ar" :key="i">
                    {{ item.name }}&nbsp;
                </span>
                    </div>
                </div>
            </div>
            <van-icon name="share-o" @click="showShare=true"/>
        </div>
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__rollIn"
            leave-active-class="animate__hinge"
        >
            <div class="middle" v-show="!isLyricShow">
                <img src="/img/needle-ab.png" class="needle" :class="playstatus?'needle_active':''">
                <img src="/img/cd.png" class="cd">
                <img :src="playlist[playListIndex].al.picUrl" class="pic" :class="playstatus?'pic_active':'pic_paused'"
                     @click="openLyric">
            </div>
        </transition>

        <!--    <transition
                name="animate__animated animate__bounce"
                enter-active-class="animate__fadeInUp"
                leave-active-class="animate__fadeOutDown"
            >-->
        <div class="lyric" v-show="isLyricShow">
            <div @click="closelyr">
                <lyric :lyric="lyric" :currentTime="currentTime" :duration="duration" @musicEnd="MusicClose"/>
            </div>
        </div>
        <!--    </transition>-->

        <div class="bottom">
            <div class="status" @click="iconEvent($event)">
                <van-icon name="like-o" order="a"/>
                <van-icon name="down" order="b"/>
                <van-icon name="certificate" order="c"/>
                <van-icon name="chat-o" order="d"/>
                <van-icon name="good-job-o" order="e"/>
            </div>
            <div class="progress">
                <span>{{ playTime }}</span>
                <input type="range" min="0" v-model="currentTime" step="0.05" :max="duration">
                <span>{{ totalTime }}</span>
            </div>
            <div class="controls">
                <van-icon :name="playMode" @click="playModeChange"/>
                <van-icon name="arrow-left" @click="MusicC(-1)"/>
                <van-icon :name="playstatus?'pause-circle-o':'play-circle-o'" @click="lyricAudioControl"
                          :class="playstatus?'play':''"/>
                <van-icon name="arrow" @click="MusicC(1)"/>
                <van-icon name="ellipsis" @click="openMusiclist"/>
            </div>
        </div>

        <van-share-sheet
            v-model:show="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
        />

    </div>
</template>

<script setup>
import 'animate.css'
import {useStore} from "vuex";
import {computed, getCurrentInstance, onBeforeMount, onMounted, onUpdated, ref, watch} from "vue";
import {Notify, Toast} from "vant";
import emitter from "../../hooks/mitt/index.js";
import Lyric from "./lyric.vue";
import {getRandomInt} from "../../hooks/statisticMethod/arrMethod.js";

const store = useStore()
const playlist = computed(() => store.state.musicaudio.itemM)
const playListIndex = computed(() => store.state.musicaudio.itemMIndex)
const playstatus = computed(() => store.state.musicaudio.isPlay)
const lyric = computed(() => store.state.musicaudio.lyric)
const currentTime = computed(() => store.state.musicaudio.currentTime)
const duration = computed(() => store.state.musicaudio.duration)
const isLyricShow = ref(false)

const {proxy} = getCurrentInstance()

/*onUpdated(()=>{
    proxy.$emitter.on('spliceMusic',fun=>{
        console.log(fun)
        MusicC(1)
    })
})*/

const openLyric = () => {
    isLyricShow.value = true
}
const closelyr = () => {
    isLyricShow.value = false
}
const lyricAudioControl = () => {
    store.commit('musicaudio/changePlay')
    emitter.emit("changeMusicState", {p: playstatus.value})
}
const closelyric = () => {
    store.commit('musicaudio/changeaudioS')
    closelyr()
}
let showShare = ref(false);

// 切换歌曲
const MusicC = (i) => {
    let index = i + playListIndex.value
    if (index < 0) {
        index = playlist.value.length - 1
    } else if (index === playlist.value.length) {
        index = 0
    }
    store.commit('musicaudio/updateitemMIndex', index)
}


// 读取总时长 进度
const transTime = (value) => {
    var time = "";
    var h = parseInt(value / 3600);
    value %= 3600;
    var m = parseInt(value / 60);
    m = m < 10 ? "0" + m : m;
    var s = parseInt(value % 60);
    s = s < 10 ? "0" + s : s;
    time = m + ":" + s;
    return time;
}
let playTime = ref('00:00')
let totalTime = ref('00:00')
watch(currentTime, (n, i) => {
    playTime.value = transTime(currentTime.value)
    totalTime.value = transTime(duration.value)
})
// share list
const options = [
    [
        {name: '微信', icon: 'wechat'},
        {name: '朋友圈', icon: 'wechat-moments'},
        {name: '微博', icon: 'weibo'},
        {name: 'QQ', icon: 'qq'},
    ],
    [
        {name: '复制链接', icon: 'link'},
        {name: '分享海报', icon: 'poster'},
        {name: '二维码', icon: 'qrcode'},
        {name: '小程序码', icon: 'weapp-qrcode'},
    ],
];
const onSelect = (option) => {
    // Toast(option.name);
    Toast('该app并未上传云端,分享无效');
    showShare.value = false;
};
const openMusiclist = () => {
    emitter.emit('musiclistStatus', {s: true})
}

const playMode = computed(() => store.state.music.flayMode)


let index = 0
const modeArr = [
    {n: 'exchange', c: '顺序播放',},
    {n: 'revoke', c: '随机播放',},
    {n: 'replay', c: '循环播放',}
]
let timer = null
const playModeChange = () => {
    clearTimeout(timer)
    index++
    // Toast('播放模式将在下个版本开放')
    if (index >= modeArr.length) {
        index = 0
    }
    timer = setTimeout(() => {
        console.log(modeArr[index].n)
        store.commit('music/changePlayMode', modeArr[index].n)
        Notify({type: 'primary', message: modeArr[index].c})
    }, 500)
}

// 音乐自动结束
const MusicClose = () => {
    // emitter.emit("changeMusicState",{p:playstatus.value})
    // MusicC(1)
    // console.log('musicend')
    switch (playMode.value) {
        case 'exchange':
            MusicC(1)
            break;
        case 'revoke':
            console.log(1234)
            store.commit('musicaudio/updateitemMIndex',randomMusic())
            break;
        case 'replay':
            emitter.emit("changeMusicState", {p: playstatus.value})
            break;
    }
}

function randomMusic() {
    let i = getRandomInt(0, playlist.value.length)
    if (i===playListIndex.value){
        randomMusic()
    }
    return i
}
const iconEvent = (i) => {
    switch (i.target.getAttribute('order')) {
        case 'a':
        case 'b':
        case 'c':
        case 'd':
        case 'e':
            Toast('此排功能后期开放')
            break;
    }
}
</script>

<style scoped lang="less">
@import "../../style/overflex";
@import "../../style/usual";

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.contain {
    .top {
        height: 100px;
        padding: 10px 20px;
        .flex_center(@row: @align_type1);

        > div {
            .flex_center(@row: @align_type1);

            > .a {
                margin-left: 15px;
                font-size: 30px;
                display: flex;
                flex-direction: column;

                .van-notice-bar {
                    //width: 70%;
                    font-size: 30px;
                    padding: 0;
                    width: 200px;
                }

                > div {
                    font-size: 20px;
                }
            }
        }

        .van-icon {
            font-size: 40px;
            .mouse_hover();
        }
    }

    > img {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(80px);
    }

    .middle {
        margin-top: 150px;
        width: 100%;
        height: 450px;
        .flex_center(@dir: @direction;@row: @flex_start);
        position: relative;

        .needle {
            width: 150px;
            height: 220px;
            position: absolute;
            top: -20%;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-30deg);
            //transform: rotate(-5deg);
            transition: all 2s;
        }

        .needle_active {
            transform: rotate(-3deg);
        }

        .cd {
            width: 350px;
            height: 350px;
            position: absolute;
            bottom: 80px;
            z-index: -1;
        }

        .pic {
            width: 212px;
            height: 212px;
            border-radius: 50%;
            position: absolute;
            bottom: 150px;
            animation: rotate_pic 10s infinite linear;
        }

        .pic_active {
            animation-play-state: running;
        }

        .pic_paused {
            animation-play-state: paused;
        }
    }

    .lyric {
        margin-top: 30px;
        padding: 20px;
        width: 100%;
        //height: 750px;
        //overflow: scroll;
        > div {
            .lyric {
                height: 450px;
            }
        }
    }

    .bottom {
        position: fixed;
        bottom: 2%;
        width: 100%;

        .status {
            margin-bottom: 30px;
            .flex_center(@row: @align_type2);
            padding: 0 20px;
            font-size: 40px;
            height: 50px;

            .van-icon:nth-child(n) {
                .mouse_hover();
            }
        }

        .progress {
            width: 100%;
            padding: 10px;
            > span {
                font-size: 25px;
            }
            .flex_center(@row: @align_type1);
            input[type='range'] {
                width: 80%;
                height: 4px;
            }
        }

        .controls {
            height: 80px;
            //margin-top: 10px;
            .flex_center(@row: @align_type2);
            padding: 0 20px;
            font-size: 35px;

            .van-icon:first-child {
                .mouse_hover(@fontC: red);
            }

            .van-icon:nth-child(3) {
                font-size: 60px;
            }

            .van-icon:nth-child(2n) {
                .mouse_hover(@fontC: orangered)
            }

            .van-icon:last-child {
                .mouse_hover(@fontC: purple)
            }
        }

        .play {
            color: purple;
        }
    }
}

@keyframes rotate_pic {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
</style>