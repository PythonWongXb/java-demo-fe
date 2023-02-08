<template>
    <div>
        <div>user Control</div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column
                prop="username" label="Date"
                width="180"
            />
            <el-table-column
                prop="username" label="Name"
                width="180"
            />
            <el-table-column prop="address" label="Address"/>
        </el-table>
        <el-pagination
            v-model:current-page="pageInfo.current" :page-size="pageInfo.pageSize"
            size="small"
            layout="total, prev, pager, next"
            :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
        <el-button @click="jumpToList">到列表页面</el-button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'user',
    inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { IUserTable } from '@/apis/user';
import router from '@/router';
const tableData = ref<IUserTable[]>([]);
const total = ref(0);
const pageInfo = reactive({
    pageSize: 10,
    current: 1,
});
const getTableData = async () => {
    const res = await API.getUserList(pageInfo);
    tableData.value = res.data.data;
    total.value = res.data.total;
};

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`);
    getTableData();
};
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
    getTableData();

};

getTableData();

const jumpToList = () => {
    router.push('/list');
};
</script>

<style lang="less" scoped>

</style>
