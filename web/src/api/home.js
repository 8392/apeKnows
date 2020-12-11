import qs from "qs";
import requestData from '@//utils/request'

export const addCatalog = (data) => { //创建标签
    return requestData({
        url: 'catalog/addCatalog',
        method: 'POST',
        data
    })
}

export const updateCatalog = (data) => { //修改标签
    return requestData({
        url: 'catalog/updateCatalog',
        method: 'PUT',
        data
    })
}

export const delCatalog = (data) => { //删除标签
    return requestData({
        url: 'catalog/delCatalog',
        method: 'GET',
        data
    })
}

export const getList = (data) => { //获取文章列表
    return requestData({
        url: 'article/getList',
        method: 'GET',
        data
    })
}


export const addArtical = (data) => { //获取文章列表
    return requestData({
        url: 'article/addArtical',
        method: 'POST',
        data
    })
}

