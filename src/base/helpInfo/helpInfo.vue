<docs>
  ## 帮助信息
</docs>
<template>
<transition name="info">
  <div class="helpInfo" v-show="visible" @click="visible = false">
    <div class="container-wrap" @click.stop>
      <div class="container">
        <i class="title-left"></i>
        <i class="title-right"></i>
        <i class="close icon-close iconfont" @click="visible = false"></i>
        <h3 class="title">
          <span>{{title}}</span>
        </h3>
        <div class="text" :style="{maxHeight: maxHeight}">
          <p v-for="(item, index) in messages" :key="index">{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'helpBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    msg: {
      type: [String, Array],
      default: ''
    }
  },
  computed: {
    messages() {
      const msg = this.msg;
      return typeof msg === 'string' ? [msg] : msg;
    }
  },
  data() {
    return {
      visible: false,
      maxHeight: ''
    };
  },
  created() {
    this.maxHeight = `${window.innerHeight * 0.6}px`;
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var';
.helpInfo {
  @include pop-cover;
  @include pop-animation(info);
  .container-wrap {
    @include pop-wrap;
  }
  .title-right,
  .title-left {
    width: 35px;
    height: 70px;
    background: url('~common/images/bar.png') 0 0 no-repeat;
    background-size: contain;
    position: absolute;
    top: 24px;
    z-index: 4;
  }
  .title-left {
    left: -34px;
  }
  .title-right {
    right: -34px;
    transform: rotate(180deg);
  }
  .container {
    z-index: 5;
    position: relative;
    max-height: 100%;
    background-color: #fff;
    border-radius: 10px;
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #fff;
      font-size: $font-size-small;
      z-index: 6;
      padding: 6px;
      border: 1px solid #fff;
      border-radius: 50%;
    }
    .close:active {
      // background-color: $color-warning;
      color: $color-warning;
      border-color: $color-warning;
    }
    .title {
      position: relative;
      z-index: 5;
      top: -1px;
      font-size: $font-size-large;
      color: #fff;
      padding: 25px;
      margin: 0 -8px;
      background-color: $color-base;
      border-radius: 10px;
    }
    .text {
      color: $color-base;
      background-color: #fff;
      line-height: 1.5;
      font-size: $font-size-base;
      padding: 20px 30px;
      overflow: auto;
      border-radius: 10px;
      position: relative;
      z-index: 5;
    }
  }
}
</style>

