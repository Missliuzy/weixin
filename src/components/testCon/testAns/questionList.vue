<docs>
  ## 问题列表
</docs>
<template>
  <div class="list">
    <!-- 1类题目 -->
    <div class="item type1" v-if="type == 1">
      <transition-group name="switch" tag="div" class="group">
        <div class="type-item" v-for="(item, index) in questions"
          v-show="index == now" :key="index">
          <span class="num">{{`${index + 1}、`}}</span>
          <span class="title">{{item.mc}}</span><span class="text">{{item.ms}}</span>
          <span class="num-tag">{{`（${index + 1} / ${ansLen}）`}}</span>
        </div>
      </transition-group>
      <div class="options-wrap" >
        <div :class="choicedClass(ele)" @click="choiceAns1(ele.th)"
          v-for="(ele, i) in options" :key="i">{{ele.ms}}</div>
      </div>
    </div>
    <!-- 2类题目 -->
    <div class="item type2" v-if="type == 2">
      <div class="type-item">
        <span class="num">{{now + 1}}</span>
        <span class="text">{{options}}</span>
        <span class="num-tag">{{`（${now + 1} / ${ansLen}）`}}</span>
      </div>
      <transition-group name="switch" tag="div" class="group options-wrap">
        <div class="item-wrap" v-for="(item, index) in questions"
          :key="index" v-show="index === now">
          <div class="item iconfont icon-circle" :class="choicedClass(ele)"
            v-for="(ele, i) in item" @click="choiceAns2(ele, index)"
            :key="i" >{{`${ele.xx} ${ele.ms}`}}</div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { fixZero } from 'common/js/utils';

export default {
  name: 'quesList',
  // now 数字，type 字符串，其他数组
  props: ['type', 'questions', 'options', 'answers', 'now'],
  computed: {
    ansLen() {
      return this.questions.length;
    }
  },
  methods: {
    // 处理 选项样式类
    choicedClass(item) {
      let str = 'item iconfont icon-circle';
      const ansObj = this.answers[this.now];
      if (ansObj && (item.xx === ansObj.ans || item.th === ansObj.ans)) {
        str += ' on';
      }
      return str;
    },
    // type1 选择答案
    choiceAns1(ans) {
      const curQues = this.questions[this.now];
      // 选择答案事件
      this.$emit('choiceAns', {
        th: curQues.th,
        ans
      });
    },
    // type2 选择答案
    choiceAns2(item, num) {
      this.$emit('choiceAns', {
        th: fixZero(num + 1),
        ans: item.xx
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
  .list {
    .switch-enter-active,
    .switch-leave-active {
      transition: $transitionFast;
    }
    .switch-enter,
    .switch-leave-to {
      opacity: 0;
      transform: translate3d(30px,0,0) scale3d(0.5,0.5,0.5);
    }
    padding: $padding-base $padding-base * 2;
    .type1 {
      .group {
        min-height: 160px;
      }
      .type-item {
        position: absolute;
        color: #fff;
        font-size: $font-size-large;
        line-height: 1.5;
        .title {
          font-weight: bold;
          margin-right: 10px;
        }
        .num-tag {
          color: $color-alpha5;
        }
      }
      // flex:
      .options-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    .type2 {
      .type-item {
        color: #fff;
        font-size: $font-size-large;
        line-height: 1.5;
        .title {
          font-weight: bold;
        }
        .num-tag {
          color: $color-alpha5;
        }
      }
      .options-wrap  {
        margin-top: 200px;
        .item-wrap {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 90%;
          box-sizing: border-box;
          min-height: 400px;
        }
      }
    }
    .options-wrap {
      .item {
        width: 100%;
        box-sizing: border-box;
        line-height: 1.5;
        padding: $padding-base * 1.5;
        background-color: #fff;
        color: $color-base;
        border-radius: 50px;
        transition: $transitionFast;
        box-shadow: 2px 2px 4px rgba(#000, 0.5);
        font-size: $font-size-base;
        margin-bottom: $margin-base * 2;
      }
      .item:before {
        margin-right: 15px;
      }
      .item.on,
      .item:active {
        color: #fff;
        background-color: $color-on;
        background: linear-gradient(90deg, $color-on, #f9de5f);
        box-shadow: 2px 2px 0px rgba(#b39e3b, 1)
      }
    }
  }
</style>
