<docs>
  ## message 信息弹窗使用范例
</docs>
<template>
  <div class="message">
    <!-- toast -->
    <div class="toast">
      <div class="weui-cells__title">toast 用法</div>
      <div class="weui-cells toast">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <button class="weui-btn weui-btn_default" @click="toastDefault">基本用法</button>
          </div>
          <div class="weui-cell__bd">
            <button class="weui-btn weui-btn_primary" @click="toastIcon">带有icon，top</button>
          </div>
        </div>
      </div>
    </div>
    <!-- alert -->
    <div class="alert">
      <div class="weui-cells__title">alert 用法</div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <button class="weui-btn weui-btn_primary" @click="alert">alert</button>
          </div>
        </div>
      </div>
    </div>
    <!-- confirm -->
    <div class="confirm">
      <div class="weui-cells__title">confirm 用法</div>
      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" @click="confirm">
          <div class="weui-cell__bd">
            <p>confirm 返回的为promise</p>
          </div>
          <div class="weui-cell__ft"></div>
        </div>
      </div>
    </div>
    <!-- loading -->
    <div class="loading">
      <div class="weui-cells__title">点击 loading</div>
      <div class="weui-cells" @click="loading">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">
            <p>loading 点击加载</p>
          </div>
          <div class="weui-cell__ft">1500ms消失</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'message',
  methods: {
    toastDefault() {
      this.$toast('toast 的基本用法');
    },
    toastIcon() {
      this.$toast({
        message: 'toast icon',
        icon: 'success',
        position: 'bottom'
      });
    },
    alert() {
      /* 返回的为promise */
      this.$alert('alert 基本用法').then(e => {
        this.$toast(e.toString());
      });
    },
    confirm() {
      this.$confirm('确定要删除吗？', '提示')
        .then(() => {
          this.$toast('选择了确定');
        })
        .catch(() => {
          this.$toast('选择了取消');
        });
    },
    loading() {
      this.$loading = true;
      setTimeout(() => {
        this.$loading = false;
      }, 1500);
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.toast {
  .weui-cell__bd {
    justify-content: space-around;
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
  }
  .weui-btn {
    width: 95%;
    display: inline-block;
  }
}
</style>
