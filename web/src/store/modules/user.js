import { login } from "@/api/user"

const state = {
    token: sessionStorage.getItem('token'),
    userInfo: {},
    router: []
};
const mutations = {
    //获取所有路由
    SET_TOKEN(state, token) {
        state.token = token
        sessionStorage.setItem('token', token)
    },
    setRouter(state, val) {
        state.router = val;
    }
};
const actions = {
    // 登录
    async login({state, commit, dispatch}, data) {
        const result = await login(data)
        commit('SET_TOKEN', result)
        return result
    },
    //退出登录
    loginOut() {

    }
};
const getters = {
    //获取用户信息
    getUserInfo(state) {

    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
