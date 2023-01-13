<template>
    <div>
        <div>英雄联盟商店-详情</div>
        <div class="">
            <div>皮肤名称（基本信息来自列表）：{{ item.name }}</div>
            <div>
                <img
                    class="img" :src="(item.img as string)"
                    alt=""
                >
            </div>
            <div>价格{{ item.price }}RMB</div>
            <div>介绍(来自详情表) {{ item.desc }}</div>
            <el-button @click="back">back to list</el-button>

        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Detail',
    inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const item = ref<Record<string, string | boolean>>({});
const route = useRoute();
const initPage = async () => {
    const res = await API.findSkinDetail({
        id: route.query.detailId
    });
    item.value = res.data as Record<string, string | boolean>;
};
onBeforeMount(initPage);
const router = useRouter();
const back = () => {
    router.push('/list');
};
const selected = ref("");

</script>

<style scoped>
.item_container {
    display: flex;
    flex-wrap: wrap;
}

.img {
    width: 250px;
    height: 250px;
    object-fit: cover;

}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
