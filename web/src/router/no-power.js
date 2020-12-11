//不需要权限的路由页面
export default [
    {
        path: "/",
        name: "test",
        component: resolve => require(["@/views/test.vue"], resolve),
        meta: {
            title: "首页"
        }
    },
    {
        path: "/scroll",
        name: "scroll",
        component: resolve => require(["@/views/scroll.vue"], resolve),
        meta: {
            title: "首页"
        }
    },
    {
        path: "/testJs",
        name: "testJs",
        component: resolve => require(["@/views/testJs.vue"], resolve),
        meta: {
            title: "首页"
        }
    },
    {
        path: "/register",
        name: "register",
        component: resolve => require(["@/views/admin/register/index.vue"], resolve),
        meta: {
            title: "首页"
        }
    },
    {
        path: "/login",
        name: "login",
        component: resolve => require(["@/views/admin/login/index.vue"], resolve),
        meta: {
            title: "登录"
        }
    },
    {
        path: "/home",
        name: "home",
        component: resolve => require(["@/views/home/index.vue"], resolve),
        meta: {
            title: "首页"
        }
    },
    {
        path: "/",
        component: resolve => require(["@/views/admin/layout/left.vue"], resolve),
        meta: {
            title: "左侧菜单"
        },
        children: [{
            path: "/addCatalog",
            name: "addCatalog",
            component: resolve => require(["@/views/admin/addCatalog/index.vue"], resolve),
            meta: {
                title: "首页"
            },
        }, {
            path: "/addArticle",
            name: "addArticle",
            component: resolve => require(["@/views/admin/addArticle/index.vue"], resolve),
            meta: {
                title: "首页"
            },
        }]
    },
];
