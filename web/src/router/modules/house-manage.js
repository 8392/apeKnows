export default [
    {
        path: "/house-manage",
        name: "house-manage",
        component: resolve => require(["@/views/house-manage"], resolve),
        meta: {
            title: "房源管理",
            icon: "el-icon-user-solid",

            // activeMenu: "/house-manage"
        },
        hidden: false
    },
];
