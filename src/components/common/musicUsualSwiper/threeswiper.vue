<template>
    <swiper
        v-if="poplist"
        :effect="type"
        :modules="modules"
        :slides-per-view="1.15"
        :space-between="20"
    >
        <swiper-slide  v-for="(pop,i) in poplist" :key="i">
            <div class="musiclist" v-for="(p,i2) in pop" :key="i2">
                <div class="a">
                    <van-image :src="p.al.picUrl" radius="10">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <div @click="foreignDetails(p.musid,p.ar[0].name)">
                        <span v-text="p.introduction.length<18?p.introduction:(p.introduction).substring(0,15)+'...'"></span>
                        <span >{{p.name}}</span>
                    </div>
                </div>
<!--                <van-icon :name="playList.find(it=>it.id===p.id)?'pause-circle-o':'play-circle-o'" @click="foreignPlay(p)"
                          size="20" :style="(playList.find(it=>it.id===p.id)&&playStatus)?{color:'purple'}:''"/>-->
                <van-icon @click="foreignPlay(p)" name="play-circle-o"
                          size="20" :style="playId===p.id?{color:'purple'}:''"/>
            </div>
        </swiper-slide>
    </swiper>
<!--    <van-empty v-else description="暂无数据,下拉刷新试试吧" image="network"/>-->

</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade';

import {Autoplay,Pagination,Navigation,Scrollbar,EffectFade} from 'swiper'
import {sliceArr} from "../../../hooks/statisticMethod/arrMethod.js";
import {computed, getCurrentInstance, ref} from "vue";
import {useStore} from "vuex";
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props:{
        type:{
            type: String,
            default:''
        },
        pop:{
            type:Array,
        }
    },
    setup(props,{emit}) {
        const {proxy}=getCurrentInstance()
        const store=useStore()
        const poplist=computed(()=>props.pop)
        const modules=[Autoplay,Pagination,Navigation,Scrollbar,EffectFade]
        const playId=ref(1314520)
        const playList=computed(()=>store.state.musicaudio.itemM)
        const playStatus=computed(()=>store.state.musicaudio.isPlay)
        const foreignDetails = (musid,singerName) => {
            emit('foreignDetails',[musid,singerName])
        };
        const foreignPlay = (item) => {
            /*console.log(poplist.value)
            console.log(item.id)*/
            // playId.value=item.id
            emit('foreignPlay',item)
        };
        return {
            poplist,modules,foreignDetails,proxy,foreignPlay,playList,playStatus,playId
        };
    },
};
</script>
<style lang="less" scoped>
@import "../../../style/overflex.less";
@import "../../../style/usual.less";
*{
    padding: 0;
    margin: 0;
    //box-sizing: border-box;
}
@mar:5px;
.swiper {
    //padding: 15px;
    padding: 0 0 0 10px;
    height: 330px;
    .swiper-slide{
        width: 700px;
        .musiclist{
            margin: @mar;
            .flex_center(@row: @align_type1);
            .a{
                .flex_center(@row: @align_type1);
                >.van-image{
                    width: 100px;
                    height: 100px;
                    margin-right: 15px;
                }
                >div{
                    .flex_center(@dir:@direction,@col:@flex_start,@row: @flex_start);
                    .mouse_hover(@fontC: green);
                    >span:first-child{
                        font-size: 25px;
                    }
                    >span:last-child{
                        font-size: 20px;
                    }
                }
            }
            >.van-icon{
                .mouse_hover(@fontC: orange)
            }
        }
    }
}
</style>