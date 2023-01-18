interface PayLoad {
    isAuth: boolean;
    avatarUrl: string;
    username: string;
}
export const useUserStore = defineStore('user', {
    persist: true,
    state: () => ({
        isAuth: false,
        isNewUser: false, // 是否新创建的用户
        avatarUrl: '', // 用户头像地址
        nickName: '', // 用户昵称
    }),
    actions: {
        // 更新登录状态
        updateIsAuth(state: boolean) {
            this.isAuth = state;
        },

        updateUserInfo(payLoad: PayLoad) {
            this.isAuth = payLoad.isAuth;
            this.avatarUrl = payLoad.avatarUrl;
            this.nickName = payLoad.username;
        },

        clearUserInfo() {
            this.isAuth = false;
            this.avatarUrl = '';
            this.nickName = '';
        }
    }
});