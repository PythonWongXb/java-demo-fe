<template>
    <div>
        <div>402</div>
        <div>{{ noAuthRouter }}</div>
        <el-button @click="jumpToList">到列表页面</el-button>
    </div>
</template>
<script lang="ts">
export default {
    name: '402',
    inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import router from '@/router';
const route = useRoute();
const noAuthRouter = route.query.noAuth
    ? route.query.path
    : '';

const jumpToList = () => {
    router.push('/list');
};

watch(() => route.path, (oldRouter, currentRouter) => {
    console.log(oldRouter, currentRouter);
}, { immediate: true });
</script>

<style lang="less" scoped>

</style>
