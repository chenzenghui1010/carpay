<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>

import  CarPay from './components/CarPay'
import  open  from './components/Open'
import  paysuccess from './components/paysuccess'
export default {
  name: 'App',
  components: {
    CarPay,open,paysuccess
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    font-size: 10px;
  }
#app {


}
</style>
