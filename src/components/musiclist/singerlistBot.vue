<template>
<div v-if="itemM">
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="l">
                <van-icon name="play-circle-o" @click="playMusic(0)"/>
                <span>播放全部<span>(共{{itemM.length}}首)</span></span>
            </div>
                <van-button size="small" icon="add-o" plain round v-if="subscribedCount" type="primary">收藏({{playfilter(subscribedCount)}})</van-button>
        </div>
        <div class="itemListContent">
            <div class="itemList" v-for="(item,i) in itemM" :key="i" @click="playMusic(i)">
                <div class="listLeft">
                    <span class="index">{{i+1}}</span>
                    <div class="content">
                        <div>{{item.name}}</div>
                        <div>
                            <span v-for="(ar,index) in item.ar" :key="index">
                            <span class="aa">{{ar.name}}&nbsp</span>
                        </span>
                        </div>
                    </div>
                </div>
                <div class="listRight">
                    <van-icon name="video-o" v-if="item.mv != 0"/>
                    <van-icon name="ellipsis" class="liebiao"/>

                </div>
            </div>
            <div class="block"></div>
        </div>
    </div>
</div>
</template>

<script>
import {defineComponent} from "vue"
import {filterNum} from "../../hooks/statisticMethod/arrMethod.js";
import {useStore} from "vuex";
export default defineComponent({
    props:['itemM','subscribedCount'],
    setup(props){
        const store=useStore()
        const playMusic=(i)=>{
            store.commit('musicaudio/updateitemM',props.itemM)
            store.commit('musicaudio/updateitemMIndex',i)
        }
        const playfilter=(v)=>{
            return filterNum(v)
        }
        return{
            playMusic,playfilter
        }
    },
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
.itemMusicList{
    margin-top: 40px;
    width: 100%;
    height: 1100px;
    background: antiquewhite;
    border-radius: 20px 20px 0 0 ;
    .itemListTop{
        width: 100%;
        height: 80px;
        padding: 0 10px;
        .flex_center(@row: @align_type1);
        .l{
            font-size: 30px;
            .flex_center(@row: @align_type1);
            >.van-icon{
                margin-right: 10px;
                .mouse_hover();
            }
        }
    }
    .itemListContent{
        width: 100%;
        background: antiquewhite;
        .itemList{
            width: 100%;
            height: 100px;
            padding: 0 20px;
           .flex_center(@row: @align_type1);
            .listLeft{
                width: 80%;
                height: 100%;
                display: flex;
                align-items: center;
                .index{
                    font-size: 30px;
                    display: inline-block;
                    width: 15px;
                    text-align: center;
                }
                .content{
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    margin-left: 40px;
                    div{
                        margin-top: 10px;
                        font-size: 30px;
                        width: 250px;
                        //height: .4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: 700;
                    }
                    div:last-child{
                        span{
                            font-weight: 400;
                            font-size: 20px;
                            color: #999;
                        }
                    }
                }
            }
            .listRight{
                width: 20%;
                height: 100%;
                display: flex;
                font-size: 40px;
                align-items: center;
                position: relative;
                .van-icon{
                    position: absolute;
                    z-index: 2;
                }
                .liebiao{
                    position: absolute;
                    right: 0;
                }
            }
        }
        .itemList:hover{
            background: #999999;
        }

    }
    .block{
        width: 100%;
        height: 1.4rem;
    }
}
</style>