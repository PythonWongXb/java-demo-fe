// 全局指令注册
import type { App } from 'vue';
import clickout from './clickout';
export default (app: App): void => {
    ([clickout] as Array<(app: App) => void>).forEach(itemDirective => {
        itemDirective(app);
    });
};
