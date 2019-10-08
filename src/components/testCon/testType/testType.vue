<docs>
  ## 测试类型选择页面，知识技能兴趣
</docs>
<template>
  <div class="type">
    <!-- banner -->
    <div :class="bannerClass"></div>
    <!-- 内容说明 -->
    <div class="notice">
      <h3 class="title">{{content.title}}</h3>
      <p class="text">{{content.text}}</p>
    </div>
    <!-- 用户信息 -->
    <user-info :name="username"
      :number="idcard" btn-text="开始测评" @btnClick="beginTest"
    ></user-info>
    <!-- 选择兴趣 -->
    <choice-interest @choiceType="choiceInterest" :visible.sync="visibleInterest"></choice-interest>
  </div>
</template>
<script>
import UserInfo from 'base/userInfo/userInfo';
import { AnsRemarks } from 'common/js/conf';
import ChoiceInterest from './choiceInterest';

export default {
  name: 'testType',
  components: { UserInfo, ChoiceInterest },
  data() {
    return {
      username: '',
      idcard: '',
      bannerClass: 'banner',
      content: {
        title: '',
        text: ''
      },
      visibleInterest: false,
      cpwd: '',
      wdzx: ''
    };
  },
  methods: {
    /**
     * 根据wdzx的有无，获取参数
     */
    getParams() {
      const params = {
        cpwd: this.cpwd
      };
      this.wdzx && (params.wdzx = this.wdzx);
      return params;
    },
    // 开始测评按钮
    beginTest() {
      if (this.cpwd === '03') {
        this.visibleInterest = true;
      } else {
        this.confirmContinue();
      }
    },
    // 兴趣选中
    choiceInterest(type) {
      this.wdzx = type;
      this.confirmContinue();
    },
    /**
     * 确定是否继续答题
     */
    confirmContinue() {
      this.GET_unresolve().then(query => {
        this.$store.commit('SET_TESTROUTER_CANGO', true);
        this.$router.push({ name: 'testAns', query });
      });
    },
    async GET_unresolve() {
      const params = this.getParams();
      this.$loading = true;
      const result = await this.$http.get('/grzycp/hqwwctmCx', { params });
      this.$loading = false;
      const resData = result.returnData;
      if (+resData.executeResult === 1) {
        this.$loading = true;
        await this.$http.post('/grzycp/fqdtSc', { cppcid: resData.cppcid });
        this.$loading = false;
        return params;
      }
      return params;
    }
  },
  // 在路由之前控制参数，导航守护
  beforeRouteEnter(to, from, next) {
    if (to.query && to.query.cpwd) {
      next();
    } else {
      next({ name: 'index' });
    }
  },
  created() {
    // 若没有query值类型，则转到首页，typez值为1,2,3
    const type = +this.$route.query.cpwd;
    this.bannerClass = `${this.bannerClass} banner${type}`;
    this.content = AnsRemarks[type - 1];
    // 个人信息
    const userInfo = this.$store.state.userInfo;
    this.username = userInfo.name;
    this.idcard = userInfo.sfzhm;
    // 测评
    this.cpwd = this.$route.query.cpwd;
  }
};
</script>
<style scoped lang="scss">
  @import '~common/scss/var.scss';
  .type {
    .banner {
      width: 100%;
      height: 378px;
      @for $i from 1 to 4 {
        &.banner#{$i} {
          background: url('~common/images/0#{$i}.jpg') 0 0 no-repeat;
          background-size: 750px 378px;
        }
      }
    }
    .notice {
      margin: $margin-base 0 $margin-base * 2;
      background: #fff;
      padding: $padding-base;
      padding-bottom: 168px;
      .title {
        color: $color-base;
        font-size: $font-size-large;
        line-height: 2;
        &:before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 26px;
          background: $color-base;
          margin-right: 20px;
        }
      }
      .text {
        padding-left: 20px;
        line-height: 2;
      }
    }
  }
</style>
