<template>
<div>
<singerlist-top :itemlist="playlist"/>
    <singerlist-bot :item-m="itemlist" :subscribed-count="subscribedCount"/>
</div>
</template>

<script setup>
import {useRoute} from "vue-router";
import SingerlistTop from "../../../../components/musiclist/singerlistTop.vue";
import {getCurrentInstance,  onMounted, ref} from "vue";
import SingerlistBot from "../../../../components/musiclist/singerlistBot.vue";

const route=useRoute()
const {proxy}=getCurrentInstance()
let playlist=ref()
let itemlist=ref()
let subscribedCount=ref(0)
onMounted(async ()=>{
    try {
        let r1=await proxy.$Netreq.get(`/playlist/detail?id=${route.query.id}`)
        let r2=await proxy.$Netreq.get(`/playlist/track/all?id=${route.query.id}&limit=50&offset=0`)
        playlist.value=r1.playlist
        itemlist.value=r2.songs
        subscribedCount.value=r1.playlist.subscribedCount
    }catch (e) {
        console.log(e)
    }
})
</script>

<style scoped lang="less">

</style>