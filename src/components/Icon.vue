<template>
    <svg
        v-if="isLocal" aria-hidden="true"
        :class="props.className"
    >
        <use :xlink:href="symbolId"/>
    </svg>
    <i
        v-else :class="[symbolId, 'icon', 'display-inline-block', 'text-size-4', props.className]"
    ></i>
</template>
<script lang="ts" setup>
const props = defineProps<{
    icon: string;
    className?: string;
}>();
const svgFlag = 'svg-';
const isLocal = computed(() => props.icon.startsWith(svgFlag));
const symbolId = computed(() => {
    return unref(isLocal) ? `#icon-${props.icon.split(svgFlag)[1]}` : props.icon;
});
</script>
<style lang="less" scoped></style>
