import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import VueLazyLoad from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'common/scss/index.scss';
import router from './router';
import fastclick from 'fastclick';
import Axios from 'axios';

fastclick.attach(document.body);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
let loading = {};

// 请求拦截器
Axios.interceptors.request.use((config) => {
  loading = Vue.prototype.$loading({ text: '正在载入中...' });
  return config;
}, (err) => {
  return Promise.reject(err);
});

// 响应拦截器
Axios.interceptors.response.use((response) => {
  loading.close(); // 关闭loading
  return response;
}, (err) => {
  return Promise.reject(err);
});

Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
