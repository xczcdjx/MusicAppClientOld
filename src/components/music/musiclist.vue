<template>
<div class="contain">
    <div class="a">
        <h3>当前播放列表</h3>
    </div>
    <div>
        <van-cell  clickable v-for="(p,i) in playlist" :key="p.id">
            <template #title>
                <div @click="listIndexChange(i)" class="left">
                <span :class="playlistIndex==i?'active':''">{{p.name}}&nbsp;</span>
                <van-tag type="danger" v-show="playlistIndex==i?true:false">当前播放</van-tag>
                </div>
            </template>
            <template #right-icon>
                <div class="right">
                    <van-icon name="cross" @click="deleteListMusic(i,p.name)"/>
                </div>
            </template>
        </van-cell>
    </div>
</div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import {Notify, Toast} from "vant";
import {musicControls} from "../../hooks/musicControls/index.js";
import emitter from "../../hooks/mitt/index.js";
const store=useStore()
const playlist=computed(()=>store.state.musicaudio.itemM)
const playlistIndex=computed(()=>store.state.musicaudio.itemMIndex)
const playStatus=computed(()=>store.state.musicaudio.isPlay)
const listIndexChange=(i)=>{
    store.commit('musicaudio/updateitemMIndex',i)
}
const deleteListMusic=(i,pName)=>{
    if (playStatus.value){
        Toast('请暂停音乐后操作')
    }else {
        if (playlist.value.length==1){
            Notify({ type: 'danger', message: '该列表就剩一首歌了,无法删除' });
        }else {
            if (playlistIndex.value==i){
                Toast('暂无法删除当前播放歌曲')
            }else if (playlistIndex.value>i){
                // console.log(i,playlistIndex.value)
                store.commit('musicaudio/deleteitemMIndex', i)
                musicControls(-1)
                emitter.emit("changeMusicState2",{p:2})
                Notify({type: 'warning', message: pName + '已从列表删除'});
            }else {
                store.commit('musicaudio/deleteitemMIndex', i)
                Notify({type: 'warning', message: pName + '已从列表删除'});
            }
        }
    }
}
</script>

<style scoped lang="less">
@import "../../style/usual";
.contain{
    padding: 10px 20px;
    .a{
        h3{
            font-size: 30px;
        }
    }
    .left{
        >span:first-child{
            .mouse_hover();
        }
        .active{
            color: orangered;
        }
    }
    .right{
        .van-icon{
            .mouse_hover(#07c160);
        }
    }
}
</style>