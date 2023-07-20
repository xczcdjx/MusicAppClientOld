<template>
    <div>
        <div class="contain">
            <section>
                <div class="color"></div>
                <div class="color"></div>
                <div class="color">434</div>
                <div class="box">
                    <div class="square" style="--i:0;"></div>
                    <div class="square" style="--i:1;"></div>
                    <div class="square" style="--i:2;"></div>
                    <div class="square" style="--i:3;"></div>
                    <div class="square" style="--i:4;"></div>
                    <div class="container">
                        <div class="form">
                            <h2>Register Form</h2>
                            <form>
                                <div class="inputBox">
                                    <input type="text" name="username2" v-model="form.username" placeholder="Username">
                                </div>
                                <div class="inputBox">
                                    <input type="password" v-model="form.password" placeholder="Password">
                                </div>
                                <div class="inputBox">
                                    <input type="text" v-model="form.phone" placeholder="Phone">
                                </div>
                                <div class="inputBox">
                                    <input type="button" @click="onSubmit" value="Register">
                                </div>
                                <!--                            <p class="forget">Forget Password ? <a href="#">Click here</a></p>-->
                                <p class="forget">Already have an account ? <span @click="toLogin">Login</span></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import {getCurrentInstance, onBeforeMount, reactive, ref} from "vue";
import {Toast} from "vant";
import {useRouter} from 'vue-router'
import {onMounted} from "vue";
const {proxy}=getCurrentInstance()
const router=useRouter()
const form=reactive({
    username:'',
    password:'',
    phone:''
})
onMounted(()=>{
    document.forms[0].username2.focus()
})
const onSubmit = () => {
    if (!form.username||!form.password||!form.phone){
        Toast('请填写账号,密码和手机号')
    }
    else {
        proxy.$req.post('/users/register',{
            username:form.username,
            password:form.password,
            phone:form.phone
        }).then(v=>{
            Toast('注册成功')
            setTimeout(()=>{
                router.push('/singIn')
            },500)
        }).catch(r=>{
            Toast(r.response.data.msg)
            setTimeout(()=>{
                clear()
            },500)
        })
    }
};
const clear=()=>{
    form.username=''
    form.password=''
    form.phone=''
}
const toLogin=()=>{
    router.push('/singIn')
}
</script>

<style scoped lang="less">
@import "../../style/overflex";
@import "../../style/usual";

* {
    .resetAll;
}

.borderAll() {
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.contain {
    overflow: hidden;

    section {
        .flex_center();
        min-height: 100vh;
        background: linear-gradient(to bottom, #f1f4f9, #dff1ff);

        .color {
            position: absolute;
            filter: blur(150px);

            &:first-child {
                top: -350px;
                width: 600px;
                height: 600px;
                background: rgba(255, 193, 7, 0.55);
            }

            &:nth-child(2) {
                top: 650px;
                left: 100px;
                width: 500px;
                height: 500px;
                background: #ff359b;
            }
            &:nth-child(3){
                bottom: 450px;
                left: 50px;
                width: 300px;
                height: 300px;
                background: #00d2ff;
            }
        }

        .box {
            position: relative;

            .square {
                position: absolute;
                .borderAll();
                backdrop-filter: blur(5px);
                box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                animation: animate 10s linear infinite;
                animation-delay: calc(-1s * var(--i));

                &:first-child {
                    top: -50px;
                    right: -60px;
                    width: 100px;
                    height: 100px;
                }

                &:nth-child(2) {
                    top: 150px;
                    left: -100px;
                    width: 120px;
                    height: 120px;
                    z-index: 2;
                }

                &:nth-child(3) {
                    bottom: 50px;
                    right: -60px;
                    width: 80px;
                    height: 80px;
                    z-index: 2;
                }

                &:nth-child(4) {
                    bottom: -80px;
                    left: 100px;
                    width: 50px;
                    height: 50px;
                }

                &:nth-child(5) {
                    top: -80px;
                    left: 140px;
                    width: 60px;
                    height: 60px;
                }
            }

            .container {
                position: relative;
                width: 500px;
                min-height: 500px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                .flex_center();
                backdrop-filter: blur(5px);
                box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
                .borderAll();

                .form {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    padding: 40px;

                    h2 {
                        position: relative;
                        color: orange;
                        font-size: 34px;
                        font-weight: 600;
                        letter-spacing: 1px;
                        margin-bottom: 55px;

                        &::before {
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom: -10px;
                            width: 130px;
                            height: 4px;
                            background: #fff;
                        }
                    }

                    .inputBox {
                        width: 100%;
                        margin-top: 40px;

                        input {
                            width: 100%;
                            background: rgba(255, 255, 255, 0.2);
                            border: none;
                            outline: none;
                            padding: 15px 20px;
                            border-radius: 35px;
                            .borderAll();
                            font-size: 25px;
                            letter-spacing: 1px;
                            color: black;
                            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

                            &::placeholder {
                                color: black;
                            }

                            &[type='button'] {
                                font-size: 20px;
                                background: #fff;
                                color: #666;
                                max-width: 130px;
                                cursor: pointer;
                                margin-bottom: 30px;
                                font-weight: 600;
                                transition: 0.5s;
                                &:hover{
                                    transform: scale(1.1);
                                }
                            }
                        }
                    }

                    .forget {
                        margin-top: 5px;
                        color: #fff;
                        font-size: 25px;
                        span {
                            .mouse_hover();
                            color: #fff;
                            font-weight: 600;
                        }
                    }
                }
            }
        }
    }
}

@keyframes animate {
    0%, 100% {
        transform: translateY(-40px);
    }
    50% {
        transform: translateY(40px);
    }
}

</style>