import { request } from 'common/request';
interface RequestData {

};

interface IQueryDetailInfoByIdRes extends GeneralResData {
    data: Item[];
};

export interface Item {
    price: string;
    productId: string;
    name: string;
    img: string;
    id: string;
}

export const findAll = (data: RequestData) => request<RequestData,
    IQueryDetailInfoByIdRes>('/skin/findAll', data);