import { Message } from "element-ui";
import store from "@/store"
// import { baseURL } from "./config"
import axios from 'axios'
const service = axios.create({
    // baseURL: "/api",
    baseURL: "",
    // baseURL: process.env.VUE_APP_BASE_API,
    // baseURL: "http://rap2.taobao.org:38080/app/mock/25365/",
    timeout: 30000 // 请求超时
})


// 请求拦截器
service.interceptors.request.use(config => {
    // 请求拦截
    if (config.method === "get") {  //get请求和post请求通过用data数据传输
        config.params = config.data || config.params
    }
    if(store.user.state.token) {
        config.headers['authorization'] = `Bearer ${store.user.state.token}`
    }
    return config
}, error => {
    // 出现异常
    return Promise.reject(error);
})
// 响应拦截器
service.interceptors.response.use(response => {
    const res = response.data;
    if (res.code != 0) {  //code为200时，统一处理，成功的状态
        let content = res.message || res.msg || "Error";
        Message({
            message: content,
            type: "error",
            duration: 1 * 1000
        });
        return Promise.reject(res);
    } else {
        if (response.config.calAll) { //需要返回全部的数据
            return res;
        } else {
            return res.data;
        }
    }
}, error => {
    return Promise.reject(error.response);
})

export default service