export function sliceArr(arr,len) {
    let narr=[]
    for (let i = 0; i < arr.length; i+=len) {
        narr.push(arr.slice(i,i+len))
    }
    return narr
}

export function randomArr(arr,count) {
    let narr=[]
    let narrs=[]
    for (let i = 0; i < count; i++) {
        let num=Math.floor(Math.random()*arr.length)
        if (!narr.includes(num)){
            narr.push(num)
        }else {
            i--
        }
    }
    narr.forEach(it=>narrs.push(arr[it]))
    return narrs
}

export function filterNum(v){
    if (v>=100000000){
        return (v/100000000).toFixed(1)+'亿'
    }else {
        return (v/10000).toFixed(2)+'万'
    }
}

export function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

