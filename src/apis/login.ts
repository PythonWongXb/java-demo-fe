import { request } from 'common/request';
interface RequestData {

};

interface IQueryDetailInfoByIdRes extends GeneralResData {
    data: {
        data: {
            username: string;
            avatarUrl: string;
        };
    };
    result: boolean;
    message: string;
};

export const login = (data: RequestData) => request<RequestData,
    IQueryDetailInfoByIdRes>('/user/login', data);

export const register = (data: RequestData) => request<RequestData,
    IQueryDetailInfoByIdRes>('/user/register', data);

export const validateUser = (data: RequestData) => request<RequestData,
    IQueryDetailInfoByIdRes>('/user/get', data);