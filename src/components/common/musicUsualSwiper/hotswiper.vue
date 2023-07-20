<template>
    <div>
    <swiper
        v-if="poplistArr"
        :modules="modules"
        :slides-per-view="1.15"
        :space-between="20"
    >
        <swiper-slide  v-for="(hot,i) in poplistArr" :key="i">
            <div class="musiclist" v-for="(p,i2) in hot" :key="i2">
                <div class="a">
                    <van-image :src="p.coverImgUrl" radius="10"/>
                    <div @click="fontClick(i,i2,p.id)">
                        <span v-text="p.description.length<18?p.description:(p.description).substring(0,15)+'...'"></span>
                        <span >{{p.name}}</span>
                    </div>
                </div>
                <van-icon name="play-circle-o" @click="fontClick(i,i2,p.musicid)" size="20"/>
            </div>
        </swiper-slide>
    </swiper>
    <van-empty v-else description="暂无数据,下拉刷新试试吧" image="network"/>
<!--        {{poplistArr}}-->
</div>
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
import {computed, getCurrentInstance} from "vue";
import {useStore} from "vuex";
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props:{

    },
    setup(props,{emit}) {
        const {proxy}=getCurrentInstance()
        const store=useStore()
        // const poplistArr=store.getters
        /*const hotMusic = computed(() => store.state.homepage.hotMusic)
        console.log(hotMusic.value)
        const musictopic=computed(()=>props.musictopic)

        const poplistArr=computed(()=>sliceArr(hotMusic.value.find(item=>item.order===musictopic.value).playlists,3))*/
        const poplistArr=computed(()=>store.getters["homepage/filterHotMusic"])

        const modules=[Autoplay,Pagination,Navigation,Scrollbar,EffectFade]


        const fontClick = (i,i2,id) => {
            emit('hotmusic',[i*3+i2,id])
        };

        return {
            modules,fontClick,proxy,poplistArr
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