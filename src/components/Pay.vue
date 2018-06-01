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
        <p ><span>车牌号码</span><span>{{  carNo }}</span></p>
        <p><span>入场时间</span><span>{{ startTime }}</span></p>
        <p ><span>离场时间</span><span>{{ endTime }}</span></p>
        <p><span>停留时长</span><span>555</span></p>
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
        money: this.$route.query.totalFee,
        carNo: localStorage.getItem('carNo'),
        endTime: '',
        startTime: '',
        totalFee: '25',
        orderNo: ''
      }
    },
    created() {

      let url = this.HOST + '/order/carno/pay'

      let carpay = {
        'parkCode': 'jsds20170314',
        'carNo': this.carNo,
        'orderType': 'VNP'
      }

      this.$axios.post(url, carpay).then(res => {
        console.log(JSON.stringify(res))
        let { endTime, startTime, totalFee, orderNo} = res.data.dataItems[0].attributes
        this.endTime=endTime
        this.startTime=startTime
        this.totalFee=totalFee
        this.orderNo=orderNo

      }).catch(error => {
        console.log(error)
      })


    },

    methods: {
      dopay: function () {
        let url = this.HOST + '/pay/prepay'

        this.$axios.post(url, {
          'orderNo': '8a644a4b24a64d79b091579a2444575d',
          'appType': 'SERVICE',
          'payType': 'JSAPI'
        }).then(res => {

          console.log(res.ServiceResponseData)
        }).catch(error => {
          console.log(error)
        })

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
    padding-left: 1.4rem;
    color: #2d2f3b;
  }

  .fee {
    font-size: 9.4rem;
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
