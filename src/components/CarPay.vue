<template>
  <div class="carpay">
    <img class="logo" :src='logo' height="100" width="70%"/>
    <section>
      <div class="section">
        <nav>
          <ul>
            <li v-for=" (nav,index) in navS" :class="{active:activeIndex==index}" @click="showColor(index)">{{ nav
              }}
            </li>
          </ul>
        </nav>
        <p>请输入车牌号：<input type="text" ref="input" :maxlength="maxlenght" v-model="carNo"></p>
        <ul class="listi">
          <li v-for="listI in listInput" v-show=" listI.isShow"><input maxlength="1" type="text" v-model="listI.carNum">
          </li>
        </ul>
      </div>
      <div class="btn">
        <ul>
          <li @click="onPay">直 接 缴 费</li>
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
        url: location.href,
        logo: require('../assets/LOGO.png'),
        max: 7,
        carNo: '',
        navS: ['一般车牌', '新能源车', '香 港', '澳 门', '领事馆'],
        listInput: [{carNum: '', isShow: true}, {carNum: '', isShow: true}, {carNum: '', isShow: true},
          {carNum: '', isShow: true}, {'carNum': '', isShow: true}, {carNum: '', isShow: true},
          {carNum: '', isShow: true}, {
            carNum: '', isShow: false
          }],
        activeIndex: 0,
      }
    },
    mounted() {
      this.$refs['input'].focus();
    },
    created() {
      this.carNo = localStorage.getItem('carNo')

      for (let i = 0; i < this.carNo.length; i++) {
        this.listInput[i].carNum = this.carNo.slice(i, i + 1)
      }
    },
    methods: {
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
        // let id = this.getQueryVariable('openId')


        localStorage.setItem('carNo', this.carNo)
        this.$router.push({path: 'pay'})
      }
    },



    computed: {
      maxlenght: function () {
        return this.activeIndex != 0 ? this.max = 8 : this.max = 7
      }
    },
    updated() {
      if (this.activeIndex != 0) {
        for (let i = 0; i < this.listInput.length; i++) {
          this.listInput[i].carNum = this.carNo.slice(i, i + 1)
        }
      } else {
        for (let j = 0; j < this.listInput.length - 1; j++) {
          this.listInput[j].carNum = this.carNo.slice(j, j + 1)
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

  section {
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgb(255, 244, 238);
  }

  .logo {
    display: inline-block;
    margin-left: 15%;
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
    font-size: 18px;
    width: 60%;
  }

  .section nav ul li {
    width: 20%;
    color: #FFF;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
  }

  .section nav ul li:nth-child(1) {
    border-top-left-radius: 10px;
  }

  .section nav ul li:last-child {
    border-top-right-radius: 10px;
  }

  .section p {
    color: #fff;
    margin: 10% 0 10% 4%;
  }

  .section .listi {
    display: flex;
    justify-content: space-around;
    padding: 0 3% 0 3%;
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
  }

  .section img {
    display: inline-block;
    height: 40%;
    width: 80%;
    margin: 30px 10% 0 10%;
  }

  .btn ul {
    display: flex;
    margin-top: 50px;
    justify-content: space-around;
  }

  .btn ul li {
    height: 60px;
    width: 50%;
    background: rgb(161, 125, 113);
    color: #fff;
    line-height: 60px;
    text-align: center;
    border-radius: 50px;
    font-size: 24px;
  }

</style>
