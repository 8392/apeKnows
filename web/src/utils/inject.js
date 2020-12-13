import globalComponent from "@/components/com-components/index.js"; //引入全局公用组件

export default {
    install: (Vue) => {
        Object.keys(globalComponent).forEach((key) => {
            Vue.component(key, globalComponent[key]);
        });
    },
};