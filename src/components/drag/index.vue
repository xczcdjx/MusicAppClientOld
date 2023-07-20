<template>
    <div class="dialog_wrap" v-dialogDrag="true">
        <!--                // 整个区域-->
        <div class="dialog_content">
            <!--            // 可按下拖动的位置-->
            <div class="dialog_header">
                <!--                //...-->
                <slot name="icon"></slot>

                <slot name="panel"></slot>
            </div>
            <!--            // 其他-->
        </div>
    </div>
</template>
<script setup>

</script>
<style lang="less" scoped>
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
</style>