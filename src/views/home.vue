<template>
    <div>
        <div>home</div>
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
</script>

<style lang="less" scoped>

</style>
