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
                    v-for="(menu, menuIndex) of routeDict" :key="menu.id"
                    :expand-close-icon="MenuIconBottom"
                    :expand-open-icon="MenuIconTop"
                    :index="(menuIndex + 1).toString()"
                >
                    <template #title>
                        <Icon :icon="menu.icon" class-name="wihe-14px mr-8px"/>
                        <span class="h-36px leading-36px c-aBlackText">{{ menu.menuTitle }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                            v-for="(item, index) of menu.children" :key="index"
                            :index="`${menuIndex + 1}-${index + 1}`"
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
import type {RouteMeta} from 'vue-router';
import { useProviderToast, locale } from '@/plugins/elementPlus';
import { routeMap } from '@/router';
import { menuConfig } from './constant';
import { hasProperty } from 'common/utils/is';
import Icon from 'components/Icon.vue';
import user from './components/user.vue';

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
    let listItem = {} as Record<TMenuConfigKeys, IRouteDict>;
    const defaultActiveMenuIndex = ref<string>('');
    for (const item of routeMap) {
        const { title, owner, enName } = item.meta ?? {} as RouteMeta;
        if (!hasProperty(owner, menuConfig) || !title) {
            continue;
        }
        const obj = listItem[owner] || {
            id: owner,
            ...menuConfig[owner],
            children: []
        };
        const arr = enName.split(':');
        arr.length === 1 && obj.children.push({
            title,
            path: item.path,
            enName: item.meta?.enName || ''
        });
        listItem[owner] = obj;
    }
    console.log({ listItem });
    const initActiveMenuIndex = (newPath: string) => {
        const routeDict = Object.values(listItem);
        let activeIndexs:number[] = [];
        for (let i = 0; i < routeDict.length; i++) {
            const chidIndex = routeDict[i].children.findIndex(child => child.path === newPath);
            if (chidIndex > -1) {
                activeIndexs = [i + 1, chidIndex + 1];
                defaultActiveMenuIndex.value = activeIndexs.join('-');
            }
            else {
                const { enName = '' } = route.meta;
                if (!enName) {
                    return;
                }
                routeDict.forEach((item, routeIndex) => {
                    const chidIndex = item.children.findIndex(child => enName.startsWith(child.enName));
                    if (chidIndex > -1) {
                        activeIndexs = [routeIndex + 1, chidIndex + 1];
                        defaultActiveMenuIndex.value = activeIndexs.join('-');
                        return;
                    }
                });
            }
        }
    };
    const menuClick = (item: TRouteDictChild) => {
        router.push(item.path);
    };
    watch(() => route.path, initActiveMenuIndex, { immediate: true });
    return {
        routeDict: Object.values(listItem),
        menuClick,
        defaultActiveMenuIndex,
        handlerCollapse,
        menuCollapseState
    };
};
const { routeDict,
        menuClick,
        defaultActiveMenuIndex,
        handlerCollapse,
        menuCollapseState
} = useMenuList();

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