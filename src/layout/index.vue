<template>
    <el-container class="h-screen">
        <el-aside
            :width="`${menuCollapseState ? 70 : 244}px`" class="box-shadow-2-0-6-0-rgba(0,0,0,0.1) bg-lightGray"
        >
            <el-menu
                mode="vertical"
                :collapse-transition="false"
                :collapse="menuCollapseState"
                :default-active="defaultActiveMenuIndex"
                class="el-menu-vertical-demo bg-lightGray! min-hc-100vh-54px px-12px! border-none!"
            >
                <header class="text-center hleading-60px text-0 b-b-solid-1px-aGrayBbLine">
                    <img
                        v-show="!menuCollapseState"
                        src="https://sponsors.vuejs.org/images/vueschool.png" alt="logo"
                        class="h-30px w-100px mt-15px"
                    >
                    <img
                        v-show="menuCollapseState"
                        src="https://pinia.web3doc.top/logo.svg" alt="logo"
                        class="h-24px w-30px mt-15px"
                    >
                </header>
                <el-sub-menu
                    v-for="(menu, menuIndex) in menuList" :key="menu.id"
                    :expand-close-icon="MenuIconBottom"
                    :expand-open-icon="MenuIconTop"
                    :index="(menuIndex + 1).toString()"
                >
                    <template #title>
                        <Icon icon="svg-vue" class-name="wihe-14px mr-8px"/>
                        <span class="h-36px leading-36px c-aBlackText">{{ menu.title }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                            v-for="(item, index) in menu.children" :key="index"
                            :index="`${item.parentId}-${item.id}`"
                            @click="instance => menuClick(item)"
                        >{{ item.title }}</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
            <div class="hleading-51px c-aBlackText cursor-pointer border-t-solid-1px-#F1F1F1" @click="handlerCollapse">
                <Icon :icon="menuCollapseState ? 'i-ep-expand' : 'i-ep-fold'" class-name="v-mid ml-21px mr-14px"/>
                <strong v-if="!menuCollapseState" class="v-mid text-14px">收起</strong>
            </div>
        </el-aside>
        <el-container>
            <el-header class="box-shadow-0-2-6-0-rgba(0,0,0,0.1) flex items-center justify-end">
                <user/>
            </el-header>
            <el-main class="hc-100vh-60px overflow-y-auto mt-3px">
                <el-config-provider :locale="locale">
                    <router-view v-if="loginIsComplete"/>
                </el-config-provider>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import type {RouteMeta, RouteRecordRaw} from 'vue-router';
import { useProviderToast, locale } from '@/plugins/elementPlus';
import { getAuthRouteMapList, rDResultAll, staticRouteMap } from '@/router';
import { menuConfig } from './constant';
import { hasProperty } from 'common/utils/is';
import Icon from 'components/Icon.vue';
import user from './components/user.vue';
import { ImenuList } from '@/apis/user';
import { IMenuItemType } from '@/apis/type';
import { getJsonTree } from '@/apis/utils';

type TMenuConfigKeys = keyof typeof menuConfig;
type TRouteDictChild = {
    title: string;
    path: string;
    enName: string;
}
interface IRouteDict {
    menuTitle: string;
    id: TMenuConfigKeys;
    icon: string;
    children: TRouteDictChild[];
}

useProviderToast();
const router = useRouter();
const route = useRoute();

const MenuIconBottom = defineComponent(() => () => h(Icon, { icon: 'i-ep-caret-bottom' }));
const MenuIconTop = defineComponent(() => () => h(Icon, { icon: 'i-ep-caret-top' }));
const loginIsComplete = ref(true);
// 初始化用户是否登录
const useMenuList = () => {
    const menuCollapseState = ref(false);
    const handlerCollapse = () => menuCollapseState.value = !unref(menuCollapseState);
    const defaultActiveMenuIndex = ref<string>('');
    return {
        defaultActiveMenuIndex,
        handlerCollapse,
        menuCollapseState,
    };
};


const {
    defaultActiveMenuIndex,
    handlerCollapse,
    menuCollapseState,
} = useMenuList();

const menuClick = (item: IMenuItemType) => {
    router.push(item.path);
};

const menuList = ref<IMenuItemType[]>([]);
const menuOriginList = ref<IMenuItemType[]>([]);

const initActiveMenuIndex = () => {
    const r = route.path;
    const res = menuOriginList.value.find(item => item.path === r);
    if (res) {
        console.log({res});
        defaultActiveMenuIndex.value = `${res.parentId}-${res.id}`;
    } else {
        defaultActiveMenuIndex.value = '';
    }
};

watch(() => route.path, initActiveMenuIndex, { immediate: true });

const getAuthMenuList = async () => {
    const tempRes = await API.getAuthMenuList();
    const res = tempRes.data.sort((a, b) => a.order > b.order ? 1 : -1);
    menuOriginList.value = res;
    menuList.value = getJsonTree(res, null);
    initActiveMenuIndex();
};

getAuthMenuList();
</script>
<style lang="less" scoped>
.el-menu-vertical-demo {
    &.el-menu--collapse {
        width: 70px;
    }
    :deep(ul) {
        background: var(--light-gray);
    }
    :deep(.el-sub-menu__title) {
        height: 36px;
        .el-icon {
            position: static;
            margin-top: 0;
            margin-left: 8px;
        }
        &.el-tooltip__trigger {
            padding: 0;
            margin-right: 0;
            margin-left: 14px;
        }
    }
    :deep(.el-menu-item) {
        color: var(--black-text);
        &.is-active {
            background: var(--el-color-primary);
            color: var(--color-white);
            border-radius: 4px;
        }
    }
}
</style>