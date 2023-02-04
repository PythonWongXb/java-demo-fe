<template>
    <el-dropdown v-if="store.isAuth" @command="handlerCommand">
        <div class="cursor-pointer">
            <el-avatar
                :size="32" :src="store.avatarUrl"
                class="v-mid"
            />
            <span class="v-mid ml-12px">{{ store.nickName }}</span>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="exit-login">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <el-button
        v-else
        class="login-btn"
        text
        @click="() => {}"
    >
        登录/注册
    </el-button>
</template>
<script lang="ts" setup>
import router from '@/router';
import { useUserStore } from 'stores/modules/user';
const store = useUserStore();
const toast = inject<Ttoast>('toast')!;
const logout = async () => {
    await API.logout({});
    toast.$message.success('退出成功！');
    router.push('/login');
    store.clearUserInfo();
};

const handlerCommand = (directive: string) => {
    logout();
};
</script>
<style lang="less" scoped></style>
