<template>
    <div class="contain">

        <div class="top">
            <van-icon name="arrow-down" size="20"/>
            <div>
                <h4>exile</h4>
                <span>Taylor swift</span>
            </div>
            <div></div>
        </div>

        <div class="middle">
            <div class="reverse">
                <div :class="play?'imgAnimate':''">
                    <img :src="xy" ref="imgAnimate">
                    <div></div>
                </div>
            </div>
        </div>

        <div class="bottom">
            <div class="a">
                <span>00:00</span>
                <van-slider v-model="value" active-color="#ee0a24" @change="onChange">
                    <template #button>
                        <div class="custom-button">{{ value }}</div>
                    </template>
                </van-slider>
                <span>03:13</span>

            </div>
            <div class="b">
                <div>
                    <van-icon name="replay" size="20"/>
                    <van-icon name="arrow-left" size="20"/>
                    <van-icon :name="play?'pause-circle-o':'play-circle-o'" size="30" @click="btnc"/>
                    <van-icon name="arrow" size="20"/>
                    <van-icon name="more-o" size="20"/>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import xy from '/image/xy.png'
import {onBeforeMount, ref} from "vue";
let value=ref(20)
const onChange=(value)=>{
    console.log(value)
}
let play=ref(false)
const imgAnimate=ref()
onBeforeMount(()=>{
    // if (play.value) imgAnimate.value
})
const btnc=()=>{
    play.value=!play.value

}
</script>

<style scoped lang="less">
@import "../../style/overflex";
@import "../../style/usual";

.contain {
    .top {
        .flex_center(@row: @align_type1);

        .van-icon {
            margin-left: 5%;
        }

        > div {
            .flex_center(@dir: @direction);

            h4 {
                font-size: 20px;
            }

            span {
                font-size: 18px;
            }
        }
    }

    .middle {
        margin-top: 25%;
        width: 100%;
        .flex_center();

        .reverse {
            > div {
                width: 350px;
                height: 350px;
                border: orange solid 1px;
                position: relative;
                border-radius: 50%;
                > img {
                    width: 300px;
                    height: 300px;
                    position: absolute;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    border: 1px green solid;
                    background-size: cover;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }

    .bottom{
        bottom: 2%;
        width: 100%;
        position: absolute;
        .a{
            padding: 8px;
            .flex_center(@row: @align_type1);
            .van-slider{
                margin: 0 5px;
                .custom-button {
                    width: 26px;
                    color: #fff;
                    font-size: 10px;
                    line-height: 18px;
                    text-align: center;
                    background-color: #ee0a24;
                    border-radius: 100px;
                }
            }
        }
        .b{
            height: 50px;
            .flex_center();
            >div{
                width: 70%;
                .flex_center(@row: @align_type1);
                .van-icon{
                    &:first-child{
                        .mouse_hover(@fontC: orange);
                    }
                    &:last-child{
                        .mouse_hover();
                    }
                    &:nth-child(2n){
                        .mouse_hover(@fontC: silver);
                    }
                    &:nth-child(3){
                        .mouse_hover(@fontC: red);
                    }
                }
            }
        }
    }
}

@keyframes pulse {
    50% {
        box-shadow: 0 0 0 50px rgba(255, 255, 255, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
}
@keyframes roll {
    0%{
        transform: rotateZ(0deg);
    }
    100%{
        transform: rotateZ(360deg);
    }
}
.imgAnimate{
    animation: roll infinite 5s linear;
}
</style>