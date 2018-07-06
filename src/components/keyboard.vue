<template>
  <div class="keyboard">
    <div class="container">
      <div v-for="(item, index) in items" :class="unusable " class="line ">
        <span v-for="unit in item" class="item" v-on:click="onselect(unit)"> {{ unit }}</span>
        <div v-if="index == items.length-1 " class="delete" v-on:click="ondelete">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>

  const keyboarditems_0 = [
    ['粤', '川', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂'],
    ['浙', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '闽'],
    ['赣', '湘', '鄂', '京', '琼', '甘', '陕', '贵'],
    ['云', '黑', '吉', '辽', '澳', '港']
  ]

  const keyboarditems_1 = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']]

  const keyboarditems_2 = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']]

  const keyboarditems_3 = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']]

  export default {

    name: 'keyboard',

    props: ['inputtype'],

    computed: {

      unusable: function () {

        if (this.inputtype == 1) {

          return 'count '

        } else if (this.inputtype == 2) {

          return ' special '

        }
      },


      items: function () {

        if (this.inputtype == 0) {

          return keyboarditems_0

        }
        if (this.inputtype == 1) {

          return keyboarditems_1

        }
        if (this.inputtype == 2) {

          return keyboarditems_2

        }
        if (this.inputtype == 3) {

          return keyboarditems_3
        }
      }
    },
    methods: {
      ondelete: function () {

        this.$emit('delete')
      },
      onselect: function (value) {

        console.log(this.inputtype)

        if (this.inputtype == 1) {

          for (let i = 0; i < 10; i++) {

            if (value == i) {

              return
            }
          }
        }

        if (this.inputtype == 1 || this.inputtype == 2)

          if (value == '港' || value == '澳' || value == '学') {

            return

          }

        this.$emit('select', value)

      }
    }
  }

</script>

<style scoped>
  .count:first-child .item,
  .count:nth-child(2) .item:nth-child(10),
  .count:nth-child(2) .item:nth-child(9),
  .count:nth-child(3) .item:nth-child(10) {
    background: #C3C8D2;
  }

  .special:nth-child(2) .item:nth-child(9),
  .special:nth-child(2) .item:nth-child(10),
  .special:nth-child(3) .item:nth-child(10) {
    background: #C3C8D2;
  }

  .keyboard {
    position: absolute;
    text-align: center;
    background-color: #d1d5de;
    bottom: 0;
    width: 100%;
    margin: 0 auto;
    padding-top: 2% ;
  }

  .container {

  }

  .line {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
  }

  .item {

    font-size: 2rem;
    background: #FFF;
    box-shadow: 0 2px 0 0 #686A6E;
    height: 4rem;
    width: 8%;
    line-height: 4rem;
    border-radius: 6px;
    margin: 1rem 1%;
  }

  .delete {
    position: absolute;
    margin-top: 1rem;
    width: 10%;
    height: 4rem;
    font-size: 1.5rem;
    right: 0.4rem;
    /*margin-left: 44%;*/
    /*justify-content: flex-end;*/
    background: #AFB3BE;
    box-shadow: 0 2px 0 0 #686A6E;
    border-radius: 10px;
    background: #AFB3BE url("../assets/return.png") no-repeat center/ 25px;

  }
</style>
