<template>
    <div class="contain">
        <swiper @imageindex="imagechange"/>
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <swipericon @iconindex="iconchange"/>
            <div class="divider"></div>
            <transition
                name="animate__animated animate__bounce"
                enter-active-class="animate__rotateIn"
                leave-active-class="animate__rotateOut"
            >
                <van-notice-bar class="topNotification" mode="closeable" scrollable>{{ upgradeNotify }}</van-notice-bar>
            </transition>
            <div class="recommendMusic">
                <div class="navtitle">
                    <span>推荐歌单</span>
                    <van-button icon="arrow" plain type="primary" icon-position="right" size="mini"
                                @click="moreMusic('recommendMusic')">更多
                    </van-button>
                </div>
                <div>
                    <swipermusic :musiclist="recommend" @recommendindex="recommendchange"/>
                </div>
            </div>
            <!--foreign-->
            <div class="extraSelect">
                <div class="navtitle">
                    <span>欧美流行精选</span>
                    <van-button icon="play-circle-o" plain type="warning" :disabled="allplay" size="mini"
                                @click="foreignAllPlay">播放
                    </van-button>
                </div>
                <div>
                    <threeswiper :pop="foreignList" @foreignDetails="onForeignDetails"
                                 @foreignPlay="onForeignPlay"/>
                </div>
            </div>
            <!--mv-->
            <transition
                name="animate__animated animate__bounce"
                enter-active-class="animate__flipInX"
                leave-active-class="animate__flipOutY"
            >
                <div class="mvRecommend" v-if="showVideo">
                    <div class="navtitle">
                        <!--                        <span>最新mv</span>-->
                        <span>网易出品mv</span>
                        <van-icon name="cross" color="silver" @click="closeVideo" size="20"/>
                    </div>
                    <div>
                        <mvswiper :mvlist="musicmv" @mvindex="mvchange"/>
                    </div>
                </div>
            </transition>

            <div class="hotmusic">
                <div class="navtitle">
                    <div @click="hotevent($event)">
                        <span mus="new">最新</span>
                        <span>|</span>
                        <span mus="hot">热门</span>
                        <span class="line" :class="musicTopic==='new'?'l1':'l2'"></span>
                    </div>
                    <van-button icon="arrow" plain type="primary" icon-position="right" size="mini"
                                @click="moreMusic('hotMusic')">
                        更多
                    </van-button>
                </div>
                <div>
                    <!--            <threeswiper2 :poplist="hotMusic" :order="order" @foreignindex="foreignchange"/>-->
                    <hotswiper @hotmusic="hotmusicchange" :musictopic="musicTopic"/>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import 'animate.css'
import Swiper from "../../../../components/common/swiper.vue";
import Swipericon from "../../../../components/common/swipericon.vue";
import Swipermusic from "../../../../components/common/swipermusic.vue";
import {computed, getCurrentInstance, nextTick, onBeforeMount, onMounted, provide, ref, watch} from "vue";
import {useStore} from "vuex";
import Threeswiper from "../../../../components/common/musicUsualSwiper/threeswiper.vue";
import Threeswiper2 from "../../../../components/common/musicUsualSwiper/threeswiper2.vue";
import Mvswiper from "../../../../components/common/musicUsualSwiper/mvswiper.vue";
import {Notify, Toast} from "vant";
import Hotswiper from "../../../../components/common/musicUsualSwiper/hotswiper.vue";
import {useRouter} from "vue-router";
import {compareExist, musicControls, resetList} from "../../../../hooks/musicControls/index.js";
import {sliceArr} from "../../../../hooks/statisticMethod/arrMethod.js";
import emitter from "../../../../hooks/mitt/index.js";

export default {
    components: {
        Hotswiper,
        Mvswiper,
        Threeswiper2,
        Threeswiper,
        Swipermusic,
        Swipericon,
        Swiper
    },
    setup(props, {emit}) {
        const {proxy} = getCurrentInstance()
        const router = useRouter()
        const store = useStore()
        const recommend = computed(() => store.state.homepage.recommend)
        const foreignList = computed(() => sliceArr(computed(() => store.state.music.foreignList).value, 3))
        const musicmv = computed(() => store.state.homepage.musicMv)
        const imagechange = (i) => {
            Toast('轮播内容下下个版本开放')
            console.log('mainswiper', i)
        }
        const iconchange = (i) => {
            Toast('该功能暂未开放')
            console.log(i, 'icon')
        }
        const recommendchange = (i) => {
            router.push({
                name: 'listdefault',
                query: {
                    id: i
                }
            })
            // console.log('recommend2id',i)
        }

        const firstindex = (i) => {
            router.push({
                name: 'listdefault',
                query: {
                    id: i
                }
            })
            // console.log('recommend1id',i)
        }

        provide('recommendindex', firstindex)


        onMounted(() => {
            emitter.on('foreignPlayMusic', fun => {
                onForeignPlay(fun.item)
            })
        })
        // 欧美流行音乐播放
        const onForeignDetails = (arr) => {
            // Toast('播放精选下个版本开放,播放请点右侧图标')
            console.log('foreign', arr[0], arr[1])
            router.push({
                name: 'foreignDetail',
                query: {
                    musid: arr[0],
                    singerName: arr[1]
                }
            })
        }
        const onForeignPlay = (item) => {
            // Toast('本地服务器音乐将在下个版本开放')
            // console.log('foreign',item)
            let musIndex = 0
            if (compareExist('name', item.name)) {
                playList.value.find((it, index) => {
                    if (it.id === item.id) {
                        musIndex = index
                    }
                    return it.id === item.id
                })
                store.commit('musicaudio/updateitemMIndex', musIndex)
            } else {
                store.commit('musicaudio/spliceitemM', item)
                musicControls(1)
            }
        }
        const playList = computed(() => store.state.musicaudio.itemM)
        const foreignAllPlay = () => {
            // if (playList.value===foreignList.value) return Toast('你已在当前歌单')
            if (new Set(playList.value.map(item => item.name)).size === foreignList.value.flat(1).length) {
                return Toast('你已在当前列表')
            }
            emitter.emit("changeMusicState2", {p: 2})
            resetList(foreignList.value.flat(1))
            // emitter.emit("changeMusicState2",{p:2})
        }
        const allplay = ref(false)

        // mv play
        const mvchange = (i) => {
            router.push({
                name: 'videodefault',
                query: {
                    id: i
                }
            })
            console.log('mvid', i)
        }

        const count = ref(0);
        const loading = ref(false);
        const onRefresh = () => {
            setTimeout(() => {
                Notify({type: 'success', message: '刷新成功', duration: 500})
                count.value++;
                // console.log(musicmv.value)
                // store.dispatch('homepage/gethotMusic')
                loading.value = false;
                if (count.value >= 5) Toast(`你已刷新${count.value}次`)
                if (count.value >= 10) {
                    Toast(`没有什么好刷的,请别做这么无聊的举动`)
                } else {
                    store.dispatch('homepage/getRecommend')
                    store.dispatch('homepage/getmusicMv')
                    // store.dispatch('music/getmusic')
                }
            }, 1000);
        };


        let musicTopic = computed(() => store.state.homepage.musicTopic)
        const hotevent = (e) => {
            store.commit('homepage/changeMusicTopic', e.target.getAttribute('mus') || 'new')
            // console.log(musicTopic.value)
        }

        const hotmusicchange = (arr) => {
            Toast('此功能下个版本开放')
            console.log('hotmusicchange', arr[0], arr[1])
        }

        // right button
        const showVideo = ref(true)
        const closeVideo = () => {
            showVideo.value = false
        }

        const moreMusic = (target) => {
            switch (target) {
                case 'hotMusic':
                    router.push({
                        name: 'moreMusic',
                        query: {title:'热门最新详情'}
                    })
                    break;
                case 'recommendMusic':
                    router.push({
                        name: 'moreMusic',
                        query: {title:'推荐音乐详情'}
                    })
                    break;
            }
        }

        const upgradeNotify = computed(() => store.state.app.upgrade.notify)
        return {
            imagechange, iconchange, recommendchange,
            onForeignDetails, mvchange, hotevent, onRefresh,
            closeVideo, moreMusic,
            onForeignPlay, hotmusicchange, foreignAllPlay,
            recommend, foreignList, musicmv,
            loading, musicTopic, upgradeNotify, showVideo, count, allplay
        }
    }
}
</script>

<style scoped lang="less">
@import "../../../../style/overflex";
@import "../../../../style/usual";
@import "../../../../style/musicstyle";

.contain {
    margin-bottom: 100px;

    .van-notice-bar {
        margin-top: 5px;
        height: 50px;
    }

    .divider {
        padding: 0;
        margin-top: 5px;
        border-bottom: 1px solid silver;
    }

    .recommendMusic {
        background: rgba(192, 192, 192, 0.1);
        //margin: 5px;
        padding-bottom: 10px;
        border-radius: 10px;

        .navtitle {
            .navStyle();
        }
    }

    .extraSelect {
        background: rgba(169, 169, 169, 0.15);
        //background: rgba(0, 191, 255, 0.3);
        .navtitle {
            .navStyle(@navCol: skyblue)
        }
    }

    .mvRecommend {
        background: rgba(192, 192, 192, 0.2);
        //background: rgba(0, 191, 255, 0.3);
        .navtitle {
            .navStyle(@navCol: rgba(255,0,0,0.51));

            .van-icon {
                .mouse_hover(@fontC: red);
            }
        }
    }

    .hotmusic {
        //background: rgba(10, 238, 170,0.3);
        background: rgba(192, 192, 192, 0.25);

        .navtitle {
            .navStyle();

            > div {
                position: relative;
                font-size: 25px;
                width: 20%;
                .flex_center(@row: @align_type1);

                .line {
                    position: absolute;
                    width: 35%;
                    border-radius: 20%;
                    top: 35px;
                    left: 0;
                    border-bottom: orange 5px solid;
                    transition: all 0.5s ease;
                }

                .l1 {
                    left: 0;
                    border-bottom: orange 5px solid;
                }

                .l2 {
                    left: 65%;
                    border-bottom: green 5px solid;
                }

                > span:nth-child(2n-1) {
                    &:hover {
                        color: red;
                        cursor: pointer;
                    }
                }

                > span:nth-child(1):hover ~ .line {
                    left: 0;
                    border-bottom: orange 5px solid;
                }

                > span:nth-child(3):hover ~ .line {
                    left: 65%;
                    border-bottom: green 5px solid;
                }
            }
        }
    }
}
</style>