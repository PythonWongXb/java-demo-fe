/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_STATIC_URL: string;
  readonly VITE_PUBLIC_PATH: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'element-plus/dist/locale/zh-cn.mjs' {
  import type { elementPlusZhCn } from 'element-plus/dist/locale/zh-cn.mjs';
  const local: elementPlusZhCn;
  export default local;
}

declare module 'dayjs' {
  // @xiangbo todo 具体类型等待补充
  const dayjsObj: any;
  export default dayjsObj
}