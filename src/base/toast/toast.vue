<docs>
  ## toast 组件
  ## props
  * message 弹出消息内容
  * duration 持续时间，
  * position 位置，
  * icon 默认无
</docs>
<template>
  <transition name="fade">
    <div class="toast-wrap" v-show="visible" :class="`toast-${position}`">
      <i class="icon iconfont" v-if="icon" :class="iconClass"></i>
      <p class="toast">{{message}}</p>
    </div>
  </transition>
</template>
<script>
import { SUCCESS, FAIL, WARNING } from 'common/js/conf';

export default {
  name: 'toast',
  props: {
    position: {
      type: String
    },
    duration: {
      type: Number
    },
    message: {
      type: String
    },
    icon: {
      type: String
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    /** icon className */
    iconClass() {
      let icon = '';
      switch (this.icon) {
        case SUCCESS:
          icon = 'icon-yes';
          break;
        case FAIL:
          icon = 'icon-close';
          break;
        case WARNING:
          icon = 'icon-warning';
          break;
        default:
          icon = '';
      }
      return icon;
    }
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';

.toast-wrap {
  z-index: 1001;
  font-size: $font-size-base;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  line-height: 1.5;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: $padding-base * 2 / 3;
  padding-top: $padding-base / 2;
  color: #fff;
  border-radius: $radius-base;
  top: 50%;
}
.toast-middle {
  top: 50%;
}
.toast-top {
  top: 20%;
}
.toast-bottom {
  top: auto;
  bottom: 20%;
}
.icon {
  text-align: center;
  display: inline-block;
  font-size: 80px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all ease 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
