import { IMenuItemType } from './type';

export const getJsonTree = function (data: IMenuItemType[], parentId: null | number) {
    var itemArr = [];
    for (let node of data) {
        if (node.parentId == parentId) {
            var newNode = JSON.parse(JSON.stringify(node));
            newNode.children = getJsonTree(data, node.id);
            itemArr.push(newNode);
        }
    }
    return itemArr;
};