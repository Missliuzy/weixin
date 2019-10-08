<docs>
  ## 消息弹出框组件
  ## props
  * message 提示内容
  * btnText 按钮文案
</docs>
<template>
  <transition name="alert">
    <div class="alert" v-show="visible" >
      <div class="container-wrap">
        <div class="container">
          <h3 class="title">{{title}}</h3>
          <p class="text">{{message}}</p>
          <button class="btn"  @click="close">{{btnText}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'eAlert',
  props: {
    title: {
      type: String
    },
    message: {
      type: String
    },
    btnText: {
      type: String
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    close(event) {
      this.visible = false;
      this.$emit('close', event);
    }
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.alert {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1000;
  background: $color-cover-bg;
  &.alert-enter-active {
    animation: cover-fadein 0.3s;
    .container {
      animation: content-zoom 0.3s;
    }
  }
  &.alert-leave-active {
    transition: all ease 0.3s;
  }

  &.alert-leave-to {
    opacity: 0;
  }
}
.container-wrap {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
}
.container {
  overflow: hidden;
  border-radius: $radius-base;
  background-color: $color-white;
  position: relative;
  text-align: center;
  font-size: $font-size-large;
  color: $color-text-primary;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  .title {
    flex: 0;
    padding: $padding-btn;
    line-height: 1;
    font-weight: bold;
  }
  .text {
    flex: 1;
    padding: 0 $padding-base $padding-base;
  }
  .btn {
    flex: 0;
    border-top: 1px solid $color-text-placeholder;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    color: $color-base;
    background-color: transparent;
  }
}
</style>
