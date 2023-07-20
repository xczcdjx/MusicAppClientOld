<template>
    <swiper
        :effect="type"
        :modules="modules"
        :slides-per-view="5.6"
        :space-between="50"
    >
        <swiper-slide v-for="(im,i) in imglist">
            <div @click="imageClick(i)">
                <div>
                    <van-icon size="20" :name="im.ic" />
                </div>
                <span>{{im.t}}</span>
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
import {onBeforeMount, ref} from "vue";

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
        }
    },
    setup(props,{emit}) {
        const imglist=ref([
            {ic:'like-o',t:'每日推荐'},
            {ic:'star-o',t:'私人FM'},
            {ic:'fire-o',t:'歌单'},
            {ic:'coupon-o',t:'排行榜'},
            {ic:'todo-list-o',t:'有声书'},
            {ic:'add-o',t:'数字专辑'},
            {ic:'send-gift-o',t:'关注新歌'},
        ])
        const modules=[Autoplay,Pagination,Navigation,Scrollbar,EffectFade]


        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');
        };
        const imageClick = (i) => {
            emit('iconindex',i)
        };
        return {
            onSwiper,
            onSlideChange,
            imglist,modules,imageClick
        };
    },
};
</script>
<style lang="less" scoped>
@import "../../style/overflex.less";
.swiper {
    padding: 25px;
    height: 80px;
    .swiper-slide{
        >div{
            cursor: pointer;
            width: 80px;
            .flex_center(@dir: @direction,@col:@position_cen,@row:@flex_start);
            >div{
                .flex_center();
                //font-size: 40px;
                width: 60px;
                height: 60px;
                background: orange;
                border-radius: 50%;
            }
            >span{
                margin-top: 5px;
                font-size: 20px;
                &:hover{
                    color: deepskyblue;
                }
            }
        }
    }
}
</style>