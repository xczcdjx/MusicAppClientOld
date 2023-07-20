<template>
<div>
    <div class="bot">
        <div class="a">
            <van-image :src="userlist.avatar?proxy.$i.baseURL+'\\'+userlist.avatar:xy" fit="fill" round></van-image>
            <span>账号:{{userlist.username}}</span>
        </div>
        <van-cell-group>
            <van-cell title="信息修改" :to="{name:'updateinfo'}" is-link icon="user-o"/>
            <van-cell title="密码修改" :to="{name:'updatepass'}"  is-link icon="user-circle-o"/>
            <van-cell title="我的评论" :to="{name:'usercomment'}" is-link icon="comment-o"/>
<!--            <van-cell title="用户设置"  clickable icon="setting-o"/>-->
        </van-cell-group>
        <div style="text-align: center;margin: 20px 0">
            <van-button type="warning" round  @click="logout">退出登录</van-button>
        </div></div>
</div>
</template>

<script setup>
import xy from '/image/xy.png'
import {useStore} from "vuex";
import {Dialog} from "vant";
import {computed, getCurrentInstance, onBeforeMount, ref} from "vue";

const store=useStore()
const {proxy}=getCurrentInstance()
onBeforeMount(()=>{
    store.dispatch('user/getuserinfo')
})
const userlist=computed(()=>store.state.user.userinfo)

const logout=()=>{
    Dialog.confirm({
        title: '退出',
        message:
            '确认退出登录?',
    })
        .then(() => {
            // on confirm
            store.dispatch('user/logout')
        })
        .catch(() => {
            // on cancel
        });
}
</script>

<style scoped lang="less">
.bot{
    .a{
        //padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 250px;
        width: 100%;
        .van-image{
            width: 150px;
            height: 150px;
        }
    }
    span{
        color: darkgray;
        font-size: 25px;
    }
}
</style>