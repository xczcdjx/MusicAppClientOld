<template>
<div class="contain">
    <van-nav-bar  left-arrow @click-left="router.go(-1)">
        <template #title>
            <van-search
                ref="searchRef"
                @search="onSearch"
                v-model="search"
                @update:model-value="searchShake(searchSlow($event),1000)"
                placeholder="search music"
                right-icon="cross"
                :clearable="false"
                maxlength="15"
                input-align="center"
                @click-right-icon="clearSearch"
            />
        </template>
        <template #right>
           <van-icon name="search" @click="onSearch(search)"/>
        </template>
    </van-nav-bar>

    <van-cell-group inset class="cell" >
        <van-cell v-show="S_suggest.length" v-for="(s,i) in S_suggest" @click="onKeySearch(s.keyword)" clickable :title="s.keyword" :key="i"  />
    </van-cell-group>

    <div class="searchHistory" v-if="!search">
        <span>历史</span>
        <div class="history">
            <van-tag v-for="(it,i) in historyList.slice(0,8)" :key="i" type="success" @click="searchHistory(it)">
                <span class="tag">{{it}}</span>
            </van-tag>
        </div>
        <van-icon name="delete-o" @click="clearSearchList" size="20"/>
    </div>

    <div class="hotSearch" v-if="!search">
        <van-divider dashed>热搜榜</van-divider>

        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell-group inset>
                <van-cell clickable v-for="(item,i) in list" :key="i" @click="hotSearch(item.searchWord)" :title="item.searchWord" >
                    <template #value>
                        <span class="cont">{{item.content.substring(0,10)}}...</span>
                    </template>
                </van-cell>
            </van-cell-group>
        </van-list>


    </div>

</div>
</template>

<script setup>
import {computed, getCurrentInstance, onDeactivated, onMounted, onUnmounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {getStorage, removeStorage, setStorage} from "../../../../../utils/storage/localstorage.js";
import {Toast} from "vant";
import {useStore} from "vuex";
import {searchShake} from "../../../../../hooks/premium/antiShake.js";
// import emitter from "../../../../../hooks/mitt/index.js";
const router=useRouter()
const store=useStore()
let historyList=ref(getStorage('historyM')||[])
const {proxy}=getCurrentInstance()

const searchRef=ref('')
onMounted(()=>{
    searchRef.value.focus()
})
const search=ref('')
let S_suggest=ref([])
async function searchSlow(s){
    if (s.trim().length!==0) {
        let r = await proxy.$Netreq.get(`/search/suggest?keywords=${search.value.trim()}&type=mobile`)
        try {
            S_suggest.value=r.result.allMatch
        }catch (e) {
            console.log(e)
        }
    } else {
        S_suggest.value=[]
    }
}

const onSearch=(s)=>{
    if (!s.length){
        Toast('搜索内容不能为空')
    }else {
        preserveHistory(s)
        router.push({
            name:'musicsearchdetail',
            query:{
                mname:s
            }
        })
    }
}
const onKeySearch=(k)=>{
    preserveHistory(k)
    router.push({
        name:'musicsearchdetail',
        query:{
            kname:k
        }
    })
}
const preserveHistory=(v)=>{
    historyList.value.unshift(v)
    // 数组去重
    historyList.value=[...new Set(historyList.value)]
    if (historyList.value.length>8){
        // historyList.value.splice(historyList.value.length-1,1)
        historyList.value.pop()
    }
    setStorage('historyM',historyList.value)
}
const clearSearchList=()=>{
    if (!historyList.value.length) return  Toast('已无历史记录可删')
    removeStorage('historyM')
    Toast('历史记录删除成功')
    historyList.value=[]
}
const searchHistory=(k)=>{
    router.push({
        name:'musicsearchdetail',
        query:{
            mname:k
        }
    })
}
const clearSearch=()=>{
    search.value=''
    S_suggest.value=[]
}
onUnmounted(()=>{
    search.value=''
})

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
    proxy.$Netreq.get('/search/hot/detail').then(v=>{
        list.value=v.data
        // console.log(v.data)
        loading.value=false
        finished.value=true
    },r=>{
        finished.value=true
        console.log(r)
    })
};
const hotSearch=(h)=>{
    onKeySearch(h)
}
</script>

<style scoped lang="less">
@import "../../../../../style/overflex";
@import "../../../../../style/usual";
*{
    /*padding: 0;
    margin: 0;*/
    box-sizing: border-box;
}
.contain{
    width: 100%;
    .searchHistory{
        .flex_center(@row: @flex_start;@col: @flex_start);
        position: relative;
        width: 100%;
        overflow: hidden;
        /*display: grid;
        grid-template-columns: 60px 1fr 30px;
        place-content: center;*/
        height: 100px;
        padding: 10px;
        >span:first-child{
            font-size: 25px;
            font-weight: 600;
        }
        >.history{
            //.flex_center(@row: @flex_start);
            margin-left: 10px;
            width: 75%;
            overflow: auto;
            height: 100px;
            /*display: grid;
            grid-template-rows: repeat(3,1fr);
            grid-template-columns:repeat(3,1fr) ;*/
            .van-tag{
                margin:8px 0 5px 10px;
                .tag{
                    .mouse_hover();
                }
            }
        }
        .van-icon{
            position: absolute;
            align-self: flex-end;
            top:10%;
            right: 1%;
            .mouse_hover();
        }
    }
    .searchlist{
        margin-top: 20px;
    }
    .hotSearch{
        margin-top: 20px;
        height: 800px;
        overflow: auto;
        .cont{
            font-size: 20px;
        }
    }
}
</style>
