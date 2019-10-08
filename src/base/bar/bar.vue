<docs>
  ## bar帮助和主页按钮
</docs>
<template>
  <div class="bar" id="bar" v-show="visibleAll">
    <div class="help item"
      @click="helpTarget"
      v-show="visibleHelp">
      <i class="iconfont icon-info"></i>
    </div>
    <router-link tag="div" class="item"  to="/index">
      <i class="iconfont icon-com_home"></i>
    </router-link>
  </div>
</template>
<script>

export default {
  name: 'bar',
  computed: {
    visibleAll() {
      return this.$store.getters.visibleAll;
    },
    visibleHelp() {
      return this.$store.getters.visibleHelp;
    }
  },
  methods: {
    helpTarget() {
      const { title, content } = this.$store.getters.help;
      this.$helpInfo({
        title,
        msg: content
      });
    }
  },
  mounted() {
    // const bar = document.querySelector('#bar');
    // const width = parseFloat(bar.offsetWidth) / 2;
    // const height = parseFloat(bar.offsetHeight) / 2;
    // function setPoisition(e) {
    //   const m = e.touches[0];
    //   // console.log(`translate3d(${m.clientX - width}px, ${m.clientY - height}px, 0)`);
    //   bar.style.transform = `translate3d(${m.clientX - width}px, ${m.clientY - height}px, 0)`;
    // }
    // bar.addEventListener('touchmove', throttle(setPoisition, 40));
    // this.touchmove = throttle(setPoisition, 100);
  }
};
</script>
<style scoped lang="scss">
  @import '~common/scss/var.scss';
  $padHelp: $padding-base / 3;
  .bar {
    position: fixed;
    bottom: 190px;
    right: 30px;
    color: $color-base;
    z-index: 6;
    .iconfont {
      font-size: $font-size-ultra * 3/4;
      display: block;
      height: 60px;
      width: 60px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 50%;
      position: relative;
      // box-shadow: $color-base 0 0 1px;
    }
    .iconfont:before {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .icon-info:before {
      transform: translate(-50%, -47%);
    }
    .item {
      display: block;
      padding: $padding-base / 2;
      border: $padHelp solid #fff;
      background: transparent;
      border-radius: 50%;
      box-shadow: $color-base 0 1px 6px;
      // text-shadow:  $color-base 0 2px 10px;
    }
    .item,
    .item .iconfont {
      transition: $transition;
    }
    .item:active {
      border-color: $color-base;
      .iconfont {
        background-color: $color-base;
        color: #fff;
      }
    }
  }
</style>
