<template>
<div class="contain">
    <div class="container">
        <div class="clock">
            <div class="circle" style="--clr:#04fc43" id="sc"><i></i></div>
            <div class="circle circle2" style="--clr:#fee800" id="mn"><i></i></div>
            <div class="circle circle3" style="--clr:#ff2972" id="hr"><i></i></div>
            <span style="--i:1"><b>1</b></span>
            <span style="--i:2"><b>2</b></span>
            <span style="--i:3"><b>3</b></span>
            <span style="--i:4"><b>4</b></span>
            <span style="--i:5"><b>5</b></span>
            <span style="--i:6"><b>6</b></span>
            <span style="--i:7"><b>7</b></span>
            <span style="--i:8"><b>8</b></span>
            <span style="--i:9"><b>9</b></span>
            <span style="--i:10"><b>10</b></span>
            <span style="--i:11"><b>11</b></span>
            <span style="--i:12"><b>12</b></span>
        </div>
        <!--    digital clock-->
        <div id="time">
            <div id="hours"  style="--clr:#ff2972">00</div>
            <div id="minutes" style="--clr:#fee800">00</div>
            <div id="seconds" style="--clr:#04fc43">00</div>
            <div id="ampm">AM</div>
        </div>
    </div>
</div>
</template>

<script setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";

onMounted(()=>{
    let sc=document.querySelector('#sc')
    let mn=document.querySelector('#mn')
    let hr=document.querySelector('#hr')

    let hours=document.getElementById('hours')
    let minutes=document.getElementById('minutes')
    let seconds=document.getElementById('seconds')
    let ampm=document.getElementById('ampm')
let timer= setInterval(()=>{
        let date=new Date()
        let hh=date.getHours()*30
        let mm=date.getMinutes()*6
        let ss=date.getSeconds()*6
        hr.style.transform=`rotateZ(${hh+(mm/12)}deg)`
        mn.style.transform=`rotateZ(${mm}deg)`
        sc.style.transform=`rotateZ(${ss}deg)`
        // digital clock
        let h=new Date().getHours()
        let m=new Date().getMinutes()
        let s=new Date().getSeconds()
        let sche=h>=12?'PM':'AM'
        if (h>12) h=h-12
        h=(h<10)?'0'+h:h
        m=(m<10)?'0'+m:m
        s=(s<10)?'0'+s:s
        hours.innerHTML=h
        minutes.innerHTML=m
        seconds.innerHTML=s
        ampm.innerHTML=sche
    })
    let router=useRouter()
    setTimeout(()=>{
        router.replace('/singIn')
        setTimeout(()=>{
            clearInterval(timer)
        },500)
    },3000)
})
</script>

<style scoped lang="less">
@medfot:36px;
//@medfot:40px;
//@inserfot:20px;
@inserfot:-5px;

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.contain{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #2f363e;
}
.container{
    position: relative;
    background: #2f363e;
    //min-height: 500px;
    border-radius: 20px;
    border-top-left-radius: 225px;
    border-top-right-radius: 225px;
    box-shadow: 25px 25px 75px rgba(0,0,0,0.75),
    10px 10px 70px rgba(0,0,0,0.25),
    inset 5px 5px 10px rgba(0,0,0,0.5),
    inset 5px 5px 20px rgba(255,255,255,0.2),
        inset -5px -5px 15px rgba(0,0,0,0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .clock{
        position: relative;
        width: 450px;
        height: 450px;
        background: #2f363e;
        border-radius: 50%;
        box-shadow: 10px 50px 70px rgba(0,0,0,0.25),
        inset 5px 5px 10px rgba(0,0,0,0.5),
        inset 5px 5px 20px rgba(255,255,255,0.2),
            inset -5px -5px 15px rgba(0,0,0,0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        &::before{
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            background: #2f363e;
            border: 3px solid #fff;
            border-radius: 50%;
            z-index: 100000;
        }
        >.circle{
            position: absolute;
            width: 300px;
            height: 300px;
            border: 2px solid rgba(0,0,0,0.25);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            z-index: 10;
            i{
                position: absolute;
                width: 6px;
                height: 50%;
                background: var(--clr);
                opacity: 0.75;
                transform-origin: bottom;
                transform: scaleY(0.5);
            }
            &:nth-child(1) i{
                width: 2px;
            }
            &:nth-child(2) i{
                width: 6px;
            }
            &::before{
                content: '';
                position: absolute;
                top: -8.5px;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: var(--clr);
                box-shadow: 0 0 20px var(--clr),
                0 0 60px var(--clr);
            }
        }
        >.circle2{
            width: 240px;
            height: 240px;
            z-index: 9;
        }
        >.circle3{
            width: 180px;
            height: 180px;
            z-index: 8;
        }
        >span{
            position: absolute;
            inset: @inserfot;
            //inset: 20px;
            color: #fff;
            text-align: center;
            transform: rotate(calc(30deg*var(--i)));
            b{
                font-size: @medfot;
                //font-size: 1.2em;
                opacity: 0.25;
                font-weight: 600;
                display: inline-block;
                transform: rotate(calc(-30deg*var(--i)));
            }
        }
    }
    // digital clock
    #time{
        margin-bottom: 40px;
        display: flex;
        padding: 10px 20px;
        //font-size: 1.2em;
        font-size: @medfot;
        font-weight: 600;
        border: 2px solid rgba(0,0,0,0.5);
        border-radius: 40px;
        box-shadow: 5px 5px 10px rgba(0,0,0,0.5),
        inset 5px 5px 20px rgba(255,255,255,0.2),
            inset -5px -5px 15px rgba(0,0,0,0.75);
        div{
            position: relative;
            width: 60px;
            text-align: center;
            font-weight: 500;
            color:var(--clr);
            &:nth-child(1)::after,&:nth-child(2)::after{
                content: ':';
                position: absolute;
                right: -4px;
            }
            &:last-child{
                font-size: 0.8em;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
            }
            &:nth-child(2)::after{
                animation: animate 1s steps(1) infinite;
            }
        }
    }
}
@keyframes animate{
    0%{
        opacity: 1;
    }
    50%{
        opacity: 0;
    }
}
</style>