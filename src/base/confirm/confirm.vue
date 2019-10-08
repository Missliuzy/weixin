<docs>
  ## confirm 提示

</docs>
<template>
<transition name="confirm">
  <div class="confirm" v-show="visible">
    <div class="container-wrap">
      <div class="container">
        <h3 class="title">{{title}}</h3>
        <p class="text">{{content}}</p>
        <div class="btn-wrap">
          <button @click="cancleHandle"
          class="btn btn-gray">{{cancelBtnText}}</button>
          <button @click="confirmHandle"
          class="btn btn-primary">{{confirmBtnText}}</button>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'confirm',
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    cancelBtnText: {
      type: String
    },
    confirmBtnText: {
      type: String
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    cancleHandle(event) {
      this.visible = false;
      this.$emit('cancle', event);
    },
    confirmHandle(event) {
      this.visible = false;
      this.$emit('confirm', event);
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~common/scss/var.scss';
.confirm {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1003;
  background: $color-cover-bg;
  &.confirm-enter-active {
    animation: cover-fadein 0.3s;
    .container {
      animation: content-zoom 0.3s;
    }
  }
  &.confirm-leave-to {
    opacity: 0;
  }
  &.confirm-leave-active {
    transition: all ease 0.3s;
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
  // padding: $padding-base;
  background-color: $color-white;
  position: relative;
  text-align: center;
  line-height: 1.5;
  .title {
    color: $color-text-title;
    padding: $padding-btn;
    font-size: $font-size-base;
    font-weight: bold;
    line-height: 1;
  }
  .text {
    font-size: $font-size-large;
    color: $color-text-primary;
    padding: 0 $padding-base $padding-base;
  }
  .btn-wrap {
    display: flex;
    justify-content: space-between;
    .btn {
      flex: 0 1 50%;
      border-radius: 0;
    }
  }
}
</style>
