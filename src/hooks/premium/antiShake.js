export function searchShake(callback,delay) {
    let timer=null
    return function (e) {
        if (timer!=null){
            clearTimeout(timer)
        }
        timer=setTimeout(()=>{
            callback.call(this,e)
            timer=null
        },delay)
    }
}