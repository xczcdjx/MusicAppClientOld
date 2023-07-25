<template>
    <div>
        <van-nav-bar
            v-if="!route.meta.show"
            :title="route.meta.t"
            :left-arrow="!route.meta.is"
            @click-left="onClickLeft"
        />
        <van-nav-bar v-if="route.meta.is===2">
            <template #left>
                <van-icon name="more-o" size="23" @click="topIcon(1)"/>
            </template>
            <template #title>
                <van-search
                    v-model="search"
                    @click="toggleSearch"
                    :clearable="false"
                    placeholder="search"
                    input-align="center"
                    shape="round"
                />
            </template>
            <template #right>
                <van-icon name="smile-comment-o" size="23" @click="topIcon(2)"/>
            </template>
        </van-nav-bar>

        <div class="mainRouter">
            <router-view v-slot="{ Component }">
                <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }">
                    <component :is="Component"/>
                </transition>
            </router-view>
        </div>


        <van-tabbar v-model="active" route v-show="route.meta.status?false:true" style="z-index: 40">
            <van-tabbar-item icon="home-o" to="/home/homepage">主页</van-tabbar-item>
            <van-tabbar-item icon="music-o" to="/home/music">音乐</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/home/podcast">播客</van-tabbar-item>
            <van-tabbar-item icon="user-o" to="/home/user">我的</van-tabbar-item>
        </van-tabbar>

        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__fadeOutDown"
        >
            <footmusic v-show="Mshow&&route.meta.status" ref="controlBtn"/>
        </transition>
        <!--音乐列表面板-->
        <van-popup
            v-model:show="musiclistS"
            round
            closeable
            position="bottom"
            :style="{ height: '30%' }"
        >
            <musiclist/>
        </van-popup>

        <!--    播放主面板-->
        <van-popup v-model:show="Lshow" position="right" :style="{ height: '100%',width:'100%' }">
            <Lyricmusic/>
        </van-popup>

        <!--    更新面板-->
        <van-overlay :show="upgradeShow">
            <div class="upgradeWrapper" @click.stop>
                <div class="upgradeBlock">
                    <van-divider>{{ upgradeTip.top }}</van-divider>
                    <p v-html="formatUpdateTip(upgradeTip.msg)"></p>
                    <van-button type="default" size="small" @click="getNewVersion" style="margin-top: 10px"
                                v-show="updateBtn(upgradeTip.run)">下载新版
                    </van-button>
                    <van-button type="default" size="small" @click="store.commit('app/closeUpdateShow',false)"
                                style="margin-top: 10px;margin-left: 5px"
                                v-show="closeUpdateBtn(upgradeTip.run)">关闭窗口
                    </van-button>
                </div>
            </div>
        </van-overlay>

        <!--    拖拽按钮-->
        <Drag v-show="!(Mshow&&route.meta.status) && !upgradeShow">
            <template #icon>
                <div class="drag">
                    <van-image :src="playlist[playListIndex].al.picUrl"
                               round fit="fill"
                               @click="compoundClick"
                               :class="playstatus?'pic_active':'pic_paused'"/>
<!--                    <van-image :src="playlist[playListIndex].al.picUrl"
                               round fit="fill"
                               @click="operatePanel(true)"
                               @dblclick="openLyric"
                               :class="playstatus?'pic_active':'pic_paused'"/>-->
                </div>
            </template>
            <template #panel>
                <div class="panel" v-show="panel">
                    <div class="content">
                        <van-notice-bar @click="operatePanel(false)" :speed="30"
                                        :scrollable="playstatus"
                                        ref="noticeBarRef"
                                        :text="playstatus?'当前播放: '+playlist[playListIndex].name:'当前暂无播放'"/>
                        <div class="control">
                            <van-icon :name="playstatus?'pause-circle-o':'play-circle-o'" @click="controlPlay"
                                      :class="playstatus?'play':''"/>
                            <van-icon name="arrow" @click="nextMusic(1)"/>
                        </div>
                    </div>
                </div>

                <!--            <van-overlay :show="panel"  @click.self="operatePanel(false)">
                                <div class="panel">
                                    <div class="content" >
                                        <van-notice-bar :scrollable="playstatus">
                                            {{playstatus?'当前播放: '+playlist[playListIndex].name:'当前暂无播放'}}
                                        </van-notice-bar>
                                        <div class="control" @click.self="operatePanel(false)">
                                            <van-icon :name="playstatus?'pause-circle-o':'play-circle-o'" @click="controlPlay" :class="playstatus?'play':''"/>
                                            <van-icon name="arrow" />
                                        </div>
                                    </div>
                                </div>
                            </van-overlay>-->
            </template>
        </Drag>
    </div>
</template>

<script setup>
import 'animate.css'
import {computed, getCurrentInstance, onBeforeMount, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import Footmusic from "../../components/music/footmusic.vue";
import Musiclist from "../../components/music/musiclist.vue";
import emitter from "../../hooks/mitt/index.js";
import Lyricmusic from "../../components/music/lyricmusic.vue";
import {Toast} from "vant";
import Drag from '../../components/drag/index3.vue'
import {Up_version} from "../../utils/version/constant.js";


const store = useStore()
onBeforeMount(() => {
    store.dispatch('music/getmusic')
    store.dispatch('homepage/getRecommend')
    store.dispatch('homepage/getmusicMv')
    store.dispatch('homepage/gethotMusic')
})
const Mshow = computed(() => store.state.musicaudio.audioShow)
const Lshow = computed(() => store.state.musicaudio.lyricShow)
const musiclistS = ref(false)

onMounted(() => {
    emitter.on('musiclistStatus', func => {
        musiclistS.value = func.s
    })
})

const route = useRoute()
const router = useRouter()
const search = ref('')
const active = ref(0)
const onClickLeft = () => {
    router.back()
}
const toggleSearch = () => {
    router.push({
        name: 'musicsearch'
    })
}

const topIcon = (i) => {
    Toast('后期开放' + i)
}

// update App
const upgradeShow = computed(() => store.state.app.updateShow)
// console.log(upgradeShow.value)
const upgradeTip = computed(() => store.state.app.upgrade)

const formatUpdateTip = (v) => {
    return v?v.split('，').reduce((pre, cur) => pre + '<br>' + cur):'暂无内容'
}
const {proxy} = getCurrentInstance()


const getNewVersion = () => {
    // exportListData(`/version/getNewVersion`,'1.6.0')
    /*axios({
        url: `${proxy.$i.baseURL}/version/newVersion?version=${'1.6.0'}`,
        method: "get",
        // responseType: "ArrayBuffer", // 文件下载 默认格式 ArrayBuffer
        responseType: "blob", // 设置拿到的响应数据的格式
    }).then(res=>{
        // console.log(res)
        let url = URL.createObjectURL(res.data);
        console.log(url);
        let link = document.createElement("a");
        link.href = url;
        link.download = "music.apk";
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(r=>{
        console.log(r.response.data)
    })*/
    // console.log(upgradeTip.value.downurl)
    // downloadRes(proxy.$i.baseURL+'\\'+upgradeTip.value.downurl);
    /*fetch(proxy.$i.baseURL+'\\'+upgradeTip.value.downurl).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        console.log(a.href)
        a.download = res.success.fileName  // 下载文件的名字
        document.body.appendChild(a)
        a.click()
    })*/
    let downurl = ''
    proxy.$req.get(`/version/newVersion?version=${Up_version}`).then(v => {
        // console.log(v.data.downurl)
        downurl = v.data.downurl
        if (!downurl.length) return Toast('新版本还未上线')
        // console.log(proxy.$i.baseURL+'\\'+downurl)
        downloadEvt(proxy.$i.baseURL + downurl.slice(6));
    })
}

function downloadEvt(url, fileName = 'music') {
    const el = document.createElement('a');
    el.style.display = 'none';
    el.setAttribute('target', '_blank');
    /**
     * download的属性是HTML5新增的属性
     * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
     * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
     * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
     */
    fileName && el.setAttribute('download', fileName);
    el.href = url;
    console.log(el);
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}

function updateBtn(v) {
    if (v === 0) {
        return true
    } else if (v >= 21) {
        return true
    } else {
        return false
    }
}

function closeUpdateBtn(v) {
    if (v === 0) {
        return true
    } else if (v >= 16 && v <= 20) {
        return true
    } else {
        return false
    }
}

// drag
const playlist = computed(() => store.state.musicaudio.itemM)
const playListIndex = computed(() => store.state.musicaudio.itemMIndex)
const playstatus = computed(() => store.state.musicaudio.isPlay)

// controlBtn
const panel = ref(false) // 播放控制面板
const controlBtn = ref(null) // 获取子节点播放函数
let timer2 = null
const noticeBarRef = ref(null);
const operatePanel = (f) => {
    clearTimeout(timer2)
    timer2 = setTimeout(() => {
        panel.value = f
        noticeBarRef.value.reset()
    }, 300)
}

// 点击事件
let clickid = 1;
let timer = null;
let startTime;
const compoundClick = () => {
    if(clickid === 1) {
        startTime = new Date().getTime();
        clickid++;
        timer = setTimeout(function () {
            operatePanel(true)
            clickid = 1;
        }, 300)
    }
    if(clickid === 2) {
        clickid ++ ;
    } else {
        var endTime = new Date().getTime();
        if ((endTime - startTime) < 300) {
            openLyric()
            clickid = 1;
            clearTimeout(timer);
        }
    }

}
const openLyric = () => {
    clearTimeout(timer2)
    store.commit('musicaudio/changeaudioS')
}
const controlPlay = () => {
    controlBtn.value.control()
}
const nextMusic = (v) => {
    MusicC(v)
}
watch(panel, (n, o) => {
    let timer = null
    if (n) {
        timer = setTimeout(() => {
            // console.log(123)
            panel.value = false
        }, 30000)
    } else {
        clearTimeout(timer)
    }
})

const MusicC=(i)=>{
    let index=i+playListIndex.value
    if (index<0) {
        index = playlist.value.length - 1
    } else if (index===playlist.value.length){
        index=0
    }
    store.commit('musicaudio/updateitemMIndex',index)
}
</script>

<style scoped lang="less">
@import "../../style/overflex";
@import "../../style/usual";

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.5s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0.3;
}

.slide-fade-enter-to, .slide-fade-leave-from {
    opacity: 1;
}
.mainRouter{
    margin-bottom: 120px;
}
.upgradeWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .upgradeBlock {
        padding: 10px;
        text-align: center;
        line-height: 40px;
        border-radius: 10px;
        width: 400px;
        height: 400px;
        background-color: #fff;

        > p {
            height: 150px;
            overflow: auto;
            font-size: 20px;
        }
    }
}

.drag {
    //transform: translate(2.5%, 2.5%);
    //transform: translate( 8%);
    display: flex;
    align-items: center;
    .van-image {
        border: #07c160 solid 1px;
        width: 80px;
        height: 80px;
        animation: rotate_pic 10s infinite linear;
    }

    .pic_active {
        animation-play-state: running;
    }

    .pic_paused {
        animation-play-state: paused;
    }
}

.panel {
    position: absolute;
    border-radius: 10px;
    padding: 5px;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    overflow: hidden;
    width: 150px;
    height: 100px;

    .content {
        width: 100%;

        .van-notice-bar {
            z-index: 99;
            height: 40px;
            width: 150px;
            font-size: 25px;
            color: #1989fa;
            margin: 0;
            padding: 0;
            background: transparent;
        }

        .control {
            margin-top: 10px;
            .flex_center(@row: @align_type2);

            .van-icon:first-child {
                font-size: 35px;
                .mouse_hover()
            }

            .van-icon:last-child {
                font-size: 20px;
                .mouse_hover(@fontC: purple)
            }

            .play {
                color: purple;
            }
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