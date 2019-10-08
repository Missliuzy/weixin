<docs>
  ##
</docs>
<template>
  <transition name="tankuang">
    <div class="tankuang" v-show="visible"  @click="hide">
      <div class="container-wrap" @click.stop>
        <div class="container tanchu">
          <div class="img">
            <img src="~common/images/back.png" alt="">
          </div>
          <div class="list_new">请选择要投递的简历</div>
          <div class="list_wrap">
            <div class="list weui-cells_radio weui-cells" v-for="(item,index) in jlxx" :key="index">
              <label class="weui-cell weui-check__label" :for="`abc${index}`">
                <div class="weui-cell__bd">
                  <p class="res_name">{{item.jlmc}}</p>
                  <p class="res_pos">应聘岗位：{{item.qzgwmc}}</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" class="weui-check" name="radio1" :id="`abc${index}`"
                  v-model="checked" :value="item.jlid">
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
            </div>
          </div>
          <button class="btn btn-primary" @click="toudi" :disabled="!checked">确认投递</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'tankuang',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    jlxx: {
      type: Array
    },
    grbh: {
      type: String
    }
  },
  data() {
    return {
      checked: ''
    };
  },
  watch: {
    visible(n) {
      n && (this.checked = '');
    }
  },
  methods: {
    hide() {
      this.$emit('update:visible', false);
    },
    // 点击确认投递
    toudi() {
      this.$emit('qrtd', this.checked);
    }
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.tankuang {
  @include pop-cover;
  @include pop-animation(tankuang);
  .container-wrap {
    @include pop-wrap;
  }
}
.left {
  float: left;
}
.img {
  position: absolute;
  top: -78px;
  left: 40%;
  width: 152px;
  height: 156px;
  border-radius: 50%;
  background-color: #fff;
  img {
    width: 98px;
    height: 94px;
    vertical-align: middle;
    margin: 30px;
  }
}
.tanchu {
  background-color: #fff;
}
.list_new {
  height: 80px;
  line-height: 80px;
  padding-top: 60px;
  text-align: center;
  color: #000;
  font-size: $font-size-large;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.list_wrap {
  max-height: 450px;
  overflow: auto;
}
.list {
  .name {
    width: 30%;
  }
  .res_name,
  .res_pos {
    font-size: 30px;
  }
}
.btn {
  height: 100px;
  width: 100%;
  background-color: $color-base;
  color: #fff;
  border-radius: 0;
}
</style>
