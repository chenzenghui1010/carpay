// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'axios'
import qs from 'qs'


import carpay from './components/CarPay'
import open from './components/Open'
import pay from './components/Pay'

Vue.prototype.$axios = Axios;
Vue.use(VueRouter)



//请求拦截器
Axios.interceptors.request.use(function (config) {

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
    {path: '/open', component: open},
    {path: '/', component: carpay},
    {path: '/pay', component: pay}
  ]

})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: {App},
  template: '<App/>'
})

