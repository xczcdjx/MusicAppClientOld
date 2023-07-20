<template>
<div class="contain">
    <van-nav-bar left-arrow @click-left="onBack">
        <template #right>
            <div class="search">
                <van-search
                    ref="seal"
                    v-model="search"
                    @search="onSearch"
                    shape="round"
                    show-action
                    placeholder="music search"
                    autofocus
                    :clearable="false"
                    @update:model-value="searchSlow($event)"
                >
                    <template #action>
                        <div @click="onSearch">Search</div>
                    </template>
                </van-search>


            </div>
        </template>
    </van-nav-bar>
    <van-cell-group inset class="cell" >
        <van-cell v-if="S_suggest.length" v-for="(s,i) in S_suggest" @click="searchD(s.musicid)" clickable :title="s.musicname" :key="i"  />
    </van-cell-group>
    <van-empty description="what a pity,nothing is here" class="cell2" v-if="!S_suggest.length"/>

</div>
</template>

<script setup>
import {getCurrentInstance, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {Toast} from "vant";

const search=ref('')
const {proxy}=getCurrentInstance()
const router=useRouter()
const onBack=()=>{
    router.back()
}
const seal=ref(null)
onMounted(()=>{
    seal.value.focus()
})
const onSearch = () => {
    if (!search.value.length){
        Toast('content is not empty')
    }else {
        router.push({
            name:'musicsearchdetail',
            query:{
                key:search.value
            }
        })
    }
}

let S_suggest=ref([])

async function searchSlow(s){
    if (s.length!=0) {
        let r = await proxy.$req.get(`/music/musicsearch?search=${s}`)
        try {
            S_suggest.value=r.data
        }catch (e) {
            console.log(e)
        }
    } else {
        S_suggest.value=[]
    }
}
const searchD=(i)=>{
    router.push({
        name:'musicsearchdetail',
        query:{
            id:i
        }
    })
}
</script>

<style scoped lang="less">
.contain{
    .search{
        width: 620px;
    }
}
</style>