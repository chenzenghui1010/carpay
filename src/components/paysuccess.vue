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
    <!--<div class="logo">-->
    <!--<img class="logoimg" src="../assets/LOGO.png" alt="">-->
    <!--</div>-->
    
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
        mm: 19,
        ss: 59
      }
    },
    created() {
        let payType = getQueryString('result')
      
      //   let url = window.orderQueUrl+'?ver=' + new Date().getTime() + '&serviceId=ac.pay.querypayresult&attributes={"orderNo":"' + orderNo + '"}'
      //
      //   this.$axios.post(url, {}).then(res => {
      //
      //     this.dataList = res.data.attributes
      // let url = window.location.href
      // let payType = (this.$route.query.result)
      
      
      if(payType == 'SUCCESS') {
  
        this.status = '支付成功!'
  
        this.list = '感谢您使用，祝您旅途愉快!'
  
        this.btn = true
        
      } else {
        
        this.status = '支付失败!'
  
        this.list = '支付失败，请重新支付'
        
        
      }
      // this.setTime()
    },
    methods: {
      
      eInvoice() {
        
        window.location.href = 'https://weixin.jslife.com.cn/jtc-front/dist/eInvoice.html?key=880075565130008'
        
      }
      ,
      setTime() {
        window.setInterval(() => {
          if (this.ss != 1) {
            this.ss--
          } else {
            if (this.mm == 0 && this.ss == 1) {
              document.getElementById('span').innerText = '已过期 '
            } else {
              this.mm -= 1
              this.ss = 59
            }
          }
          
        }, 1000)
      },
    }
    
  }
</script>

<style scoped>
  
  .main {
    background-color: #313235;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .fail {
    margin: 8rem auto 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    
    margin: 4rem auto 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    
    text-align: center;
    margin-left: 15px;
  }
  
  .tip {
    
    font-size: 1.2rem;
    color: white;
  }
  
  .paymoney {
    
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
    
    background: url("../assets/paysuccessyes.png") no-repeat center/ 9rem;
    overflow-clip: visible;
    width: 9rem;
    height: 9rem;
    position: relative;
    top: 4.5rem;
    align-self: center;
  }
  
  .failimg {
    background: url("../assets/fail.png") no-repeat center/ 9rem;
    overflow-clip: visible;
    width: 9rem;
    height: 9rem;
    position: relative;
    top: 4.5rem;
    align-self: center
  }
  
</style>
