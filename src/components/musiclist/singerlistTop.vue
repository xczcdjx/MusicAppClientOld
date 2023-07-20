<template>
<div class="contain" v-if="itemlist">
    <img :src="itemlist.coverImgUrl" class="bg">
<div class="top">
    <div>
        <van-icon name="revoke" class="a" @click="$router.go(-1)"/>
        <span>歌单</span>
    </div>
    <div>
        <van-icon name="search" class="a"/>
        <van-icon name="apps-o" />
    </div>
</div>
    <div class="mid">
        <div>
            <van-image :src="itemlist.coverImgUrl" radius="10"/>
            <div class="play">
                <van-icon name="play-circle-o" size="6"/>
                <span>{{filtern(itemlist.playCount)}}</span>
            </div>
        </div>

        <div>
            <span>{{itemlist.name}}</span>
            <div>
<!--                <span>{{itemlist.creator.nickname}}</span>-->
                <van-image :src="itemlist.creator.backgroundUrl" round/>
                <span>&nbsp;{{itemlist.creator.nickname}}</span>
            </div>
            <span>{{itemlist.description}}</span>
        </div>
    </div>
    <div class="bot">
        <van-icon name="chat-o" />
        <van-icon name="share-o" />
        <van-icon name="down" />
        <van-icon name="completed" />
    </div>
</div>
    <van-loading size="24px" v-if="!itemlist">加载中...</van-loading>
</template>

<script>
import {defineComponent} from "vue";
import {filterNum} from "../../hooks/statisticMethod/arrMethod.js";
export default defineComponent({
    props:[
        'itemlist'
    ],
    setup(props){
        // console.log(props.itemlist)
        const filtern=(v)=>{
            return filterNum(v)
        }
        return{
            filtern
        }
    }
})
</script>

<style scoped lang="less">
@import "../../style/overflex";
@import "../../style/usual";
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.contain{
    position: relative;
    .bg{
        width: 100%;
        height: 400px;
        position: fixed;
        z-index: -1;
        filter:blur(30px);
    }
    .top{
        padding: 10px;
        .flex_center(@dir: @direction_row;@row: @align_type1);
        >div{
            .flex_center(@dir: @direction_row;@row: @flex_start);
            font-size: 35px;
            color: #fff;
            .a{
                margin-right: 30px;
            }
            .van-icon{
                .mouse_hover();
            }
        }
    }
    .mid{
        margin-top: 40px;
        &:extend(.flex_default);
        padding: 10px;
        >div:first-child{
            position: relative;
            width: 30%;
            .van-image {
                height: 230px;
            }
            >.play{
                text-align: center;
                border-radius: 10px 0 10px 0;
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
                    width: 90px;
                    //height: 15px;
                    line-height: 15px;
                }
            }
        }
        >div:last-child{
            font-size: 25px;
            height: 230px;
            margin-left: 10px;
            overflow: hidden;
            width: 70%;
            .flex_center(@dir: @direction;@col: @flex_start;@row: @align_type2);
            .van-image{
                width: 50px;
                height: 50px;
            }
            >span:first-child{
                color: white;
            }
            >div{
                height: 55px;
                .flex_center(@row: @flex_start);
            }
            >span:last-child{
                height: 120px;
                overflow: auto;
                &:hover{
                    color:red;
                }
            }
        }
    }
    .bot{
        margin-top: 25px;
        font-size: 40px;
        color: #fff;
        .flex_center(@row: @align_type2);
        .van-icon{
            .mouse_hover(skyblue);
        }
    }
}
.van-loading{
    margin-top: 50px;
    text-align: center;
}
</style>