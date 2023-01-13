export const useUserStore = defineStore('user', {
    state: () => ({
        isAuth: false,
        isNewUser: false, // 是否新创建的用户
        avatarUrl: '', // 用户头像地址
        nickName: '', // 用户昵称
    }),
    actions: {
        // 更新登录状态
        updateIsAuth(state: boolean) {
            const { wsCache } = useCache();
            this.isAuth = state;
            wsCache.set('isAuth', state, { force: true });
        }
    }
});