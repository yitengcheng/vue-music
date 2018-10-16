import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import VueLazyLoad from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'common/scss/index.scss';
import router from './router';
import fastclick from 'fastclick';
import axios from 'axios';
import { ERR_OK } from 'api/config';
import _ from 'lodash';
import store from './store';
import { get } from './api/get';
import { post } from './api/post';

fastclick.attach(document.body);
Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
});
Vue.prototype.ERR_OK = ERR_OK;
Vue.prototype._ = _;
Vue.prototype.ajax = axios;
Vue.prototype.get = get;
Vue.prototype.post = post;
let loading = {};
// 请求拦截器
axios.interceptors.request.use((config) => {
  loading = Vue.prototype.$loading({ text: '正在载入中...' });
  return config;
}, (err) => {
  return Promise.reject(err);
});

// 响应拦截器
axios.interceptors.response.use((response) => {
  loading.close(); // 关闭loading
  return response;
}, (err) => {
  return Promise.reject(err);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
