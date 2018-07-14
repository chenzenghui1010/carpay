<template>
  <div class="main">
    
    <div :class=" btn ? 'payinfo':'fail' ">
      <img class="cashicon" src="../assets/paysuccesscash.png"/>
      <div class="msg">
        <div class="success" v-text="status"></div>
        <div class="tip" v-text="list"></div>
      </div>
    </div>
    
    <div v-if="btn" class="paymoney"> 支付 ¥ {{ fee }}</div>
    <div v-if="btn" :class=" btn ? 'payyes':'statusimg' "></div>
    <div v-if=" !btn" :class=" btn ? 'payyes':'failimg' "></div>
    
    <div v-if="btn" class="time">
      <p>请您于20分钟内完成离场，谢谢！</p>
      <button @click="eInvoice">开电子发票</button>
    </div>
    
  </div>
</template>

<script>
  
  import {getQueryString, doAjax} from "../utils/globalhelper";
  
  export default {
    
    name: 'paysuccess',
    
    data() {
      
      return {
        
        dataList: {},
        status: '',
        list: '',
        fee:localStorage.getItem('fee'),
        btn: false,
      }
    },
    created() {
      
        let payType = getQueryString('result')
      
      if(payType == 'SUCCESS') {
  
        this.status = '支付成功!'
  
        this.list = '感谢您使用，祝您旅途愉快!'
  
        this.btn = true
        
      } else {
        
        this.status = '支付失败!'
  
        this.list = '支付失败，请重新支付'
      }
    },
    methods: {
      
      eInvoice() {
        
        window.location.href = 'https://weixin.jslife.com.cn/jtc-front/dist/eInvoice.html?key=880075565130008'
      },
    }
  }
</script>

<style scoped>
  
  .main {
    padding: 3rem  0  0 0;
    background-color: #313235;
    width: 100%;
    text-align: center;
  }
  
  .fail {
    margin: 8rem auto 1rem;
    width: 100%;
  }
  
  .time {
    width: 100%;
    height: 50px;
    margin: auto;
    top: 10rem;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    text-align: center;
  }
  
  .time p {
    font-size: 2rem;
    color: #4A4A4A;
    margin: 3rem 0;
  }
  
  .time p span {
    font-size: 2.1rem;
    color: #7ed321;
  }
  
  button {
    width: 80%;
    height: 4.5rem;
    background: none;
    border: 1px solid #A17D71;
    border-radius: 5px;
    color: #A17D71;
    font-size: 2rem;
  }
  
  .payinfo {
    width: 100%;
  }
  
  .cashicon {
    width: 5.1rem;
    height: 5.1rem;
  }
  
  .success {
    
    font-size: 3.2rem;
    color: #4a90e2;
    text-align: center;
  }
  
  .msg {
    display: inline-block;
    text-align: center;
    margin-left: 15px;
  }
  
  .tip {
    
    font-size: 1.2rem;
    color: white;
  }
  
  .paymoney {
    display: block;
    margin: 10% 0 0  15%;
    background: url("../assets/paysuccessbg.png") no-repeat center/21.5rem 4.3rem;
    width: 70%;
    overflow: visible;
    height: 4.3rem;
    line-height: 4.3rem;
    text-align: center;
    font-size: 1.8rem;
    color: white;
    align-self: center;
  }
  
  .payyes {
    margin: 0 auto;
    background: url("../assets/paysuccessyes.png") no-repeat center/ 9rem;
    overflow-clip: visible;
    width: 9rem;
    height: 9rem;
    position: relative;
    top: 4.5rem;
    align-self: center;
  }
  
  .failimg {
    margin: 0 auto;
    background: url("../assets/fail.png") no-repeat center/ 9rem;
    overflow-clip: visible;
    width: 9rem;
    height: 9rem;
    position: relative;
    top: 4.5rem;
    align-self: center
  }
  
</style>
