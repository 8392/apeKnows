import Vue from "vue";
import VueRouter from "vue-router";
import noPower from "./no-power";
// import store from "@/store";


Vue.use(VueRouter);



const createRouter = () =>
    new VueRouter({
        mode: 'history', //就是这里
        scrollBehavior: () => ({ y: 0, x: 0 }),
        routes: [
            ...noPower
        ]
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}


router.beforeEach(async (to, from, next) => {
    // console.log("next", store)
    // next()
    //没有初始化路由，则去初始化路由 ,只能初始化一次
    // if (!store.state.permission.init) {
    //     await store.dispatch("permission/GenerateRoutes");

    //     // 生成可访问的路由表
    //     let addRouters = store.state.permission.addRouters;
    //     router.addRoutes(addRouters); // 动态添加可访问路由表
    //     router.options.routes = store.state.permission.routers;
    //     next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
    // } else {
    //     next();
    // }
    next()
});


export default router;
