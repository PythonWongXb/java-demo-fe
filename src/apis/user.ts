import { request } from 'common/request';
import { IMenuItemType } from './type';
interface RequestData {

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
export interface ImenuList extends GeneralResData {
    data: IMenuItemType[];
};

export const getUserList = (data: RequestData = {}) => request<RequestData,
    IQueryDetailInfoByIdRes>('/user/list', data);

export const getAuthMenuList = () => request<
    ImenuList>('/user/getMenuList');