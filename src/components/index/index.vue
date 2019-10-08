<docs>
  ##
</docs>
<template>
  <div class="index" ref="index"
    :style="{minHeight: winHeight}">
    <!-- 内边距container 开始 -->
    <div class="container">
      <!-- 搜索 -->
      <router-link tag="a" to="/company/search" class="searchBar">
        <i class="iconfont icon-search"></i>
        <span>搜索</span>
      </router-link>
      <!-- 说明 -->
      <div class="note">
        <h3 class="title icon-shujuzhexian iconfont">测评工具说明：</h3>
        <p class="detail">基于求职匹配的基本原理，本系统通过对求职者的知识、技能、兴趣等
          影响职业选择的主要因素进行测评，以实现精准的空岗匹配推荐。
          请根据个人实际需要选择相应的测评工具！</p>
      </div>
      <!-- 标题 -->
      <div class="banner">
        <router-link tag="button" to="/test/result"
          class="btn btn-primary">历史测评查询</router-link>
      </div>
      <!-- 测评类别 -->
      <div class="test">
        <router-link :to="{ name:'testType', query: { cpwd: '01'}}"
         tag="div" class="item" >
          <i class="iconfont icon-knowledge"></i>
          <p class="text">知识</p>
        </router-link>
        <router-link :to="{ name:'testType', query: { cpwd: '02'}}"
          tag="div" class="item">
          <i class="iconfont icon-computer1"></i>
          <p class="text">技能</p>
        </router-link>
        <router-link :to="{ name:'testType', query: { cpwd: '03'}}"
          tag="div" class="item">
          <i class="iconfont icon-collecte2_on"></i>
          <p class="text">兴趣</p>
        </router-link>
      </div>
    </div>
    <!-- bar 功能导航 -->
    <div class="bar-wrap">
      <router-link to="/person/baseInfo" class="item">求职信息</router-link>
      <router-link to="/person/resumeList" class="item">简历维护</router-link>
      <router-link to="/company/search" class="item">职位搜索</router-link>
    </div>
    <HelpBtn></HelpBtn>
  </div>
</template>
<script>
import UserInfo from 'base/userInfo/userInfo';
import HelpBtn from '@/components/helpBtn/helpBtn';

export default {
  name: 'index',
  components: { UserInfo, HelpBtn },
  data() {
    return {
      winHeight: ''
    };
  },
  methods: {},
  mounted() {
    // fix mobile height
    const eleHeight = this.$refs.index.offsetHeight || 0;
    const windowHeight = this.$store.state.winHeight;
    this.winHeight = `${Math.max(windowHeight, eleHeight)}px`;
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.index {
  background-color: #149dee;
  background: linear-gradient(180deg, #149dee, #246fde);
  .container {
    padding: $padding-base;
    .searchBar {
      display: block;
      box-sizing: border-box;
      background-color: #fff;
      width: 100%;
      text-align: center;
      border-radius: $radius-base;
      font-size: $font-size-base;
      line-height: 60px;
      padding-left: $padding-base;
      .iconfont {
        font-size: $font-size-large;
      }
    }
    .note {
      color: #fff;
      .title {
        font-size: $font-size-large;
        padding: 40px 0 30px 0;
        line-height: 2;
      }
      .title:before {
        margin-right: 20px;
      }
      .detail {
        font-size: $font-size-base;
        line-height: 2;
      }
    }
    .banner {
      margin: 0px (-$padding-base);
      height: 300px;
      background: url('~common/images/index.png') 0 0 no-repeat;
      background-size: 750px 286px;
      text-align: center;
      position: relative;
      .btn {
        margin-top: 260px;
        background-color: transparent;
        font-size: $font-size-small;
        padding: $padding-btn / 2 $padding-btn;
        padding-top: $padding-btn / 2 + 2px;
        border-radius: $radius-base4;
        border: 1px solid #fff;
      }
    }
    .test {
      display: flex;
      border-top: 1px solid transparent;
      overflow: hidden;
      margin: 0 (-$padding-base);
      padding: 40px 0 60px;
      .item {
        padding-top: 20px;
        flex: 1;
        text-align: center;
        color: #fff;
        border-radius: $radius-base;
        transition: $transition;
        .iconfont {
          font-size: $font-size-ultra;
          padding: 30px;
          border-radius: 50%;
          background-color: #0ad0fe;
          background-image: linear-gradient(0deg, #09d2ff, #965aec);
          display: inline-block;
        }
        .text {
          padding: $padding-base * 3 0;
        }
        &:active {
          background: #149dee;
        }
      }
    }
  }
  .bar-wrap {
    display: flex;
    background: #fff;
    color: $color-text-title;
    font-size: $font-size-large;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .item {
      text-align: center;
      flex: 1;
      box-sizing: border-box;
      padding: $padding-base * 2 0;
      position: relative;
      color: $color-text-title;
      background-color: #fff;
      transition: $transition;
    }
    .item:after {
      content: '|';
      color: $color-text-placeholder;
      position: absolute;
      right: 0;
    }
    .item:last-child:after {
      content: '';
    }
  }
}
</style>
