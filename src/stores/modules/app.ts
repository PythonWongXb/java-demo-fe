export const useAppStore = defineStore('app', () => {
    const count = ref(0);
    const changeCount = (payload: number) => count.value += payload;
    return { count, changeCount };
});