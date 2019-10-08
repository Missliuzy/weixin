<docs>
  ## 分页时的下拉刷新 pageLoading
</docs>
<template>
  <div class="page-loading" v-show="visible">
    <i class="iconfont icon-loading"></i>
    <p class="text">{{text}}</p>
  </div>
</template>
<script>
export default {
  name: 'pageLoading',
  props: {
    text: {
      type: String,
      default: '加载中...'
    },
    visible: {
      type: false,
      default: false
    }
  },
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.page-loading {
  text-align: center;
  position: relative;
  color: $color-text-label;
  padding: $padding-base 0;
  .iconfont {
    position: relative;
    display: inline-block;
    animation: rotate 2.5s linear infinite;
    &:before {
      font-size: $font-size-large;
    }
  }
  .text {
    font-size: $font-size-small;
    line-height: 1.5;
  }
}
</style>
