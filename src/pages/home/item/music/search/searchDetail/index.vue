<template>
<div class="contain">
        <div v-if="searchList" class="searchlist">
            <div class="top">
                <span>单曲</span>
                <van-button plain size="small" type="danger" @click="playAll">播放全部</van-button>
            </div>
            <van-cell-group inset>
                <van-cell clickable size="large"  v-for="(s,i) in searchList" :key="s.id">
                    <template #title>
                        <div @click="updateIndex(s,i)">
                            <span>{{i+1}}.&nbsp;</span>
                            <span>{{s.name}}</span>
                        </div>
                    </template>
                    <template #label>
                        <span v-for="(ar,i) in s.ar" :key="i">
                            <span>{{ar.name}}</span>
                        </span>
                    </template>
                    <template #value>
                        <van-icon name="video-o" v-show="s.mvid"/>&nbsp;
                        <van-icon name="more-o" />
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    <van-empty v-else description="没有搜索到音乐"/>
</div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import {getCurrentInstance} from "vue";
import {compareExist, fillMusic, musicControls, resetList} from "../../../../../../hooks/musicControls/index.js";
import emitter from "../../../../../../hooks/mitt/index.js";
import {Toast} from "vant";
const store=useStore()
const playListIndex=computed(()=>store.state.musicaudio.itemMIndex)
const playList=computed(()=>store.state.musicaudio.itemM)
const route=useRoute()
let kname=route.query.kname
let mname=route.query.mname
const searchList=ref([])

onBeforeMount(()=>{
    searchMusic(kname||mname)
})

const {proxy}=getCurrentInstance()
async function searchMusic(str){
    let r=await proxy.$Netreq.get(`/cloudsearch?keywords=${str}`)
    // console.log(r.result.songs)
    searchList.value=r.result.songs
}

const updateIndex=(item,i)=>{
    console.log(item.name)
    let musIndex=0
    if (compareExist('name',item.name)){
        playList.value.find((it,index)=>{
            // arr.push(index)
            if (it.id===item.id){
                musIndex=index
            }
            return it.id===item.id
        })
        // console.log(musIndex)
        store.commit('musicaudio/updateitemMIndex',musIndex)
    }else {
        // console.log(12345)
        store.commit('musicaudio/spliceitemM', item)
        musicControls(1)
        // console.log(1)
    }
}

const playAll=()=>{
    if (fillMusic(searchList.value)){
        if (playListIndex.value===0){
            Toast('你已在该列表')
            store.commit('musicaudio/updateitemMIndex',0)
        }else {
            emitter.emit("changeMusicState2",{p:2})
        }
    }else {
        resetList(searchList.value)
    }
}
</script>

<style scoped lang="less">
@import "../../../../../../style/overflex";
*{
    box-sizing: border-box;
}
.contain{
    margin-bottom: 100px;
    font-size: 45px;
    //width: 100%;
    .searchlist{
        //border: orangered solid 1px;
        //width: 100%;
        .top{
            .flex_center(@row: @align_type1);
            padding: 10px 60px;
            >span{
                font-weight: 600;
                font-size: 40px;
            }
        }
    }
}
</style>