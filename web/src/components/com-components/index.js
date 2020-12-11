/**
 * @description: 通过require.context引入文件夹，不用再单独的引入，导出组件的名称，就是文件的名称
 */

const modulesFiles = require.context("./modules", true, /\.vue$/);
let modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

export default modules;
