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
      window.location.href=window.openUrl+'?reqSource=WX_JTC&codeType=base&redirectUrl='+window.redirectUrl;
      if (window.event) {
        window.event.returnValue = false;
      }
    },

  })
</script>
