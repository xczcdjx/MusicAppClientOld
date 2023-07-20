<template>
    <swiper
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
        <swiper-slide>
            <img :src="l1">
            <div class="wrap">
                <div class="animate jackInTheBox">
                    <van-image :src="icon"/>
                </div>
                <div class="animate fadeIn">
                    网易云音乐
                </div>
                <div class="bot">
                    <div class="animate zoomIn">
                        漫品人间烟火色，闲观万事岁月长
                    </div>
                    <div class="animate zoomIn z2">
                        囿于市井，面向山海。远隔巷弄，且看花开
                    </div>
                    <div class="animate zoomIn z3">
                        辞暮尔尔，烟火年年
                    </div>
                </div>
                <div class="rarrow">
                    <img :src="rarrow">
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <img :src="l2">
            <div class="wrap">
                <div class="animate jackInTheBox">
                    <van-image :src="icon"/>
                </div>
                <div class="animate fadeIn">
                    NetEaseCloud_Music
                </div>
                <div class="bot2">
                    <p class="animate slideInUp s1">Stray birds of summer come to my window to sing and fly away.</p>
                    <p class="animate slideInUp s2">And yellow leaves of autumn.</p>
                    <p class="animate slideInUp s3"> which have no songs, flutter and fall there with a sign.</p>
                </div>
                <div class="rarrow">
                    <img :src="rarrow">
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <img :src="l3">
            <div class="wrap">
                <div class="animate jackInTheBox">
                    <van-image :src="icon"/>
                </div>
                <div class="rarrow">
                    <img :src="rarrow">
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <img :src="l5">
            <div class="wrap">
                <div class="animate jackInTheBox">
                    <van-image :src="icon"/>
                </div>
                <div class="rarrow">
                    <img :src="rarrow">
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <img :src="l4">
            <!--            <transition appear
                                    name="animate__animated animate__bounce"
                                    enter-active-class="animate__backInUp"
                                    leave-active-class="animate__backOutDown"
                                    appear-active-class="animate__bounceIn"
                        >

                        </transition>-->

            <div class="outer animate rotateIn rotateOut">
                <section>
                    <form action="">
                        <p>Input app security key</p>
                        <input type="text" placeholder="appkey" v-model="appkey">
                        <!--                            <input type="password" placeholder="password" v-model="appkey">-->
                        <!--                        <span @click="register">Create account?</span>-->
                        <button type="button" @click="Verify">Verify</button>
                    </form>
                </section>
            </div>
        </swiper-slide>
    </swiper>
</template>
<script>
import 'animate.css'
import l1 from '/load/1.jpeg'
import l2 from '/load/2.jpeg'
import l3 from '/load/3.jpeg'
import l4 from '/load/4.jpeg'
import l5 from '/load/5.jpeg'
import icon from '../../assets/ic/icon.png'
import rarrow from '../../assets/ic/rarrow2.png'
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';


// Import Swiper styles
import 'swiper/css';
import {getCurrentInstance, ref} from "vue";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {setStorage} from "../../utils/storage/localstorage.js";
import {setAppkeyTime} from "../../utils/verifyexpire/duration.js";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');
        };
        const appkey = ref('');
        const router = useRouter()
        const {proxy} = getCurrentInstance()
        const Verify = () => {
            if (!appkey.value) {
                Toast('appkey不能为空!!!')
            } else {
                proxy.$req.get(`/verify/access?appkey=${appkey.value}`).then(v => {
                    if (v.appResponse == appkey.value.slice(0, 5)) {
                        Toast(v.msg)
                        setTimeout(() => {
                            router.replace('/singIn')
                        }, 500)
                        setStorage('appkey', appkey.value)
                        setAppkeyTime()
                    } else {
                        Toast(v.data.appResponse)
                    }
                }, r => {
                    Toast(r.response.data.msg)
                    console.log(r.response.data)
                    appkey.value = ''
                })
            }
        };
        return {
            onSwiper,
            onSlideChange, appkey, Verify,
            l1, l2, l3, l4, l5, icon, rarrow
        };
    },
};
</script>
<style lang="less" scoped>
.swiper {
    color: #000;

    .swiper-slide {
        position: relative;
        height: 100vh;
        width: 100%;

        img {
            position: absolute;
            background-size: cover;
            width: 100%;
            opacity: 0.8;
            height: 100vh;
            z-index: -2;
        }

        & {
            z-index: 66;

            .wrap {
                position: relative;
                box-sizing: border-box;
                padding: 20px;

                .van-image {
                    width: 60px;
                    height: 60px;
                }

                .bot {
                    margin-top: 100px;
                    display: flex;
                    width: 80%;
                    justify-content: space-around;
                }

                .rarrow {
                    position: absolute;
                    opacity: 0.5;
                    right: 120px;
                    top: 50%;
                    animation: recycle infinite 1s ease-in-out alternate;

                    > img {
                        width: 80px;
                        height: 30px;
                    }
                }

                .bot2 {
                    margin-top: 150px;
                    margin-left: 40px;
                    font-size: 40px;
                    line-height: 100px;
                    -webkit-transform:skew(-5deg);
                }
            }
        }

        &:nth-child(5) {
            /*img {
                position: fixed;
            }*/

            .outer {
                position: fixed;
                /* font-size: 30px;
                 height: 100%;
                 font-family: 'Poppins', sans-serif;
                 overflow-x: hidden;*/
                //position: absolute;
                font-size: 30px;
                width: 100%;
                height: 100vh;
                display: grid;
                place-content: center;

                section {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;

                    form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        position: relative;
                        z-index: 3;
                        width: 320px;
                        background-color: rgba(255, 255, 255, .1);
                        padding: 45px 30px;
                        border-radius: 8px;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, .5);
                        border: 1px solid rgba(255, 255, 255, .6);
                        border-right: 1px solid rgba(255, 255, 255, .3);
                        border-bottom: 1px solid rgba(255, 255, 255, .6);
                        /*box-shadow: 0 20px 40px rgba(0, 0, 0, .1);
                        border: 1px solid rgba(255, 255, 255, .2);
                        border-right: 1px solid rgba(255, 255, 255, .1);
                        border-bottom: 1px solid rgba(255, 255, 255, .2);*/
                        backdrop-filter: blur(20px);

                        p {
                            //font-size: 25px;
                            color: #fff;
                            display: block;
                            text-align: center;
                            margin: 0 0 30px 0;
                        }

                        /* span {
                             color: #ffc107;
                             display: block;
                             margin: 15px 0;
                             cursor: pointer;
                             font-size: 27px;

                             &:hover {
                                 color: #03a9f4;
                             }

                             &:active {
                                 color: #ff105e;
                             }
                         }*/
                    }

                    input {
                        font-size: 25px;
                        width: 100%;
                        height: 50px;
                        border-radius: 8px;
                        background-color: transparent;
                        border: 1px solid rgba(255, 255, 255, .5);
                        margin-bottom: 15px;
                        padding-left: 15px;
                        //color: #fff;
                        color: orangered;
                        outline: none;

                        &::placeholder {
                            color: #fff;
                        }
                    }

                    button {
                        width: 100%;
                        height: 50px;
                        border: 0;
                        background-image: linear-gradient(to right, #02aab0 0%, #00cdac 51%, #02aab0 100%);
                        background-size: 200% auto;
                        border-radius: 8px;
                        color: #fff;
                        outline: none;
                        cursor: pointer;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, .1);
                        transition: ease .4s;

                        &:hover {
                            background-position: right center;
                            color: #fff;
                            text-decoration: none;
                        }
                    }

                }
            }
        }
    }
}

.swiper-slide-active {
    & {
        .animate {
            animation-duration: 2s;
            animation-fill-mode: both;
        }

        .jackInTheBox {
            animation-name: jackInTheBox;
        }

        .fadeIn {
            color: #ffd500;
            font-size: 25px;
            text-shadow: 0 8px 10px #f40343;
            font-weight: bolder;
            text-align: center;
            animation-name: fadeIn;
            margin-top: -60px;
        }

        .rotateIn {
            animation-name: rotateIn;
        }

        .zoomIn {
            animation-name: zoomIn;
            font-size: 60px;
            //color: ;
            font-family: 华文行楷;
            margin-left: 80px;
            writing-mode: vertical-lr;
            font-weight: bolder; /*设置字体粗细*/
            -webkit-text-stroke: 1.5px rgb(244, 3, 67); /*文字描边*/
            -webkit-text-fill-color: transparent;
        }

        .z2 {
            animation-duration: 3s;
            margin-top: 30px;
            font-size: 45px;
            -webkit-text-stroke: 1.2px rgb(255, 193, 7);
        }

        .z3 {
            animation-duration: 4s;
            margin-top: 180px;
            font-size: 35px;
            -webkit-text-stroke: 1px rgb(52, 255, 231);
        }
        .slideInUp{
            animation-name: slideInUp;
            &.s1{
                animation-duration: 2s;
                color: orange;
            }
            &.s2{
                animation-duration: 3s;
                color: #07c160;
            }&.s3{
                 animation-duration: 4s;
            color: red;
             }
        }
    }
}

@keyframes recycle {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.3);
    }
}
</style>
