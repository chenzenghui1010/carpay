<template>
  <div class="pay">
    <div class="header">
      <div class="title">{{ title}}</div>
      <div class="feeinfo">
        <div class="feetitle">{{ feetitle }}</div>
        <div style="padding-right: 1rem">
          <label class="fee">{{ money }}</label><label class="rmb">¥</label>
        </div>
      </div>
      <div class="section">
        <p v-for=" item in section"><span>{{ item.title}}</span><span :class="{ wx: item.last}">{{item.price}}</span>
        </p>
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
        title: '确 定 缴 费',
        feetitle: '停车费',
        money: this.$route.query.totalFee,
        carNo: sessionStorage.getItem('carNo'),
        section: [
          {title: '车牌号码', price: localStorage.getItem('carNo')},
          {title: '入场时间', price: this.$route.query.startTime},
          {title: '离场时间', price: this.$route.query.endTime},
          {title: '停留时长', price: '2'},
          {title: '支付方式', price: '微信支付', last: true}
        ],
      }

    },
    created() {
      let url = this.HOST + '/pay/prepay'
      let pay={
        'orderNo': this.$route.query.orderNo,
        'appType': 'SERVICE',
        'payType': 'JSAPI'
      }
      this.$axios.post(url, {
       pay

      }).then(res => {

        console.log(res.ServiceResponseData)
      }).catch(error => {
        console.log(error)
      })
    },

    methods: {
      dopay: function () {

        this.$emit('payorder')
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
