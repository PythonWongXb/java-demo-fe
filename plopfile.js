import createComponentTemplate from './plop/component/index.js';
import createMockTemplate from './plop/mock/index.js';
import createPageTemplate from './plop/page/index.js';

export default function (plop) {
    plop.setGenerator('component', createComponentTemplate);
    plop.setGenerator('mock', createMockTemplate);
    plop.setGenerator('page', createPageTemplate);
}