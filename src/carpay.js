// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import  CarPay from './components/CarPay'
import Axios from 'axios'

Vue.prototype.$axios = Axios;

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {CarPay},
  template: '<CarPay/>'
})
