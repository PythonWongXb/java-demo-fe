<template>
    <div>
        <div>（白首计划）莫等闲，白了少年头，空悲切！</div>
        <div>introduce</div>
        <h1>FE:</h1>
        <div>Vue3 + TS + Vite + unocss +Husky</div>
        <h1>RD</h1>
        <div>Java + Spring-Boot Mybatis-plus Mysql Redis Docker + Spring-Security(jwt)
            RBAC0 (Resource or Role) Base Access Control</div>
        <h1>部署、运维、监控</h1>
        <div>后续</div>
        <div>微信: 15942043949</div>
        <a href="https://www.bilibili.com/video/BV1oA411X7Sy?p=22&vd_source=a225b72a149caac3dbb2f98b309cd83f">base1</a>
        <a href="https://www.bilibili.com/video/BV1Fi4y1S7ix/?spm_id_from=333.788.top_right_bar_window_custom_collection.content.click">base2</a>
        <el-button @click="jumpToList">到列表页面</el-button>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Detail',
    inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import router from '@/router';


const jumpToList = () => {
    router.push('/list');
};

const getIntroduce = () => {
    API.getIntroduce();
};
getIntroduce();
</script>

<style lang="less" scoped>

</style>
