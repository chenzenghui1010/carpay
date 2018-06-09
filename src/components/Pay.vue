<template>
  <div class="pay">
    <div class="header">
      <div class="title">确 定 缴 费</div>
      <div class="feeinfo">
        <div class="feetitle">停车费</div>
        <div style="padding-right: 1rem">
          <label class="fee">{{ totalFee }}</label><label class="rmb">¥</label>
        </div>
      </div>
      <div class="section">
        <p><span>车牌号码</span><span>{{  carNo }}</span></p>
        <p><span>入场时间</span><span>{{ startTime }}</span></p>
        <p><span>离场时间</span><span>{{ endTime }}</span></p>
        <p><span>停留时长</span><span>{{days }}{{hours}}{{ minutes}}</span></p>
        <p><span>支付方式</span><span class="wx">微信支付</span></p>
      </div>
      <div class="btn" @click="dopay">立即缴费</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pay',
    data() {
      return {
        callbackUrl: window.callbackUrl,
        merchantCode: window.merchantCode,
        parkCode: window.parkCode,
        jparkingURL: window.jparkingURL,
        payUrl: window.payUrl,
        carNo: sessionStorage.getItem('carNo'),
        endTime: this.$route.query.endTime,
        startTime: this.$route.query.startTime,
        days: '',hours: '', minutes: '',
        totalFee: this.$route.query.totalFee,
        orderNo: this.$route.query.orderNo,
        openId: this.$route.query.openId,
        payData: '',
      }
    },
    created() {
      this.time
    },
    methods: {
      dopay: function () {

        let p = {
          "channelId": "WX",
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
      time: function () {
        let end = this.endTime.replace(/-/g, '/'), start = this.startTime.replace(/-/g, '/')
        let endTimes = new Date(end).getTime(), srartTimes = new Date(start).getTime()
        let duration = endTimes - srartTimes
        let dsy = parseInt(duration / (3600000 * 24))//1000*60*60 天
        let minute = parseInt((duration % (3600000)) / (60000))//1000*60 分
        let hour = parseInt((duration % (3600000 * 24)) / (3600000)) //小时
        let days = (dsy > 0 ? dsy + '天' : '');
        let hours = (hour > 0 ? hour + '小时' : '');
        let minutes = (minute > 0 ? minute + '分钟' : '');
        return this.days = days , this.hours = hours, this.minutes = minutes
      },
      sub: function () {
        return encodeURI(this.carNo.substring(0, 1)) + '-' + this.carNo.substring(1)
      }
    }
  }

</script>

<style scoped>

  .pay {
    position: absolute;
    background: #313235;
    width: 100%;
    height: 100%;
    font-family: PingFangSC-Regular;
  }

  .header {
    border-radius: 1.2rem;
    display: flex;
    display: -webkit-flex;
    height: 94%;
    width: 96%;
    flex-direction: column;
    align-items: center;
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
    /*padding-left: 2.2rem;*/
    /*align-self: flex-start;*/
  }

  .feeinfo {
    background-color: #f6f6f6;
    width: 100%;
    display: flex;
    height: 13.5rem;
    justify-content: space-between;
    align-items: center;
  }

  .feetitle {

    font-size: 1.4rem;
    padding-top: 2.5rem;
    align-self: flex-start;
    padding-left: 0.8rem;
    color: #2d2f3b;
  }

  .fee {
    font-size: 6rem;
    color: #ff473d;
    font-weight: bold;
  }

  .section {
    width: 96%;
  }

  .section p {
    height: 4.5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #F5F5F5;
  }

  p span {
    display: inline-block;
    line-height: 4.5rem;
    font-size: 1.4rem;
    letter-spacing: 0;
  }

  p span:nth-child(1) {
    font-family: PingFangSC-Regular;
    color: #111;
  }

  p span:nth-child(2) {
    color: #C2C6DA;
  }

  p span.wx {
    color: #0087FF;
  }

  .rmb {
    font-size: 3.2rem;
    color: #ff473d;
    font-weight: bold;
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
    align-self: flex-end;
    position: absolute;
    bottom: 0;
    background: #A07C70;
    border-radius: 0 0 1rem 1rem;
  }

</style>
