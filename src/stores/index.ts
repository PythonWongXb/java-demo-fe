import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const store = createPinia();
// store插件安装写这儿
store.use(piniaPluginPersistedstate);

export { store };
