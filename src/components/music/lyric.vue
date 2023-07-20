<template>
    <div class="contain" ref="musiclyric">
        <p v-for="(item,i) in lyricD" :key="i" class="pppp"
           :class="{p_active:(currentTime*1000>item.time && currentTime*1000<item.pre)}">
            {{ item.lrc }}
        </p>
    </div>
</template>

<script>
import {computed, defineComponent, ref, watch, watchEffect} from "vue";

export default defineComponent({
    name: 'lyric',
    props: ['lyric', 'currentTime','duration'],
    setup(props) {
        const lyricD = computed(() => {
            let arr;
            if (props.lyric) {
                arr = props.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1, 3)
                    let sec = item.slice(4, 6)
                    let mill = item.slice(7, 10)
                    let lrc = item.slice(11, item.length)
                    let time = parseInt(min * 60 * 1000) + parseInt(sec * 1000) + parseInt(mill)
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9)
                        lrc = item.slice(10, item.length)
                        time = parseInt(min * 60 * 1000) + parseInt(sec * 1000) + parseInt(mill)
                    }
                    // console.log(lrc)
                    return {min, sec, mill, lrc, time}
                })
                arr.forEach((item, i) => {
                    if (i === arr.length - 1||isNaN(arr[i+1].time)) {
                        item.pre = 10000
                    } else {
                        item.pre = arr[i + 1].time
                    }
                })
            }
            // console.log(arr.pre)
            return arr
        })
        // const musiclyric=ref()
        return {
            lyricD
        }
    },watch:{
        currentTime(newValue){
            let p=document.querySelector('.p_active')
            /*if (p==null) {
                return
            }*/
            if(!p && typeof(p) !== 'undefined' && p != 0) {
                // console.log('p 是 null');
                this.$refs.musiclyric.scrollTop=0
                // console.log(pp.scrollTop)
            }else{
                if (p.offsetTop>300){
                    this.$refs.musiclyric.scrollTop=p.offsetTop-350
                }
            }
            if (newValue===this.duration){
                console.log('music end')
                this.$emit('musicEnd',1)
            }
            // console.log(this.transTime(newValue))
            // console.log(this.transTime(this.duration),'aaa')
        }
    }
})
</script>

<style scoped lang="less">
@import "../../style/overflex";

.contain {
    width: 100%;
    //height: 750px;
    height: 1050px;
    overflow: scroll;
    margin-top: 10px;
    transition: 0.5s linear;
    .flex_center(@dir: @direction;@row: @flex_start);
    p {
        font-size: 25px;
        color: rgba(0, 0, 0, 0.82);
        margin-bottom: 20px;
        transition:color .6s linear;
    }
    .p_active {
        color: orangered;
        font-size: 35px;
    }
    scrollbar-width: none; /* firefox */
}
</style>