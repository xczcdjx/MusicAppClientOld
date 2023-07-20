<template>
    <swiper
        v-if="musiclist"
        :effect="type"
        :modules="modules"
        :slides-per-view="3.5"
        :space-between="40"
    >
        <swiper-slide>
                <swipermusic-in :musiclist="musiclist.slice(0,10)"/>
        </swiper-slide>

        <swiper-slide class="slide2" v-for="(mus,i) in musiclist.slice(10,30)" :key="i">
            <div @click="imageClick(mus.id)">
                <div>
                    <van-image fit="fill" radius="5" :src="mus.picUrl"/>

                    <div class="play">
                       <van-icon name="play-circle-o" size="6"/>
                        <span>{{filtern(mus.playCount)}}</span>
                    </div>

                </div>
                <span v-text="(mus.name).substring(0,25)"></span>
            </div>
        </swiper-slide>
    </swiper>
    <van-empty v-else description="暂无数据,下拉刷新试试吧" image="network"/>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import axios from "axios";
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade';
import {computed, onBeforeMount, ref} from "vue";

import {Autoplay,Pagination,Navigation,Scrollbar,EffectFade} from 'swiper'
import SwipermusicIn from "./swipermusicIn.vue";
import {filterNum} from "../../hooks/statisticMethod/arrMethod.js";
export default {
    components: {
        SwipermusicIn,
        Swiper,
        SwiperSlide,
    },
    props:{
        type:{
            type: String,
            default:''
        },
        musiclist:{
            type:Array,
        }
    },
    setup(props,{emit}) {
        const musiclist=computed(()=>props.musiclist)
        const modules=[Autoplay,Pagination,Navigation,Scrollbar,EffectFade]

        const filtern=(v)=>{
           return filterNum(v)
        }

        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');
        };
        const imageClick = (i) => {
            emit('recommendindex',i)
        };

        return {
            onSwiper,
            onSlideChange,
            musiclist,modules,imageClick,filtern
        };
    },
};
</script>
<style lang="less" scoped>
@import "../../style/overflex.less";
@import "../../style/usual.less";
*{
    padding: 0;
    margin: 0;
    //box-sizing: border-box;
}
.swiper {
    //padding: 15px;
    padding: 0 0 0 10px;
    height: 250px;
    .slide2{
        >div{
            .mouse_hover();
            .flex_center(@dir: @direction,@col:@flex_start,@row:@flex_start);
            width: 200px;
            >div{
                width: 200px;
                height: 200px;
                position: relative;
                .van-image{
                    height: 200px;
                    width: 200px;
                }
                >.play{
                    text-align: center;
                    border-radius: 0 10px 0 10px;
                    width: 90px;
                    height: 30px;
                    border: white 1px solid;
                    position: absolute;
                    top: 5%;
                    right: 5%;
                    font-size: 15px;
                    color: wheat;
                    .flex_center(@row: @flex_start);
                    >span{
                        overflow: hidden;
                        width: 80px;
                        //height: 15px;
                        line-height: 15px;
                    }
                }
            }
            >span{
                margin-top: 5px;
                font-size: 16px;
            }
        }
    }
}
</style>