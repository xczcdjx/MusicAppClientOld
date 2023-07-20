<template>
    <swiper
        :effect="type"
        :modules="modules"
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        :loop="true"
        :autoplay="{delay:3000,disableOnInteraction:false}"
        :scrollbar="{draggable:true}"
        @slideChange="onSlideChange"
        :pagination="{clickable:true}"
    >
        <swiper-slide v-for="(im,i) in imglist">
            <van-image radius="10" :src="im.pic" @click="imageClick(i)"/>
        </swiper-slide>
    </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade';
import {getCurrentInstance, onBeforeMount, ref} from "vue";

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
        const imglist=ref([])
        const modules=[Autoplay,Pagination,Navigation,Scrollbar,EffectFade]
        const {proxy}=getCurrentInstance()
        onBeforeMount(()=>{
            proxy.$Netreq.get('/banner?type=2').then(v=>{
                imglist.value=v.banners
            })
        })
        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');
        };
        const imageClick = (i) => {
            emit('imageindex',i)
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
.swiper {
    padding: 15px;
    height: 240px;
    .swiper-slide{
        .van-image{
            height: 250px;
            width:100%;
        }
    }
}
</style>