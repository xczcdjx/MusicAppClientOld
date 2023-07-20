<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="form.oldpassword"
                name="oldpassword"
                type="password"
                label="原密码"
                placeholder="原密码"
                :rules="[{ required: true, message: '请填写原密码' }]"
            />
            <van-field
                v-model="form.newpassword"
                type="password"
                name="newpassword"
                label="新密码"
                placeholder="新密码"
                :rules="[{ required: true, message: '请填写新密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="success" native-type="submit">
                修改
            </van-button>
        </div>
    </van-form>
</template>

<script setup>
import {getCurrentInstance, reactive, ref} from "vue";
import {Toast} from "vant";
import {useStore} from "vuex";
import {wait} from "../../../../../hooks/waitload.js";

const form=reactive({
    oldpassword:'',
    newpassword:''
})
const {proxy}=getCurrentInstance()
const store=useStore()
const onSubmit = (values) => {
    if (form.oldpassword==form.newpassword) Toast('新旧密码不能相同')
    else {
        proxy.$req.patch('/users/updatepass',values).then(v=>{
            Toast(v.data)
            wait('等待退出中...').then(v=>{
                if (v=='success'){
                    store.dispatch('user/logout')
                }
            })
        }).catch(r=>{
            clear()
            Toast('原密码错误')
        })
    }
}
const clear=()=>{
    form.oldpassword=''
}
</script>

<style scoped lang="less">

</style>