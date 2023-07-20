<template>
    <swiper
        v-if="mvlist"
        :modules="modules"
        :slides-per-view="2.2"
        :space-between="20"
    >
        <swiper-slide v-for="(mv,i) in mvlist" :key="i">
            <div @click="mvClick(mv.artistId)">
                <div>
                    <van-image :src="mv.cover" radius="8" fit="fill"/>
                </div>
                <div class="b">
                    <van-tag type="warning" size="medium">
                        <span class="spa" v-text="(mv.artistName).substring(0,3)"></span>
                    </van-tag>
                    <span class="spa" v-text="mv.name.length<10?mv.name:(mv.name).substring(0,10)+'...'"></span>
                </div>
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
import 'swiper/css/effect-fade';
import {computed, onBeforeMount, ref} from "vue";

import {Autoplay,Pagination,Navigation} from 'swiper'
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props:{
        mvlist:{
            type:Array
        }
    },
    setup(props,{emit}) {
        const mvlist=computed(()=>props.mvlist)
        const modules=[Autoplay,Pagination,Navigation]

        const mvClick = (i) => {
            emit('mvindex',i)
        };
        return {
            mvlist,modules,mvClick
        };
    },
};
</script>
<style lang="less" scoped>
@import "../../../style/overflex.less";
@import "../../../style/usual.less";
.swiper {
    border-radius: 5px;
    padding: 10px;
    height: 230px;
    .swiper-slide{
        .mouse_hover(@fontC: red);
        overflow: hidden;
        width: 300px;
        >div{
            >div{
                .van-image{
                    width: 300px;
                    height: 180px;
                }
            }
            .b{
                width: 90%;
                overflow: hidden;
                .flex_center(@row: @flex_start);
                .van-tag{
                    //width: 14%;
                    font-size: 18px;
                    height: 25px;
                }
                .spa{
                    display: block;
                    //width: 76%;
                    margin-left: 5px;
                    letter-spacing: 3px;
                    font-size: 15px;
                }
            }
        }
    }
}
</style>