<template>
    <div class="dialog_wrap" ref="dragBox">
        <!--                // 整个区域-->
        <div class="dialog_content">
            <!--            // 可按下拖动的位置-->
            <div class="dialog_header" @mousedown="">
                <!--                //...-->
                <slot name="icon"></slot>

                <slot name="panel"></slot>
            </div>
            <!--            // 其他-->
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
const dragBox=ref(null)
const move=(e)=>{

}
onMounted(()=>{
    // console.log(dragBox.value.querySelector('.dialog_header'))
    // beforeMount(dragBox.value,true)
    // if (!binding.value) return
    let el=dragBox.value
    // console.log(el)
    const dialogHeaderEl = el.querySelector('.dialog_header')
    const dragDom = el.querySelector('.dialog_content')
    dialogHeaderEl.style.cssText += ';cursor:move;'
    // dragDom.style.cssText += ';bottom:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function () {
        if ((el).currentStyle) {
            // 在ie下兼容写法
            return (dom, attr) => dom.currentStyle[attr]
        }
        return (dom, attr) => getComputedStyle(dom, null)[attr]
    })()

    dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop
        const screenWidth = el.clientWidth // body当前宽度
        const screenHeight = el.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

        const dragDomWidth = dragDom.offsetWidth // 对话框宽度
        const dragDomheight = dragDom.offsetHeight // 对话框高度

        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

        // 获取到的值带px 正则匹配替换
        let styL = sty(dragDom, 'left')
        // 为兼容ie
        if (styL === 'auto') styL = '0px'
        let styT = sty(dragDom, 'top')

        // console.log(styL)
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (styL.includes('%')) {
            styL = +el.clientWidth * (+styL.replace(/%/g, '') / 100)
            styT = +el.clientHeight * (+styT.replace(/%/g, '') / 100)
        } else {
            styL = +styL.replace(/px/g, '')
            styT = +styT.replace(/px/g, '')
        }

        el.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            let left = e.clientX - disX
            let top = e.clientY - disY
            // 边界处理
            if (-(left) > minDragDomLeft) {
                left = -(minDragDomLeft)
            } else if (left > maxDragDomLeft) {
                left = maxDragDomLeft
            }

            if (-(top) > minDragDomTop) {
                top = -(minDragDomTop)
            } else if (top > maxDragDomTop) {
                top = maxDragDomTop
            }

            // 移动当前元素
            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
        }

        el.onmouseup = function (e) {
            el.onmousemove = null
            el.onmouseup = null
        }
        return false
    }
})
function beforeMount(el, binding) {
    // 自定义属性，判断是否可拖拽
    if (!binding.value) return
    console.log(el)
    const dialogHeaderEl = el.querySelector('.dialog_header')
    const dragDom = el.querySelector('.dialog_content')
    dialogHeaderEl.style.cssText += ';cursor:move;'
    // dragDom.style.cssText += ';bottom:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function () {
        if ((el).currentStyle) {
            // 在ie下兼容写法
            return (dom, attr) => dom.currentStyle[attr]
        }
        return (dom, attr) => getComputedStyle(dom, null)[attr]
    })()

    dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop
        const screenWidth = el.clientWidth // body当前宽度
        const screenHeight = el.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

        const dragDomWidth = dragDom.offsetWidth // 对话框宽度
        const dragDomheight = dragDom.offsetHeight // 对话框高度

        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

        // 获取到的值带px 正则匹配替换
        let styL = sty(dragDom, 'left')
        // 为兼容ie
        if (styL === 'auto') styL = '0px'
        let styT = sty(dragDom, 'top')

        // console.log(styL)
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
            styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
        } else {
            styL = +styL.replace(/px/g, '')
            styT = +styT.replace(/px/g, '')
        }

        document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            let left = e.clientX - disX
            let top = e.clientY - disY
            // 边界处理
            if (-(left) > minDragDomLeft) {
                left = -(minDragDomLeft)
            } else if (left > maxDragDomLeft) {
                left = maxDragDomLeft
            }

            if (-(top) > minDragDomTop) {
                top = -(minDragDomTop)
            } else if (top > maxDragDomTop) {
                top = maxDragDomTop
            }

            // 移动当前元素
            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
        }

        document.onmouseup = function (e) {
            document.onmousemove = null
            document.onmouseup = null
        }
        return false
    }
}

</script>
<style lang="less" scoped>
.dialog_wrap{
    width: 100%;
    min-height: 100vh;
    .dialog_content {
        //border: 1px salmon solid;
        position: fixed;
        right: 20%;
        top: 50%;
        width: 100px;
        transition: 0.1s;
        height: 100px;
        z-index: 30;
        padding-bottom: 70px;
        .dialog_header {
            position: relative;
            z-index: 30;
            border-radius: 50%;
            border: skyblue solid 1px;
            height: 100px;
            width: 100px;
            display: grid;
            place-content: center;
            //overflow: hidden;
            &:hover{
                border:orangered 1px solid ;
            }
        }
    }
}
</style>