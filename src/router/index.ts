import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

export const staticRouteMap: RouteRecordRaw[] = [
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
    {
        path: '/introduce',
        component: () => import('./../views/introduce.vue'),
        meta: {
            owner: 'qiankeSearch',
            title: 'introduce',
            enName: 'introduce'
        },
    },
    {
        path: '/402',
        component: () => import('./../views/402.vue'),
        meta: {
            owner: 'qiankeSearch',
            title: '402',
            enName: 'introduce:detail'
        },
    },
    /* plop route insert here */
];
const getViews = (path: string) => {
    // 首先把你需要动态路由的组件地址全部获取
    const modules = import.meta.glob('./../views/auth/*.vue');
    // 然后动态路由的时候这样来取
    return modules['../views/auth' + path + '.vue'];
};

const RDResult = [
    {
        path: '/user',
        menuPath: 'title',
        allowRole: ['admin'],
        owner: 'title',
        title: 'user control',
    },
    {
        path: '/role',
        menuPath: 'title',
        allowRole: ['admin'],
        owner: 'title',
        title: 'role control',
    },
    {
        path: '/auth',
        menuPath: 'title',
        allowRole: ['admin'],
        owner: 'title',
        title: 'auth control',
    },
];

export const authRouteMapList = RDResult.map(item => ({
        path: item.path,
        component: () => getViews(item.path)(),
        meta: {
            owner: item.owner,
            title: item.title,
            enName: item.menuPath
        }
    }) as RouteRecordRaw
);


export const routeMap = [...staticRouteMap, ...authRouteMapList];

const router = createRouter({
    history: createWebHashHistory(),
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

router.beforeEach((to, from, next) => {
    if (false) {
        console.log(router.getRoutes(), '查看现有路由');
        next({ ...to, replace: true });     //路由进行重定向放行
    } else {
        next();
    }
});

export default router;