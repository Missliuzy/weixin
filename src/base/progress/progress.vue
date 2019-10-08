<docs>
  ## progress
</docs>
<template>
  <div class="progress" v-show="visible">
    <p class="inner" :style="{ width: `${val}%`}" ></p>
  </div>
</template>
<script>
import { timer } from 'common/js/utils';

export default {
  name: 'eprogress',
  data() {
    return {
      val: 0,
      visible: false
    };
  },
  methods: {
    start() {
      this.visible = true;
      if (this.val < 100) {
        this.val += 0.33333;
        timer(this.start);
      } else {
        this.end();
      }
    },
    reset() {
      this.val = 0;
    },
    end() {
      this.visible = false;
    }
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.progress {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1500;
  top: 0;
  height: 10px;
  background-color: #fff;
  .inner {
    height: 100%;
    background-color: $color-base;
  }
}
</style>
