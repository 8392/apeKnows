import qs from "qs";
import requestData from '@//utils/request'

export const register = (data) => { //注册
    return requestData({
        url: 'users/register',
        method: 'POST',
        data
    })
}

export const login = (data) => { //登录
    return requestData({
        url: 'users/login',
        method: 'POST',
        data
    })
}

export const getUserList = (data) => { //登录
    return requestData({
        url: 'users/getUserList',
        method: 'GET',
        data
    })
}
