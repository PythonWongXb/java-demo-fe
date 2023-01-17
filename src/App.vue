<template>
    <div class="c-red">
        <div v-if="$route.meta.hideMenu">
            <router-view/>
        </div>
        <Layout v-else/>
    </div>

</template>
<script lang="ts" setup>
import Layout from '@/layout/index.vue';
</script>
<style lang="less">
@import url('./common/style/index.less');
</style>