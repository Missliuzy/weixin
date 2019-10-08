<docs>
  ## 职业介绍服务微信端登陆页面
</docs>
<template>
  <form class="login" @submit.prevent="formSubmit">
    <h1 class="title">登录</h1>
    <div class="weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">身份证号码</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="form.sfzhm"
          placeholder="请输入身份证号" maxlength="18">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">姓名</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="form.xm"
          placeholder="请输入姓名" maxlength="18">
        </div>
      </div>
    </div>
    <div class="weui-btn-area login-btn">
      <button class="weui-btn weui-btn_primary">登录</button>
    </div>
  </form>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        sfzhm: '410923199104201781',
        xm: '沙慧娟'
      }
    };
  },
  methods: {
    formSubmit() {
      this.$loading = true;
      this.$http.post('/login/login', this.form).then(() => {
        window.location.href = './index.html';
      }).catch(() => {

      }).finally(() => {
        this.$loading = false;
      });
    }
  }
};
</script>
<style scoped lang="scss">
  @import '~common/scss/var.scss';
  .login {
    padding: $padding-base 0;
    .title {
      text-align: center;
      font-size: $font-size-ultra;
      font-weight: normal;
      padding: $padding-base * 2 0;
      margin-bottom: $margin-base;
    }
    .weui-cells_form {
      background-color: #fff;
    }
    .login-btn {
      margin-top: 240px;
    }
  }
</style>
