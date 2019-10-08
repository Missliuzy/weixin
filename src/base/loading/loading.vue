<docs>
  ## loading component
</docs>
<template>
<transition name="fade">
  <div class="loading" v-show="visible">
    <div class="icon">
      <i class="iconfont icon-loading"></i>
      <p class="text">{{text}}</p>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'loading',
  data() {
    return {
      visible: false,
      text: '加载中...'
    };
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
$icon-length: $font-size-ultra-plus * 1.5;
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1501;
  .icon {
    font-size: $font-size-small;
    color: #fff;
    padding: $padding-base;
    text-align: center;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: $radius-base2;
    .iconfont {
      position: relative;
      width: $icon-length;
      height: $icon-length;
      animation: rotate 2.5s linear infinite;
      display: inline-block;
    }
    .iconfont:before {
      position: absolute;
      font-size: $icon-length;
      // top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .text {
      margin-top: $margin-base / 2;
    }
  }
}
</style>
