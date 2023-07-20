<template>
<div class="contain">
    <van-empty image="search" description="Search content will show in next version"/>
</div>
</template>

<script setup>
import {ref} from "vue";

const search=ref()
</script>

<style scoped lang="less">
.contain{
    .search{
        .van-search{
            width: 100%;
        }
    }
}
</style>