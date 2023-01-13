import 'element-plus/dist/index.css';
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
export const useProviderToast = () => {
    provide('toast', {
        $message: ElMessage,
        $notify: ElNotification,
        $confirm: ElMessageBox.confirm,
        $alert: ElMessageBox.alert,
        $prompt: ElMessageBox.prompt,
    });
};

export const locale = ref(zhCn);