<template>
<div>
<van-divider>{{route.query.title}}</van-divider>
</div>
</template>

<script setup>
import {useRoute} from "vue-router";

const route=useRoute()

</script>

<style scoped lang="less">

</style>