<template>
  <div>
    <p>url:https://www.baidu.com/s?ie=utf-8&name=111</p>

  </div>
</template>

<script>
  export default ({
    name: 'open',
    data() {
      return {
      }
    },

    computed: {

    },
    methods: {
    },
    created() {
     window.location.href='https://ceshicloud-of.jslife.net/jpark-code-front/wx/getOpenIdForRedirect?reqSource=1&codeType=base&redirectUrl=http://zwvisit.indoorun.com/zslihe/CarPay';
      if(window.event){
        window.event.returnValue = false;
      }
    },

  })
</script>
