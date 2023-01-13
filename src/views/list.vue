<template>
    <div>英雄联盟商店</div>
    <div>
        皮肤名称<el-input v-model="name"/>
        价格区间{{ `${range[0]}-${range[1]}` }}<el-slider
            v-model="range" range
            show-stops :max="1000"
        />
        <el-button @click="submit">sure</el-button>
    </div>
    <div class="item_container">
        <div
            v-for="item in dataList" :key="item.productId"
            class="item"
        >
            <div>皮肤名称：{{ item.name }}</div>
            <img
                class="img" :src="item.img"
                alt=""
            >
            <div>价格{{ item.price }}RMB</div>
            <el-button>购买</el-button>
            <el-button>加入吃灰车</el-button>
            <el-button @click="detail(item)">详情</el-button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'List',
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { Item } from '@/apis';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const dataList = ref<Item[]>([]);
const name = ref('');
const range = ref([0, 0]);
const router = useRouter();
const submit = async () => {
    const res = await API.findAll({
        name: name.value,
        minPrice: range.value[0] || 0,
        maxPrice: range.value[1] || undefined
    });
    dataList.value = res.data;
};
onBeforeMount(submit);

const detail = (item: Item) => {
    router.push(`/detail?detailId=${item.id}`);
};
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
