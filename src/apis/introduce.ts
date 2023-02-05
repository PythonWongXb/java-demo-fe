import { request } from 'common/request';

interface IQueryDetailInfoByIdRes extends GeneralResData {
    data: Item[];
};

interface Item {
    price: string;
    productId: string;
    name: string;
    img: string;
    id: string;
}

export const getIntroduce = () => request<
    IQueryDetailInfoByIdRes>('/user/introduce');