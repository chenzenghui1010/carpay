// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import  CarPay from './components/CarPay'
import Axios from 'axios'
import FastClick from 'fastclick'
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {CarPay},
  template: '<CarPay/>'
})

