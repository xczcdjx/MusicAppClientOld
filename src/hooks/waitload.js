import {Toast} from "vant";

export function wait(msg='请稍后') {
   return new Promise((resolve, reject) => {
        Toast.loading({
            message:msg,
            forbidClick:true,
            onClose:()=>{
                resolve('success')
            }
        })
    })
}