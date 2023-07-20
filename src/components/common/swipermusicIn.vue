<template>
    <swiper
        :effect="type"
        :modules="modules"
        :slides-per-view="1"
        :space-between="10"
        :loop="true"
        :autoplay="{delay:3000,disableOnInteraction:false}"
        :allow-touch-move="false"
        :direction="'vertical'"
    >
        <swiper-slide v-for="(mus,i) in musiclist" :key="i">
            <div @click="imageClick(mus.id)">
                <div>
                    <van-image fit="fill" radius="5" :src="mus.picUrl"/>
                </div>
                <span v-text="(mus.name).substring(0,25)"></span>
            </div>
        </swiper-slide>
    </swiper>
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
import {computed, inject, onBeforeMount, ref} from "vue";

import {Autoplay,Pagination,Navigation,Scrollbar,EffectFade} from 'swiper'
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
        musiclist:{
            type:Array,
        }
    },
    setup(props,{emit}) {
        const musiclist=computed(()=>props.musiclist)
        const modules=[Autoplay,Pagination,Navigation,Scrollbar,EffectFade]
        const recommendchange=inject('recommendindex')

        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');
        };
        const imageClick = (i) => {
            recommendchange(i)
        };

        return {
            onSwiper,
            onSlideChange,
            musiclist,modules,imageClick
        };
    },
};
</script>
<style lang="less" scoped>
@import "../../style/overflex.less";
@import "../../style/usual.less";
.swiper {
    height: 250px;
    .swiper-slide{
        >div{
            .mouse_hover();
            .flex_center(@dir: @direction,@col:@flex_start,@row:@flex_start);
            width: 200px;
            >div{
                width: 200px;
                height: 200px;
                .van-image{
                    height: 200px;
                    width: 200px;
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