import qs from "qs";
import requestData from '@//utils/request'

export const getUser = (data) => { //获取所有权限列表
    return requestData({
        url: 'users/getUserList',
        method: 'GET',
        data
    })
}
