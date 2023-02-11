<template>
    <div>
        <tree :from-data="menuList"/>
    </div>
</template>
<script lang="ts">
export default {
    name: 'auth',
    inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { IMenuItemType } from '@/apis/type';
import { getJsonTree } from '@/apis/utils';

const menuList = ref<IMenuItemType[]>([]);
const menuOriginList = ref<IMenuItemType[]>([]);

function treeToList(tree: IMenuItemType[], result = [] as IMenuItemType[], level = 0) {
    tree.forEach(node => {
        result.push(node);
        node.level = level + 1;
        node.children && treeToList(node.children, result, level + 1);
    });
    return result;
}

const flatten = (node: IMenuItemType[]) => {
    node.forEach(item => {
        if (item.children) {
            const res = flatten(item.children);
        } else {

        }
    });
};

const getAuthMenuList = async () => {
    const tempRes = await API.getAuthMenuList();
    const res = tempRes.data.map(item => {
        return {
            ...item,
            label: item.title,
        };
    });
    menuOriginList.value = res;
    menuList.value = getJsonTree(res.filter(item => !item.subHideMenuId), null);
    const reslist = flatten(menuList.value);
    const resl = treeToList(menuList.value, []);
    console.log({reslist});
    console.log({ resl });
};

getAuthMenuList();
</script>

<style lang="less" scoped>

</style>
