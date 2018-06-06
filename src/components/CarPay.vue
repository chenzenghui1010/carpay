<template>
  <div class="carpay">
    <div v-if="cup" :class={cup:cup}>
      <div :class={alert:cup}>
        <p>没找到对应的入场记录</p>
        <p @click="close">确 定</p>
      </div>
    </div>
      <img class="logo" :src='logo' height="100" width="60%"/>
    <section>
      <div class="section">
        <nav>
          <ul>
            <li v-for=" (nav,index) in navS" :class="{active:activeIndex==index}" @click="showColor(index)">{{ nav
              }}
            </li>
          </ul>
        </nav>

        <p>请输入车牌号：<input v-focus type="text" :maxlength="maxlenght" v-model="carNo"></p>
        <ul class="listi">
          <li v-for="listI in listInput" ref="input" v-show=" listI.isShow"><input maxlength="1" type="text"
                                                                                   v-model="listI.carNum">
          </li>
        </ul>
      </div>
      <div class="btn">
        <ul>
          <li @click="onPay"> 确 定</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'carpay',
    data() {
      return {
        parkCode: 'jsds20170314',
        url: location.href,
        logo: require('../assets/LOGO.png'),
        max: 7,
        carNo: '',
        navS: ['一般车牌', '新能源车'],
        listInput: [{carNum: '', isShow: true}, {carNum: '', isShow: true}, {carNum: '', isShow: true},
          {carNum: '', isShow: true}, {'carNum': '', isShow: true}, {carNum: '', isShow: true},
          {carNum: '', isShow: true}, {
            carNum: '', isShow: false
          }],
        activeIndex: 0,
        cup: false,

      }
    },
    created() {
      this.carNo = localStorage.getItem('carNo')
      for (let i = 0; i < this.carNo.length; i++) {
        this.listInput[i].carNum = this.carNo.slice(i, i + 1)
      }
      this.focus

    },
    methods: {
      focus: function () {
        this.listInput[0].carNum.focus();
      },
      next: function () {
        for (let i = 0; i < this.listInput.length; i++) {
          if (this.listInput[i].carNum.length == 1) {

          }

        }

      },

      getQueryVariable: function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] == variable) {
            return pair[1];
          }
        }
        return (false);
      },
      showColor(index) {
        this.activeIndex = index;
        if (this.activeIndex != 0) {
          this.listInput[7].isShow = true;
        } else {
          this.listInput[7].isShow = false;
        }
      },
      onPay() {
        let id = this.getQueryVariable('clientId')
         localStorage.setItem('carNo', this.carNo)
        // https://ceshicloud-of.jslife.net
        let url = '/jparking-service/order/carno/pay'
        var carpay = {
          'parkCode': this.parkCode,
          'carNo': this.carNo,
          'orderType': 'VNP'
        }
        this.$axios.post(url, carpay).then(res => {
          if (res.data.resultCode == 0) {
            if (res.data.dataItems[0].attributes.retmsg != '没找到对应的入场记录') {
              let {endTime, startTime, totalFee, orderNo} = res.data.dataItems[0].attributes
              this.$router.push({
                path: 'pay',
                query: {
                  openId: id,
                  endTime: endTime,
                  startTime: startTime,
                  totalFee: totalFee,
                  orderNo: orderNo
                }
              })
            } else {
              this.cup = true
            }
          }
        }).catch(error => {
          console.log(error)
        })
      },
      close() {
        this.cup = false
      }
    },
    computed: {
      maxlenght: function () {
        return this.activeIndex != 0 ? this.max = 8 : this.max = 7
      },
    },
    updated() {
      if (this.activeIndex != 0) {
        for (let i = 0; i < this.listInput.length; i++) {
          this.listInput[i].carNum = this.carNo.slice(i, i + 1).toUpperCase()
        }
      } else {
        for (let j = 0; j < this.listInput.length - 1; j++) {
          this.listInput[j].carNum = this.carNo.slice(j, j + 1).toUpperCase()
        }
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .cup {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
  }

  .alert {
    position: absolute;
    width: 80%;
    height: 200px;
    background: #fff;
    z-index: 999;
    margin: 50% 10% 0 10%;
    border-radius: 10px;
  }

  .alert p {
    font-size: 20px;
    margin-top: 10%;
    text-align: center;
    color: rgb(135, 96, 79);
  }

  .alert p:nth-child(2) {
    height: 50px;
    line-height: 50px;
    width: 80%;
    border-radius: 10px;
    color: #fff;
    background: rgb(135, 96, 79);
    margin: 20% 10% 0 10%;
  }

  .carpay {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: rgb(255, 244, 238);
    position: absolute;
  }
  .logo {
    display: inline-block;
    margin-left: 20%;
    margin-top: 20px;
  }

  section {
    padding-top: 50px;
  }

  section .section {
    margin: 0px auto 0 auto;
    width: 90%;
    height: 45%;
    background: rgb(161, 125, 113);
    border-radius: 10px;
  }

  .section nav ul {
    display: flex;
    background: rgb(135, 96, 79);
    height: 60px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  p input {
    border: none;
    background: rgb(161, 125, 113);
    height: 30px;
    outline: none;
    color: rgb(135, 96, 79);
    font-size: 20px;
    width: 40%;
  }

  .section nav ul li {
    width: 50%;
    color: #FFF;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
  }

  .section nav ul li:nth-child(1) {
    border-top-left-radius: 10px;
  }

  .section nav ul li:last-child {
    border-top-right-radius: 10px;
  }

  .section p {
    font-size: 20px;
    color: #fff;
    margin: 10% 0 10% 4%;
  }

  .section .listi {
    display: flex;
    justify-content: space-around;
    padding: 0 3% 15% 3%;
  }

  .section .listi input {
    display: inline-block;
    width: 100%;
    height: 32px;
    border: none;
    text-align: center;
    line-height: 30px;
    outline: none;
    margin: auto;
    font-size: 20px;
  }
  .active {
    background: rgb(161, 125, 113);

  }
  .active li:last-child {
    border-top-left-radius: 10px;
  }

  .section .listi li {
    width: 11%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #fff;
    border-radius: 2px;
    background: rgb(161, 125, 113);
  }

  .section img {
    display: inline-block;
    height: 40%;
    width: 80%;
  }

  .btn ul {
    display: flex;
    margin-top: 50px;
    justify-content: space-around;
  }

  .btn ul li {
    height: 50px;
    width: 90%;
    background: rgb(161, 125, 113);
    color: #fff;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    font-size: 20px;
  }

</style>
