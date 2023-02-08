import { request } from 'common/request';
interface RequestData {
    pageSize: number;
    current: number;
};

export interface IUserTable {
    name: string;
}

interface IQueryDetailInfoByIdRes extends GeneralResData {
    name?: string;
    data: {
        total: number;
        data: IUserTable[];
    };
};

export const getUserList = (data: RequestData) => request<RequestData,
    IQueryDetailInfoByIdRes>('/user/list', data);