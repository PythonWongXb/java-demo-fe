import path from 'path';
const routeGroupChoiceList = [{
    name: '全量潜客搜索',
    value: 'qiankeSearch'
}, {
    name: '标讯拓客',
    value: 'bidTuoke'
}, {
    name: '动态拓新',
    value: 'dynamicTuoNew'
}];
export default {
    description: '创建路由文件',
    prompts: [
        {
            type: 'list',
            name: 'routeGroup',
            message: '请选择新建的路由添加到那个组下面',
            choices: routeGroupChoiceList
        },
        {
            type: 'input',
            name: 'routePath',
            message: '请输入要新建的路由路径'
        },
        {
            type: 'input',
            name: 'routeTitle',
            message: '请输入新建的路由标题'
        },
        {
            type: 'confirm',
            name: 'confirmModifyDirName',
            message: '是否要修改路由组件的目录名?',
            default: false
        },
        {
            type: 'input',
            name: 'dirTile',
            message: '请输入路由组件的目录名',
            when({ confirmModifyDirName }) {
                return confirmModifyDirName;
            }
        },
    ],
    actions: data => {
        const { routePath, routeGroup, routeTitle, confirmModifyDirName, dirTile } = data; // 拿到终端输入的文件名
        const actions = [];
        let routeMapPath = routePath;
        if (routePath.startsWith('/')) {
            routeMapPath = routePath.slice(1);
        }
        const ownerName = routeGroupChoiceList.find(item => item.value === routeGroup)?.name;
        const componentDirName = dirTile || routeMapPath;
        actions.push({
            type: 'modify',
            path: path.join(process.cwd(), 'src/router/index.ts'),
            templateFile: path.join(process.cwd(), 'plop/page/routerTemplate.hbs'),
            pattern: /\/\* plop route insert here \*\//,
            data: {
                routeMapPath,
                componentPath: componentDirName,
                ownerName,
                commentTitleDesc: routeTitle || componentDirName
            }
        }, {
            type: 'add',
            path: path.join(process.cwd(), `src/views/${componentDirName}/index.vue`),
            templateFile: path.join(process.cwd(), 'plop/page/pageTemplate.hbs'),
            data: {
                pageName: dirTile || routeMapPath.split('/')[0]
            }
        });
        return actions;
    }
};