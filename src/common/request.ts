import router from '@/router';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
export type TResData = GeneralResData | LoginResData;

// T是请求参数data的类型, R是后端接口数据类型，U是自定义方法response函数的返回值
interface TRequestOptions<T extends object, R extends TResData, U> extends AxiosRequestConfig<T> {
    noPrefix?: boolean;
    response?(
        res: AxiosResponse<R>,
        resolve: (value: R | PromiseLike<R>) => void,
        reject: (reason: TDataType | Error) => void
    ): U;
}

const instance: AxiosInstance = axios.create();

const timeout: number = 30 * 1000;

interface Request {
    <R extends TResData>(url: string): Promise<R>;
    <T extends object, R extends TResData, U>(url: TRequestOptions<T, R, U>): Promise<R>;
    <T extends object, R extends TResData>(url: string, data: T): Promise<R>;
    <T extends object, R extends TResData, U>(url: string, data: T, options: TRequestOptions<T, R, U>): Promise<R>;
};

const responseIsLogin = (res: TResData): res is LoginResData => {
    const data = res as LoginResData;
    return typeof data.retcode === 'number';
};

// T是请求参数data的类型, R是返回值类型
const request: Request = <T extends object = object, R extends TResData = TResData, U = unknown>
    (url: string | TRequestOptions<T, R, U>, data?: T, options?: TRequestOptions<T, R, U>): Promise<R> => {

    const basePath = '/api';
    // 兼容配置对象的写法
    let config: TRequestOptions<T, R, U> = {};
    if (typeof url === 'string') {
        url = options?.noPrefix ? url : `${basePath}${url}`;
        config = {
            url,
            data: data || {} as T,
            method: options?.method || 'POST',
            responseType: options?.responseType || 'json',
            params: options?.method === 'GET' ? data : {},
            headers: options?.headers || {},
            timeout,
            ...options,
        };
    }
    else {
        config = {
            timeout,
            ...url,
            // 做一个请求头的合并，这样没必要请求的时候把initHeaders返回的请求头都写一遍
            headers: options?.headers || {},
        };
    }
    return new Promise<R>((resolve, reject) => {
        instance.request(config).then(async (res: AxiosResponse<R>) => {
            if (typeof config.response === 'function') {
                config.response(res, resolve, reject);
                return;
            }
            if (res.status !== 200) {
                return reject(res);
            }
            if (!responseIsLogin(res.data)) {
                const { code } = res.data;
                // const isAuth = wsCache.get('isAuth');
                const whiteCodes = [401, 402];
                // 如果是免鉴权，正常放行
                if (whiteCodes.includes(+code)) {
                    ElMessage({
                        type: 'error',
                        message: '登陆过期，请重新登陆！',
                        duration: 1000,
                    });
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    router.push('/login');
                    const { useUserStore } = await import('@/stores/modules/user');

                    const store = useUserStore();
                    store.clearUserInfo();
                    return reject(res.data);
                }
                if (+res.data.code === 0) {
                    resolve(res.data);
                }
                else {
                    reject(res.data);
                }
            }
        }).catch(reject);
    });
};

export { request };
