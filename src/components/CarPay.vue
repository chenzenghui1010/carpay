<template>
  <div class="main">
    <div class="car"></div>
    <!--v-on:click="doinput"-->
    <div class="inputitem">
      <div v-for="(i,index) in count" v-bind:class="getchunkstyle(i - 1)" v-bind:key="i" @click="deleteCarNo">{{getLetter(i - 1) }}</div>
    </div>
    <div class="tip">
      <div class="checkbox">
        <input type="checkbox" id="checkbox1" v-model="newresourcecar">
        <label for="checkbox1"></label>新能源车
      </div>
    </div>
    <button v-bind:class="btnstyle" :disabled="disabled" @click="doquery">去缴费</button>
    <carnokeyboard v-on:select="selectletter" v-on:delete="deleteletter" v-show="begininput"
                   v-bind:inputtype="inputtype"></carnokeyboard>
    <div class="vip">
      <div>会员优惠时间:</div>
      <div style="font-size: 1.4rem;">10：00-22：00周日到周四</div>
      <div style="font-size: 1.4rem;">10：00-22：30周五到周六</div>
    </div>
    <div class="alert" v-if="show">
      <p>{{alert}}</p>
    </div>

  </div>
</template>

<script>

  import {getQueryString} from "../utils/globalhelper";
  import Carnokeyboard from "./keyboard.vue";

  export default {
    components: {Carnokeyboard},
    name: 'querycar',
    data() {
      return {
        carno: '',
        enable: false,
        begininput: true,//键盘
        count: 7,
        newresourcecar: false,
        inputindex: 0,
        parkCode: window.parkCode,
        url: location.href,
        logo: require('../assets/LOGO.png'),
        show: false,
        alert: '',
        disabled: true,
        formData: {
          phone: '',
          code: '',
        },
        timer: null,
      }
    },

    created() {
      document.title = '停车缴费'

    }
    ,
    mounted() {
      if (this.newresourcecar == false) {
        this.carno = localStorage.getItem('carNo').substring(0, 7)
      } else {
        this.carno = localStorage.getItem('carNo')
      }
      if (!(this.carno == '' || this.carno == null)) {
        this.begininput = false
        this.inputindex = 7
      }
    },
    watch: {
      carno: function (newvalue) {
        this.enable = newvalue.length > 6
      },
      newresourcecar: function (newvalue) {
        this.count = this.newresourcecar ? 8 : 7
        if (newvalue == true) {
          let closeT = document.getElementsByClassName('chunk').length
          this.disabled = true
          this.begininput = true
          if (closeT > 7) {
            this.begininput = false
          }
        }
      },
    },

    methods: {

      deleteCarNo: function () {
        this.begininput = true

      },
      getLetter: function (index) {
        if (index >= this.carno.length) {
          return ''
        }
        return this.carno[index]
      }
      ,
      doquery: function () {

        // if(this.carNo == '') {
        //   let value = document.getElementsByClassName('chunk')
        //   if (this.count == 7) {
        //     for (var i = 0; i < value.length; i++) {
        //       this.carNo += value[i].innerHTML
        //     }
        //     localStorage.setItem('carNo', this.carNo.substring(0, 7))
        //   }
        //   if (this.count == 8) {
        //     for (var i = 0; i < value.length; i++) {
        //       this.carNo += value[i].innerHTML
        //     }
        //     localStorage.setItem('carNo', this.carNo.substring(0, 8))
        //   }
        // }

        let id = getQueryString('clientId')
        let url = 'https://ceshicloud-of.jslife.net'+window.carnoPayUrl
        var carpay = {
          'parkCode': this.parkCode,
          'carNo': this.carno,
          'orderType': 'VNP'
        }
        this.$axios.post(url, carpay).then(res => {
          if (res.data.resultCode == 0) {
            if (res.data.dataItems[0].attributes.retcode == '0') {
              localStorage.setItem('carNo', this.carno)
              let {endTime, startTime, totalFee, orderNo} = res.data.dataItems[0].attributes
              window.location.href = './pay.html?openId=' + id + '&endTime=' + endTime + '&startTime=' + startTime + '&totalFee=' + totalFee + '&orderNo=' + orderNo
            } else {
              this.alert = res.data.dataItems[0].attributes.retmsg
              this.show = true
              setTimeout(() => {
                this.show = false
                // this.inputindex = 0
              }, 1000)
            }
          } else if (res.data.resultCode == 1) {
            this.alert = '系统错误'
            this.show = true
            setTimeout(() => {
              this.show = false
              // this.carno = ''
              // this.inputindex = 0
            }, 1000)
          }
        })
      },

      doinput: function () {
        if (this.begininput) {
          return
        }
        this.carno = ''
        this.begininput = true
        this.inputindex = 0
      }
      ,
      deleteletter: function () {

        this.inputindex = Math.max(0, this.inputindex - 1)

        this.carno = this.carno.substr(0, this.inputindex)
        // this.carNo =this.carNo.substring(0,this.carNo.length-1)
        //  alert(this.carNo)
      }
      ,
      selectletter: function (value) {

        this.carno = this.carno + value

        this.inputindex += 1
      }
      ,
      getchunkstyle: function (index) {

        if (!this.newresourcecar) {

          if (index == 0 && this.carno.length >= 1) {

            return 'chunk bluecolor'
          }

          return 'chunk noe'
        }
        else {

          if (index == 0 && this.carno.length >= 1) {

            return 'chunk deepgreencolor'
          }

          return 'chunk greencolor'
        }
      }
      ,
      getCode(formData) {
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      }
    },

    computed: {
      inputtype: function () {
        if (this.inputindex == 0) {
          return 0
        }
        if (this.inputindex == 1) {
          return 1
        }
        if (this.newresourcecar == false) {
          if (this.inputindex == 7) {
            this.disabled = false
            this.begininput = false
            return 2
          }
        }
        if (this.inputindex == 8) {
          this.disabled = false
          this.begininput = false
          return 2
        }
        return 3
      },
      btnstyle: function () {
        if (this.enable) {
          return 'btn enable'
        }
        return 'btn disable'
      },
    },
  }

</script>

<style scoped>

  .vip {
    margin-top: 5%;
    float: left;
    width: 90%;
    color: #A17D71;
  }

  .vip div {
    margin-top: 5px;
    font-size: 1.6rem;
    letter-spacing: 4px;
  }

  .alert {
    position: absolute;
    margin: 65% auto;
    height: 5rem;
    width: 25rem;
    background: rgba(45, 47, 59, 0.50);
    border-radius: 50px;
  }

  .alert p {
    width: 100%;
    height: 100%;
    line-height: 5rem;
    text-align: center;
    color: #fff;
    font-size: 1.8rem;
  }

  .main {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
  }

  .car {
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    width: 20rem;
    height: 10rem;
    background: url("../assets/LOGO.png") no-repeat center / 10rem;
    overflow: visible;
  }

  .inputitem {
    display: flex;
    height: 4rem;
    width: 90%;
    background-color: white;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    /*align-items: center;*/
  }

  .chunk {
    border: 1px solid #979797;
    border-left: 0px;
    height: 100%;
    width: 50px;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: center;
    color: black;
    line-height: 3.6rem;
    font-size: 1.8rem;
    font-family: "Microsoft Yahei", "Arial", "Helvetica";
  }

  .chunk:first-child {

    border: 1px solid #979797;
  }

  .noe:nth-child(1) {
    background-color: #A17D71;
  }

  .bluecolor {
    background-color: #A17D71;
    color: white;
  }

  .deepgreencolor {

    background-color: #7ed321;
    color: white;
  }

  .greencolor {
    background-color: #B8E986;
    color: #fff;
  }

  .tip {
    display: flex;
    justify-content: flex-end;
    margin: 1rem auto;
    width: 90%;
    font-size: 1.2rem;
    color: #b8c2c7;
    height: 10px;
  }

  input[type=checkbox] {

    display: none;
  }

  label {

    display: inline-block;
    height: 20px;
    width: 20px;
    margin-right: 1rem;
    border: 1px solid grey;
    box-sizing: border-box;
    vertical-align: middle;
  }

  label::before {

    content: '';
    width: 20px;
    height: 20px;
    display: inline-block;

    margin-right: 1rem;
  }

  input:checked + label::before {

    border: 2px solid #7ed321;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    width: 10px;
    height: 5px;
    top: 5px;
    left: 5px;
    position: absolute;
  }

  .checkbox {

    position: relative;
    color: #2D2F3B;
    font-size: 1.4rem;
  }

  .btn {
    width: 90%;
    height: 4rem;
    margin-top: 0.5rem;
    border-radius: 5px;
    text-align: center;
    /*line-height: 4rem;*/
    font-size: 1.4rem;
    margin-top: 5rem;
  }

  .enable {

    background-color: #A17D71;
    color: white;
    font-size: 1.4rem;
  }

  .disable {

    /*background-color: gray;*/
    color: #b8c2c7;
    font-size: 1.8rem;
    border: 1px solid #d8d8d8;
  }

  img {
    display: inline-block;
    width: 11rem;
    text-align: center;
    height: 6.9rem;
  }

  button {
    background: whitesmoke;
    outline: none;
    border: none;

  }

</style>

