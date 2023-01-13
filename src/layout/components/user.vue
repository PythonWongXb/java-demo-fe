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
import { useUserStore } from 'stores/modules/user';
const store = useUserStore();

const handlerCommand = (directive: string) => {
    switch (directive) {
        case 'exit-login':
            break;
    }
};
</script>
<style lang="less" scoped></style>
