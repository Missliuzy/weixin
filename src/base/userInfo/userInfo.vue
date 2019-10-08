<docs>
  ## 个人信息栏
</docs>
<template>
  <footer class="footer">
    <div class="info">
      <p class="name">{{name}}</p>
      <!-- <p class="phone">{{phone}}</p> -->
      <p class="number">身份证号：{{number}}</p>
    </div>
    <button class="btn" @click="$emit('btnClick')">{{btnText}}</button>
  </footer>
</template>
<script>
export default {
  name: 'userInfo',
  props: {
    btnText: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    number: {
      type: String,
      default: ''
    }
  }
};
</script>
<style scoped lang="scss">
  @import '~common/scss/var.scss';
  $h: 168px;
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: $h;
    display: flex;
    align-items: center;
    .info {
      background-color: #fff;
      height: 100%;
      border-top: 1px solid $color-bg;
      box-sizing: border-box;
      flex: 1 1 70%;
      font-size: $font-size-base;
      color: $color-text-label;
      padding: $padding-base;
      .name {
        font-size: $font-size-large;
        color: $color-text-title;
        line-height: 2;
        margin-bottom: 10px;
      }
      .number {
        line-height: 1.2;
      }
    }
    .btn {
      flex: 1 1 30%;
      height: $h;
      border: none;
      box-sizing: border-box;
      font-size: $font-size-large;
      background-color: $color-base;
      color: #fff;
      border-radius: 0;
      padding: 0;
      text-align: center;
    }
  }
</style>
