import type { RouteMeta } from 'vue-router';
declare module 'vue-router' {
    type TOwner = keyof typeof import('@/layout/constant')["menuConfig"];
    export interface RouteMeta {
        owner: TOwner | '';
        title: string;
        enName: string;
    }
}