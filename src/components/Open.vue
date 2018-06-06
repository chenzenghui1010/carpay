<template>
  <div>
  </div>
</template>

<script>


  export default ({
    name: 'open',
    data() {
      return {


      }
    },
    created() {

       window.location.href='https://ceshicloud-of.jslife.net/jpark-code-front/wx/getOpenIdForRedirect?reqSource=WX_JTC&codeType=base&redirectUrl=http://zwvisit.indoorun.com/zslihe/carpay/#/carpay';
      if (window.event) {
        window.event.returnValue = false;
      }

    },

  })
</script>
