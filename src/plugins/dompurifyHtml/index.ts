import type { App } from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';
export default (app: App) => {
    app.use(VueDOMPurifyHTML);
};