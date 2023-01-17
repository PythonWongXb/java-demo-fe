<template>
    <div v-if="$route.meta.hideMenu">
        <router-view/>
    </div>
    <Layout v-else/>

</template>
<script lang="ts" setup>
import Layout from '@/layout/index.vue';
import router from './router';

const validate = async () => {
    try {
        const res = await API.validateUser({});
    } catch (error) {
        console.log({error});
        // router.push('/login');
    }
};

router.afterEach(() => {
    validate();
});
</script>
<style lang="less">
@import url('./common/style/index.less');
</style>