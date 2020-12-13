import Vue from 'vue'
import Vuex from "vuex";
import App from './App.vue'
import router from "./router";
import golble from "@/utils/inject";

import ElementUI from 'element-ui';
import './style/ele.scss';
import './style/common.scss';

Vue.config.productionTip = false
Vue.use(golble)
Vue.use(ElementUI);


Vue.use(Vuex);
import modules from "./store";

const store = new Vuex.Store({
    modules
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
