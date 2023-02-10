export interface IMenuItemType {
    order: number;
    deleted: boolean;
    id: number;
    parentId: number;
    parentName: string;
    path: string;
    title: string;
    subHideMenuId: number | null;
    children?: IMenuItemType[];
}