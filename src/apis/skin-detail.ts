import { request } from 'common/request';
interface RequestData {

};

interface IQueryDetailInfoByIdRes extends GeneralResData {
    result: boolean;
    message: string;
};

export const findSkinDetail = (data: RequestData) => request<RequestData,
    IQueryDetailInfoByIdRes>('/skin-detail/findSkinDetail', data);
