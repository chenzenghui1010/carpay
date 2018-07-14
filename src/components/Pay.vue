<template>
  <div class="pay">
    
    <div class="header">
      
      <div class="title">利和广场停车场</div>
      
      <div class="feeinfo">
        <div class="feetitle">应付费用</div>
        <!--style="padding-right: 1rem ;display: inline-block ; float: right  ; line-height: 7.5rem"-->
        <div>
          <label class="fee"><label class="rmb">¥</label>{{ totalFee }}</label>
        </div>
      </div>
      
      <div class="section">
        <p><span>车牌号码</span><span style="float: right">{{  carNo }}</span></p>
        <p><span>入场时间</span><span>{{ startTime }}</span></p>
        <!--<p><span>离场时间</span><span>{{ endTime }}</span></p>-->
        <p><span>停留时长</span><span>{{  time }}</span></p>
        <p><span>支付方式</span><span class="wx">{{browserType =='WX'? '微信':'支付宝' }}支付</span></p>
      </div>
      
      <div class="vip">
        <p>如阁下车牌已绑定利和广场会员,应缴费用已作相应会员停车优惠减免。<br>会员停车优惠只能在利和广场营业时间内生效,一卡一车,每日一次</p>
        <p>粉卡会员： 无停车优惠</p>
        <p>银卡会员： 可享受2小时停车优惠</p>
        <p>金卡会员： 可享受3小时停车优惠</p>
        <p>钻卡会员： 可享受4小时停车优惠</p>
        <p>如有疑问请联系利和物业管理中心,联系电话：0760-85750000</p>
      </div>
      
      <div class="btn" @click="dopay">立即缴费</div>
    
    </div>
    
    <div class="alert" v-if="show">
      <p>{{alert}}</p>
    </div>
  
  </div>
</template>

<script>
  
  import {getQueryString} from "../utils/globalhelper";
  
  export default {
    name: 'pay',
    data() {
      const endTime = getQueryString('endTime')
      const startTime = getQueryString('startTime')
      const totalFee = getQueryString('totalFee')
      const orderNo = getQueryString('orderNo')
      const openId = getQueryString('openId')
      
      return {
        callbackUrl: window.callbackUrl,
        
        merchantCode: window.merchantCode,
        
        parkCode: window.parkCode,
        
        jparkingURL: window.jparkingURL,
        
        payUrl: window.payUrl,
        
        carNo: localStorage.getItem('carNo'),
        
        endTime: endTime,
        
        startTime: startTime,
        
        days: '', hours: '', minutes: '',
        
        totalFee: totalFee,
        
        orderNo: orderNo,
        
        openId: openId,
        
        payData: '',
        
        show: false,
        
        alert: ''
      }
    },
    created() {
      
      document.title = '车牌支付'
    },
    methods: {
      
      dopay: function () {
        
        if (this.totalFee == 0) {
          
          this.alert = '当前无需缴费'
          
          this.show = true
          
          setTimeout(() => {
            
            this.show = false
            
          }, 5000)
          
          return
        }
        
        localStorage.setItem('fee', this.totalFee)
        
        let p = {
          "channelId": this.browserType,
          "orderNo": this.orderNo,
          "appType": "SERVICE",
          "callbackUrl": this.callbackUrl,
          "openId": this.openId,
          "reqSource": "WX_JTC",
          "jparkingURL": this.jparkingURL,
          "grayKey": this.merchantCode + ',' + this.parkCode + ',' + this.sub,
          "couponNo": ""   //全网优惠券编号
        }
        
        let url = this.payUrl + '=' + JSON.stringify(p)
        
        window.location.href = url
      }
    },
    
    computed: {
      
      browserType: function () {
        
        let userAgent = window.navigator.userAgent.toLowerCase();
        
        if (userAgent.match(/MicroMessenger/i) == 'micromessenger') {
          
          return 'WX'
          
        } else if (userAgent.match(/Alipay/i) == 'alipay') {
          
          return "ZFB"
        }
      },
      
      time: function () {
        
        let end = this.endTime.replace(/-/g, '/'), start = this.startTime.replace(/-/g, '/')
        
        let endTimes = new Date(end).getTime(), srartTimes = new Date(start).getTime()
        
        let duration = endTimes - srartTimes
        
        let dsy = parseInt(duration / (3600000 * 24))
        
        let minute = parseInt((duration % (3600000)) / (60000))
        
        let hour = parseInt((duration % (3600000 * 24)) / (3600000))
        
        let days = (dsy > 0 ? dsy + '天' : '');
        
        let hours = (hour > 0 ? hour + '小时' : '');
        
        let minutes = (minute > 0 ? minute + '分钟' : '');
        
        if (duration > 60000) {
          
          return days + hours + minutes
          
        } else {
          
          return "1分钟"
        }
      },
      sub: function () {
        
        return encodeURI(this.carNo.substring(0, 1)) + '-' + this.carNo.substring(1)
      }
    },
    
    mounted() {
      
      let retcode = localStorage.getItem('retcode')
      
      let retmsg = localStorage.getItem('retmsg')
      
      if (retmsg.trim() != '' && retcode != 0) {
        
        this.alert = retmsg
        
        this.show = true
        
        setTimeout(() => {
          
          this.show = false
          
        }, 3000)
        
        return
      }
    }
  }
</script>

<style scoped lang="less">
  .alert {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    margin: auto;
    height: 5rem;
    width: 25rem;
    background: rgba(45, 47, 59, 0.50);
    border-radius: 50px;
    
    p {
      width: 100%;
      height: 100%;
      line-height: 5rem;
      text-align: center;
      color: #fff;
      font-size: 1.8rem;
    }
  }
  
  .pay {
    position: absolute;
    background: #313235;
    width: 100%;
    height: 100%;
    font-family: PingFangSC-Regular;
  }
  
  .header {
    border-radius: 1.2rem;
    /*display: flex;*/
    /*display: -webkit-flex;*/
    position: fixed;
    height: 96%;
    width: 96%;
    /*flex-direction: column;*/
    /*align-items: center;*/
    background-color: white;
    border-radius: 10px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 3% auto 3% auto;
    position: absolute;
  }
  
  .title {
    font-size: 2rem;
    color: #2D2F3B;
    line-height: 6rem;
    padding-left: 2.2rem;
    align-self: flex-start;
  }
  
  .feeinfo {
    background-color: #f6f6f6;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    height: 8.5rem;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    box-sizing: border-box;
    padding: 0  2%;
  }
  
  .vip {
    font-family: PingFangSC-Regular;
    width: 96%;
    margin-left: 2%;
  }
  
  .vip p {
    color: #4A4A4A;
    font-size: 0.9rem;
  }
  
  .vip p:first-child {
    margin: 0.8rem 0;
  }
  
  .vip p:last-child {
    margin-top: 0.4rem;
  }
  
  .feetitle {
    display: block;
    /*margin-top: 10px;*/
    font-size: 1.4rem;
    /*padding-top: 0.5rem;*/
    /*align-self: flex-start;*/
    /*padding-left: 0.8rem;*/
    color: #ff473d;
    line-height: 4.5rem
  }
  
  .fee {
    display: inline-block;
    float: right;
    font-size: 4rem;
    color: #ff473d;
    font-weight: bold;
  }
  
  .section {
    width: 96%;
    margin:  0 auto;
  }
  
  .section p {
    height: 4.2rem;
    display: flex;
    display:-webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    -webkit-align-items: center;
    border-bottom: 1px solid #F5F5F5;
  }
  
  p span {
    display: inline-block;
    line-height: 4.2rem;
    font-size: 1.4rem;
    letter-spacing: 0;
  }
  
  p span:nth-child(1) {
    font-family: PingFangSC-Regular;
    color: #111;
  }
  
  p span:nth-child(2) {
    float: right;
    color: #C2C6DA;
  }
  
  p span.wx {
    color: #0087FF;
  }
  
  .rmb {
    font-size: 2rem;
    color: #ff473d;
  }
  
  .btn {
    font-size: 1.8rem;
    color: #FFFFFF;
    letter-spacing: 0;
    height: 5rem;
    line-height: 5rem;
    width: 100%;
    height: 5rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    background: #A07C70;
    border-radius: 0 0 1rem 1rem;
  }

</style>
