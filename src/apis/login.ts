import { request } from 'common/request';
interface RequestData {

};

interface IQueryDetailInfoByIdRes extends GeneralResData {
    data: {
        user: {
            username: string;
            avatarUrl: string;
        };
        token: string;
    };
    result: boolean;
    message: string;
};
interface TRequestOptions {
    headers: Record<string, string>;
}
export const login = (data: RequestData, options: TRequestOptions) => request<RequestData,
    IQueryDetailInfoByIdRes, TRequestOptions>('/user/login', data, options);

export const register = (data: RequestData) => request<RequestData,
    IQueryDetailInfoByIdRes>('/user/register', data);

export const validateUser = (data: RequestData) => request<RequestData,
    IQueryDetailInfoByIdRes>('/user/get', data);

export const comfirmResetPassword = (data: RequestData) => request<RequestData,
    IQueryDetailInfoByIdRes>('/user/reset', data);