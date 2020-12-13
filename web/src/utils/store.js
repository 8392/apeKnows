import store from '../main.js';

export default {
    install() {
        store.registerModule(['testStore'], {
            namespaced: true,
            state: {
                rightTest: 999
            },
            actions: {
                setTest: ({ commit }, val) => {
                    commit('putTest', val)
                }
            },
            mutations: {
                putTest: (state, val) => {
                    state.rightTest = val;
                }
            }
        })
    },
    uninstall() {
        store.unregisterModule(['testStore'])
    }
}