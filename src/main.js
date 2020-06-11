import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
Vue.config.productionTip = false

import "swiper/dist/css/swiper.css";

import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);
Vue.use(MintUI);
// 数据请求
import axios from "axios";
// 统一配置全局路径
// axios.defaults.baseURL = "http://180.76.150.241:8080";
Vue.prototype.$axios = axios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')