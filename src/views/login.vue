<template>
    <div>login first sir</div>
    <div>
        phone: <el-input v-model="phone"/>
    </div>
    <div>
        pwd: <el-input v-model="pwd"/>
    </div>
    <el-button @click="login">login</el-button>
</template>

<script lang="ts">
export default {
    name: 'CustomName',
    inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/modules/user';

const store = useUserStore();
const phone = ref("15942043948");
const pwd = ref("1234");
const router = useRouter();

const login = async () => {
    const params = {
        "mobile": phone.value,
        "pwd": pwd.value
    };
    try {
        const res = await API.login(params);
        ElMessage({
            type: 'success',
            message: res.data.message as string
        });
        store.updateUserInfo({
            username: (res.data.data as any).username,
            isAuth: true,
        });
        router.push('/list');
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as { message: string}).message
        });
    }
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
