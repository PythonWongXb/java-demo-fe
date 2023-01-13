import path from 'path';
export default {
    description: '创建组件，注意必须符合项目约束规范', // 命令启动描述
    prompts: [
        {
            type: 'input',
            name: 'componentName',
            message: '请输入组件的文件名称',
        },
        {
            type: 'confirm',
            name: 'isDirFile',
            message: '是否要写入目录中',
            default: false
        }
    ],
    actions: data => {
        const { componentName, isDirFile } = data; // 拿到终端输入的文件名
        const actions = [];
        if (componentName) {
            const cmpName = componentName[0].toUpperCase() + componentName.slice(1);
            const componentPath = isDirFile ? `src/components/${cmpName}/index.vue` : `src/components/${cmpName}.vue`;
            actions.push({
                type: 'add',
                path: path.join(process.cwd(), componentPath), // 生成的文件存放路径
                templateFile: path.join(process.cwd(), 'plop/component/template.hbs'), // 模板文件路径
                data: {
                    componentName: cmpName,
                },
            });
        }
        return actions;
    },
};
