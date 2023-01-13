import type { App, Directive } from 'vue';
export default (app: App): void => {
    interface MyElement extends HTMLElement {
        handler(evt: MouseEvent): void;
    }
    const directive: Directive<MyElement, () => unknown> = {
        mounted(el, { arg, value: callback }) {
            const target = arg ? document.querySelector(`.${arg}`) : el;
            el.handler = (evt: MouseEvent): void => {
                if (target && evt.target && !target.contains(evt.target as Node)) {
                    callback();
                }
            };
            document.addEventListener('click', el.handler);
        },
        beforeUnmount(el) {
            document.removeEventListener('click', el.handler);
        },
    };
    app.directive('clickout', directive);
};
