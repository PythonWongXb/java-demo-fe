import { request } from 'common/request';
interface RequestData {

};

interface IQueryDetailInfoByIdRes extends GeneralResData {
    data: Record<string, string | boolean>;
    result: boolean;
    message: string;
};

export const login = (data: RequestData) => request<RequestData,
    IQueryDetailInfoByIdRes>('/user/login', data);