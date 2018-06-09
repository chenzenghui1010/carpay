<template>
  <div class="main">
    <div class="car"></div>
    <div class="inputitem" v-on:click="doinput">
      <div v-for="i in count" v-bind:class="getchunkstyle(i - 1)" v-bind:key="i">{{ getLetter(i - 1) }}</div>
    </div>
    <div class="tip">
      <div style="font-size: 1.4rem;">车辆入场后，可查看停车信息</div>
      <div class="checkbox">
        <input type="checkbox" id="checkbox1" v-model="newresourcecar">
        <label for="checkbox1"></label>新能源车
      </div>
    </div>
    <div v-bind:class="btnstyle" v-on:click="doquery">查询车辆</div>
    <carnokeyboard v-on:select="selectletter" v-on:delete="deleteletter" v-show="begininput"
                   v-bind:inputtype="inputtype"></carnokeyboard>


    <div class="img">
      <img :src="logo" alt="">
    </div>
    <div class="alert" v-if="show">
      <p>{{alert}}</p>
    </div>

  </div>
</template>

<script>

  import Carnokeyboard from "./keyboard.vue";
  export default {
    components: {Carnokeyboard},
    name: 'querycar',
    data: function () {
      return {
        carno: '',
        enable: false,
        begininput: false,//键盘
        count: 7,
        newresourcecar: false,
        inputindex: 0,
        parkCode: window.parkCode,
        url: location.href,
        carNo: '',
        logo: require('../assets/LOGO.png'),
        show: false,
        alert: '',
      }
    },
    created() {

    },

    watch: {
      carno: function (newvalue) {

        this.enable = newvalue.length > 4
      },
      newresourcecar: function (newvalue) {

        this.count = this.newresourcecar ? 8 : 7
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

        if (this.inputindex == 6) {

          return 3
        }

        return 2
      },
      btnstyle: function () {

        if (this.enable) {

          return 'btn enable'
        }

        return 'btn disable'
      },
    },

    methods: {

      //截取
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


      getLetter: function (index) {

        if (index >= this.carno.length) {

          return ''
        }

        return this.carno[index]
      },
      doquery: function () {



        let value = document.getElementsByClassName('chunk')
        for (var i = 0; i < value.length; i++) {
          this.carNo += value[i].innerHTML
        }
        sessionStorage.setItem('carNo', this.carNo)

        let id = this.getQueryVariable('clientId')
        let url = 'https://ceshicloud-of.jslife.net/jparking-service/order/carno/pay'
        var carpay = {
          'parkCode': this.parkCode,
          'carNo': this.carNo,
          'orderType': 'VNP'
        }
        this.$axios.post(url, carpay).then(res => {
          if (res.data.resultCode == 0) {
            if (res.data.dataItems[0].attributes.retcode == '0') {
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
              this.show=true
              this.alert=res.data.dataItems[0].attributes.retmsg
              setTimeout(()=>{
                this.show=false
                this.carNo=''
              },1000)
              return
            }
          } else {
            this.show=true
            this.alert='系统异常'
            setTimeout(()=>{
              this.show=false
              this.carNo=''
            },1000)
            return
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
      },
    },

    updated: function () {
      if (this.count == 7) {

        let close = document.getElementsByClassName('chunk')[6].innerText

        if (close != '') {

          this.begininput = false
        }

      }
      if (this.count == 8) {

        let closeT = document.getElementsByClassName('chunk')[7].innerText

        if (closeT != '') {

          this.begininput = false

        }

      }

    }


  }

</script>

<style scoped>

  .alert {
    position: absolute;
    margin: 65%  auto;
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
    background: url("../assets/caricon.png") no-repeat center / 20rem;
    overflow: visible;
  }

  .inputitem {
    height: 4rem;
    width: 90%;
    background-color: white;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    align-items: center;
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
    line-height: 4rem;
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
    justify-content: space-between;
    margin: 1rem auto;
    width: 90%;
    font-size: 1.2rem;
    color: #b8c2c7;
    height: 20px;
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

    width: 86%;
    height: 4rem;
    margin-top: 0.5rem;
    border-radius: 5px;
    text-align: center;
    line-height: 4rem;
    font-size: 1.4rem;
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
    margin-top: 16.9rem;
    display: inline-block;
    width: 11rem;
    height: 6.9rem;
  }

</style>

