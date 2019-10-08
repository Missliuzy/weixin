<docs>
  ## 支持下拉刷新的分页组件，
  * 派发一个到底的事件
</docs>
<template>
  <div class="pagination">
    <slot></slot>
    <loading :visible="(ajaxLoading || canFeatch)"></loading>
    <p class="no-data" v-if="noData">--无更多内容--</p>
  </div>
</template>
<script>
import Loading from './pageLoading';

export default {
  name: 'paginationList',
  components: { Loading },
  props: {
    ajaxLoading: {
      type: Boolean,
      default: false
    },
    noData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFirst: true,
      canFeatch: false,
      page: 1,
      maxPage: 1
    };
  },
  methods: {
    /* touchEvent */
    touchStart(e) {
      const html = document.documentElement;
      this.touchX = e.touches[0].clientY;
      this.docHeight = html.scrollHeight;
      this.winHeight = window.innerHeight;
    },
    touchMove(e) {
      const html = document.documentElement;
      const move = e.touches[0].clientY - this.touchX;
      const docTop = html.scrollTop || document.body.scrollTop;
      if (move < 0 && docTop > this.docHeight - this.winHeight - 30) {
        this.canFeatch = true;
      } else {
        this.canFeatch = false;
      }
    },
    touchEnd() {
      if (this.canFeatch && !this.ajaxLoading && !this.noData) {
        this.page += 1;
        this.$emit('pullingDown', this.page);
        this.$nextTick(() => {
          this.canFeatch = false;
        });
      }
    }
  },
  mounted() {
    // 绑定事件
    window.addEventListener('touchstart', this.touchStart);
    window.addEventListener('touchmove', this.touchMove);
    window.addEventListener('touchend', this.touchEnd);
  },
  destroyed() {
    // 解绑事件
    window.removeEventListener('touchstart', this.touchStart);
    window.removeEventListener('touchmove', this.touchMove);
    window.removeEventListener('touchend', this.touchEnd);
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.no-data {
  text-align: center;
  line-height: 5;
  color: $color-text-placeholder;
}
</style>
