<template>
    <div>
        <div>role</div>
        <el-button @click="jumpToList">到列表页面</el-button>
    </div>
</template>
<script lang="ts">
export default {
    name: 'role',
    inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import router from '@/router';


const jumpToList = () => {
    router.push('/list');
};
</script>

<style lang="less" scoped>

</style>
