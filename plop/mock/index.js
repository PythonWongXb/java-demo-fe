import path from 'path';
export default {
    description: '创建Mock文件',
    prompts: [
        {
            type: 'input',
            name: 'mockPath',
            message: '请输入mock文件路径'
        }
    ],
    actions: data => {
        const { mockPath } = data; // 拿到终端输入的文件名
        const actions = [];
        if (mockPath) {
            actions.push({
                type: 'add',
                path: path.join(process.cwd(), `mock/${mockPath}.js`),
                templateFile: path.join(process.cwd(), 'plop/mock/template.hbs'), // 模板文件路径
            })
        }
        return actions;
    }
}