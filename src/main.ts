import { createApp } from 'vue';
import '@/plugins/unocss/index';
import App from './App.vue';
import router from './router/index';
import directives from '@/plugins/directive';
import { store } from './stores';
import dompurifyHtml from '@/plugins/dompurifyHtml';
import 'virtual:svg-icons-register';

createApp(App)
    .use(store)
    .use(router)
    .use(dompurifyHtml)
    .use(directives)
    .mount('#app');
