module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "static",
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: 8080,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        // proxy: { // 开发环境代理配置
        //     // 动态配置
        //     ["/api"]: { // '/dev-api': {
        //         target: "http://localhost:3000/", //.env.development文件配置地址http://localhost:8000
        //         changeOrigin: true, // 开启代理服务器，
        //         pathRewrite: {
        //             // /dev-api/db.json 最终会发送 http://localhost:8000/db.json
        //             // 将 请求地址前缀 /dev-api 替换为 空的，
        //             // '^/dev-api': '',
        //             ['^' + "/api"]: ''
        //         }
        //     }
        // }
        proxy: 'http://localhost:3000/' //用这种方式，那么把请求的url设置成空 ：""
    },
}