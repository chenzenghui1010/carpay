<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>

import  CarPay from './components/CarPay'
import  open  from './components/Open'

export default {
  name: 'App',
  components: {
    CarPay,open
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
