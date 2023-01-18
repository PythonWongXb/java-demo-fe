import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const routeMap: RouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import('views/login.vue'),
        meta: {
            owner: '',
            title: 'login',
            hideMenu: true,
            enName: 'advancedSearch'
        },
    },
    {
        path: '/list',
        component: () => import('views/list.vue'),
        meta: {
            owner: 'qiankeSearch',
            title: 'list',
            enName: 'advancedSearch'
        },
    },
    {
        path: '/detail',
        component: () => import('views/detail.vue'),
        meta: {
            owner: 'qiankeSearch',
            title: 'detail',
            enName: 'advancedSearch:detail'
        },
    },
    /* plop route insert here */
];

export default createRouter({
    history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        ...routeMap,
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../views/404.vue'),
            meta: {
                owner: '',
                enName: '',
                title: '',
                hideMenu: true,
            }
        }
    ]
});