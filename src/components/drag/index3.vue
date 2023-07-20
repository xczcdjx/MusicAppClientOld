<template>
    <div ref="dragBox"
         class="dragBox"
         @touchstart="touchstartHandle('dragBox',$event)"
         @touchmove="touchmoveHandle('dragBox',$event)"
    >
        <div class="dialog_content">
            <!--            // 可按下拖动的位置-->
            <div class="dialog_header">
                <slot name="icon"></slot>

                <slot name="panel"></slot>
            </div>
            <!--            // 其他-->
        </div>
    </div>
</template>

<script>
export default {
    name: "index4",
    data() {
        return {
            coordinate: {
                client: {},
                elePosition: {}
            }
        }
    },
    methods: {
        touchstartHandle(refName, e) {
            let element = e.targetTouches[0]
            // 记录点击的坐标
            this.coordinate.client = {
                x: element.clientX,
                y: element.clientY
            }
            // 记录需要移动的元素坐标
            this.coordinate.elePosition.left = this.$refs[refName].offsetLeft
            this.coordinate.elePosition.top = this.$refs[refName].offsetTop
        },
        touchmoveHandle(refName, e) {
            let element = e.targetTouches[0]
            // 根据初始 client 位置计算移动距离(元素移动位置=元素初始位置+光标移动后的位置-光标点击时的初始位置)
            let x = this.coordinate.elePosition.left + (element.clientX - this.coordinate.client.x)
            let y = this.coordinate.elePosition.top + (element.clientY - this.coordinate.client.y)
            // 限制可移动距离，不超出可视区域
            x = x <= 0 ? 0 : x >= innerWidth - this.$refs[refName].offsetWidth ? innerWidth - this.$refs[refName].offsetWidth : x
            y = y <= 0 ? 0 : y >= innerHeight - this.$refs[refName].offsetHeight ? innerHeight - this.$refs[refName].offsetHeight : y
            // 移动当前元素
            this.$refs[refName].style.left = x + 'px'
            this.$refs[refName].style.top = y + 'px'
        }
    },

}
</script>

<style scoped lang="less">
.dragBox{
    position: fixed;
    right: 10%;
    top: 50%;
    width: 100px;
    transition: 0.1s;
    height: 100px;
    z-index: 33;
    padding-bottom: 70px;
    .dialog_content {
        //border: 1px salmon solid;
        cursor:move;
        /*position: fixed;
        right: 20%;
        top: 50%;*/
        width: 100px;
        transition: 0.1s;
        height: 100px;
        z-index: 30;
        //padding-bottom: 70px;
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