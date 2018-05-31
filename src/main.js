// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'axios'
import qs from 'qs'


import CarPay from './components/CarPay'
import open from './components/Open'
import pay from './components/Pay'

Vue.prototype.$axios = Axios;
Vue.use(VueRouter)


Vue.prototype.HOST = '/api';

//请求拦截器
Axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

//响应拦截器
Axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});


Vue.config.productionTip = false


const router = new VueRouter({

  routes: [
    {path: '/', component: open},
    {path: '/CarPay', component: CarPay},
    {path: '/pay', component: pay}
  ],mode:'history'

})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: {App},
  template: '<App/>'
})

