<docs>
  ## 错误页面
</docs>
<template>
  <div class="error">
    <div class="content">
      <i class="icon" :class="info.iconClass"></i>
      <p class="text">{{info.msg}}</p>
      <button class="btn btn-round" @click="btnClick">{{info.btnText}}</button>
    </div>
  </div>
</template>
<script>
const relogin = 'http://rsj.beijing.gov.cn/mplatform/main.ht';
const conf = {
  1: {
    msg: '证件类型不是身份证，请重新登录！',
    path: relogin,
    btnText: '重新登录',
    iconClass: 'warning'
  },
  2: {
    msg: '身份证号码不合法，请重新登录！',
    path: relogin,
    btnText: '重新登录',
    iconClass: 'warning'
  },
  3: {
    msg: '联系电话为空，请重新绑定！',
    path: relogin,
    btnText: '重新登录',
    iconClass: 'warning'
  },
  4: {
    msg: '登录超时，请重新登录！',
    path: relogin,
    btnText: '重新登录',
    iconClass: 'offline'
  },
  5: {
    msg: '姓名不合法，请重新登录！',
    path: relogin,
    btnText: '重新登录',
    iconClass: 'warning'
  },
  6: {
    msg: '您未在百姓就业超市做求职登记，不能使用此功能！',
    path: relogin,
    btnText: '重新登录',
    iconClass: 'exception'
  },
  7: {
    msg: '个人编号为空，请重新登录！',
    path: relogin,
    btnText: '重新登录',
    iconClass: 'exception'
  }
};
export default {
  name: 'errorpage',
  data() {
    return {
      info: {
        msg: '',
        path: '',
        btnText: '',
        iconClass: ''
      }
    };
  },
  methods: {
    // 获取query参数
    getUrlCode() {
      const str = window.location.search;
      const strArr = str.slice(1).split('=');
      const obj = {};
      for (let i = 0; i < strArr.length; i += 1) {
        if (i % 2 === 0) {
          obj[strArr[i]] = strArr[i + 1];
        }
      }
      return obj;
    },
    // 点击按钮
    btnClick() {
      window.location.href = this.info.path;
    },
    _initialMsg() {
      const flag = this.getUrlCode().code;
      if (flag === '') {
        this.info = conf[4];
      } else {
        this.info = conf[flag];
      }
    }
  },
  created() {
    this._initialMsg();
  }
};
</script>
<style>
body {
  background-color: #fff;
}
</style>

<style lang="scss" scoped>
@import '~common/scss/var.scss';
.error {
  padding-top: 360px;
  font-size: $font-size-large;
  .content {
    text-align: center;
    margin-bottom: $margin-base * 4;
  }
  .text {
    padding: $padding-base;
    margin: 0 auto;
    width: 80%;
    line-height: 1.3;
  }
  .icon {
    display: inline-block;
    height: 342px;
    width: 303px;
    text-align: center;
    background-size: 115px auto;
    // 登陆超时
    &.offline {
      background: url('./offline.png') 0 0 no-repeat;
      background-size: 303px auto;
    }
    // 登陆，信息异常
    &.warning {
      background: url('./warning.png') 0 0 no-repeat;
      background-size: 303px auto;
    }
    // 后台报错
    &.exception {
      background: url('./exception.png') 0 0 no-repeat;
      background-size: 303px auto;
    }
  }
  .btn {
    height: 80px;
    font-size: $font-size-large;
    padding: $padding-base/2 $padding-base * 3;
    width: auto;
    line-height: 1;
    margin-top: 50px;
  }
}
</style>
