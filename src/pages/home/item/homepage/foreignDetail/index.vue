<template>
<div class="contain">
    <div class="top" v-if="fD">
        <van-image :src="fD.al.picUrl" round/>
        <div class="r">
            <h3>{{fD.name}}</h3>

            <van-popover v-model:show="singerDetails">
                <div class="singerDetails" v-if="singer">
                    <van-image :src="proxy.$i.baseURL+'\\'+singer.avatar" round/>
                    <div class="intro">{{singer.introduce}}</div>
                </div>
                <template #reference>
                    <p>{{fD.ar[0].name}}</p>
                </template>
            </van-popover>

            <div>
                {{fD.introduction}}
            </div>
        </div>
    </div>
    <div class="middle">
        <van-button size="mini" color="linear-gradient(to right, #0aeeaa, #34ffe7)" @click="fdCollect"
                    icon="like-o">
            收藏
        </van-button>
        <van-button size="mini" color="linear-gradient(to right, #ff6034, #ee0a24)"
                    icon="play-circle-o" @click="fdPlay(fD)">
            播放
        </van-button>
    </div>
    <van-divider dashed>Relating Music</van-divider>
    <van-cell-group>
        <van-cell v-for="r in ranRelateMusic" :key="r">
            <template #title>
                <div class="title">
                    <van-image :src="r.al.picUrl" round fit="fill"/>
                    <div>{{r.name}}</div>
                </div>
            </template>
            <template #value>
                <div class="value">
                    <div>
                        <van-icon name="play-circle-o" @click="enterPlay(r)"/>
                        <van-icon name="video-o" @click="fdCollect"/>
                    </div>
                </div>
            </template>
        </van-cell>
    </van-cell-group>
</div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, getCurrentInstance, onBeforeMount,ref} from "vue";
import {Toast} from "vant";
import {randomArr} from "../../../../../hooks/statisticMethod/arrMethod.js";
import emitter from "../../../../../hooks/mitt/index.js";

const route=useRoute()
const store=useStore()
const {proxy}=getCurrentInstance()
const fD=ref(null)
const singer=ref(null)
// const fD=computed(()=>store.state.music.foreignList.find(it=>it.musid==route.query.musid))
const relateMusic=computed(()=>store.state.music.foreignList.filter(it=>it.ar[0].name==route.query.singerName))

// console.log(relateMusic.value,route.query.singerName)
const ranRelateMusic=randomArr(relateMusic.value,relateMusic.value.length)
onBeforeMount(async ()=>{
    let r=await proxy.$req.get(`/music/musicdetail/${route.query.musid}`)
    // console.log(r.data)
    fD.value=r.data
    let r2=await proxy.$req.get(`/singer/singerdetail?id=${r.data.ar[0].singerId}`)
    singer.value=r2.data
})
const fdCollect=()=>{
Toast('暂未开放')
}
const fdPlay=(item)=>{
    emitter.emit('foreignPlayMusic',{item})
}
const enterPlay=(item)=>{
    fdPlay(item)
    setTimeout(()=>{
        store.commit('musicaudio/changeaudioS')
    },500)
}

const singerDetails=ref(false)
</script>

<style scoped lang="less">
@import "../../../../../style/usual";
*{
    padding: 0;
    margin:0;
    box-sizing: border-box;
}
.contain{
    padding: 10px;
    .top{
        display: grid;
        grid-template-columns: 220px 1fr;
        place-content: center;
        height: 220px;
        .van-image{
            transform: translateY(20%);
            width: 200px;
            height: 200px;
            border: rgba(135, 206, 235, 0.5) 10px solid;
        }
        .r{
            height: 220px;
            display: flex;
            flex-direction: column;
            //align-items: center;
            justify-content: space-around;
            font-size: 25px;
            h3{
                font-size: 30px;
            }
            p{
                color: #999999;
                .mouse_hover(@fontC: green);
            }
            >div{
                font-size: 22px;
                //border: #07c160 1px solid;
                color: skyblue;
                height: 120px;
                overflow: auto;
                .mouse_hover(@fontC: orangered);
            }
        }
    }
    .middle{
        padding: 10px 0;
        margin-right: 30px;
        display: flex;
        justify-content: flex-end;
        .van-button{
            padding: 0 5px;
            //background: linear-gradient(to right, #0aeeaa, #34ffe7);
            margin-right: 20px;
        }
    }
    .van-cell-group{
        width: 100%;
        .van-cell{
            width: 100%;
            padding: 10px 50px;
            .title{
                //height: 100px;
                /*display: flex;
                align-items: center;
                justify-content: space-around;*/
                display: grid;
                grid-template-columns: 120px 1fr;
                align-items: center;
                .van-image{
                    width: 100px;
                    height: 100px;
                }
            }
            .value{
                width: 100%;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .van-icon{
                    font-size: 30px;
                  &:first-child{
                      margin-right: 15px;
                      .mouse_hover();
                  }
                    &:last-child{
                        .mouse_hover(@fontC: purple);
                    }
                }
            }
        }
    }
}
.singerDetails{
    padding: 15px;
    display: grid;
    grid-template-columns: 160px 1fr;
    place-content: center;
    .van-image{
        height: 150px;
        width: 150px;
    }
    .intro{
        color: #999999;
        font-size: 20px;
        height: 160px;
        overflow: auto;
    }
}
</style>