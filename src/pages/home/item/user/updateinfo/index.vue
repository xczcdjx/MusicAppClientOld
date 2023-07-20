<template>
    <div>
        <van-form>
            <van-field
                v-model="form.username"
                label="用户名"
                placeholder="请输入用户名"
                disabled
            />
            <van-cell title="头像">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon class="right">
                    <van-uploader v-model="fileList" :after-read="afterRead" :max-size="1024 * 1024" @oversize="onOversize" :before-read="beforeRead"  multiple preview-size="40" :max-count="1" />
                </template>
            </van-cell>
            <van-field
                v-model="form.nickname"
                label="昵称"
                placeholder="请输入用户名"
            />
                    <van-cell title="性别" :value="form.sex==0?'男':'女'" @click="flag=true" />

            <van-field
                v-model="form.email"
                label="邮箱"
                placeholder="请输入邮箱"
            />
            <van-field
                v-model="form.phone"
                label="电话"
                placeholder="请输入联系电话"
                :rules="[{ required: true, message: '请填写电话' }]"
            />
            <div style="text-align: center;margin: 20px">
                <van-button type="success" round size="small" native-type="submit" @click="submit(form)">修改</van-button>
                <van-button type="warning" round size="small" @click="reset(form)" style="margin-left: 20px"> 重置
                </van-button>
            </div>
        </van-form>
            <van-action-sheet
                v-model:show="flag"
                :actions="actions"
                cancel-text="取消"
                close-on-click-action
                @cancel="flag=false"
                @select="onSelect"
            />
    </div>
</template>

<script setup>

import {computed, getCurrentInstance, reactive, ref} from "vue";
import {Toast} from "vant";
import {wait} from "../../../../../hooks/waitload.js";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const {proxy} = getCurrentInstance()
const router=useRouter()
const flag=ref(false)
const store=useStore()
const userlist=computed(()=>store.state.user.userinfo)
const form = reactive({
    avatar: '',
    username: '',
    nickname: '',
    sex: 0,
    phone: '',
    email: ''
})
Object.assign(form,userlist.value)
const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
const submit = ({avatar, nickname, sex, phone, email}) => {
    if (!phone){
        Toast('电话未填写')
    }
    if (email.length) {
        if (!reg.test(email)) {
            Toast('该邮箱格式不对,请重新填写')
            form.email = ''
        }
    }
    if (phone.length<7||phone.length>11) {
        Toast('电话长度不对,最小长度为7位,最大长度为11位')
    }
    else {
        wait().then(v=>{
            if (v=='success'){
                return proxy.$req.put('/users/updateinfo',{avatar, nickname, sex, phone, email})
            }
        }).then(v=>{
            Toast(v.data)
            setTimeout(()=>{
                router.replace({
                    name:'user'
                })
            },500)
        }).catch(r=>{
            console.log(r)
        })
    }
}
const reset = () => {
    clear()
}
const clear = () => {
    form.phone = ''
    form.nickname = ''
    form.sex = 0
    form.email = ''
}
const actions = [
    { name: '性别选择' },
    { name: '男' },
    { name: '女' },
];
const onSelect=(e)=>{
        if (e.name=='男'){
            form.sex=0
        }else if (e.name=='女') {
            form.sex = 1
        }
}

// upload
const afterRead = (file) => {
    const formData = new FormData();
    // 添加文件信息
    formData.append("file", file.file);
    formData.append("name", 'photo');
    proxy.$req.post('/prod/upload/image', formData).then(v=>{
        Toast('上传成功')
        form.avatar=v.path
    },r =>{
        Toast('上传失败')
    })
    // 此时可以自行将文件上传至服务器
    // console.log(file.file.name)
    // f.avatar=file.file.name
};
const fileList = ref([
    // Uploader 根据文件后缀来判断是否为图片文件
    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
    // { url: 'https://cloud-image', isImage: true },
]);
const beforeRead = (file) => {
    console.log(file.type)
    if (file.type !== 'image/jpeg'&&file.type!=="image/png") {
        Toast('请上传 jpg或png 格式图片');
        return false;
    }
    return true;
};
const onOversize = (file) => {
    console.log(file);
    Toast('文件大小不能超过 2mb');
};
</script>

<style scoped lang="less">

</style>