<docs>
  ## 选择面板，显示已答题，现在答题，未答题
</docs>
<template>
<transition name="panel">
  <div class="panel" v-show="visible" @click="updateVisible">
    <div class="container-wrap" @click.stop>
      <i class="iconfont icon-close" @click="updateVisible"></i>
      <div class="container">
        <ul class="clearfix item-wrap">
          <li v-for="(item, i) in answers"
            @click="choiceItem(i)"
            :key="i" class="item">
            <span :class="now === i ? 'now': 'on'">
              {{i + 1}}
            </span>
          </li>
          <li v-for="i in quesNum - answersLen"
            @click="choiceItem(answersLen + i)"
            :key="answersLen + i" class="item">
            <span :class="now === answersLen + i ? 'now': ''">
              {{answersLen + i + 1}}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'panelSelect',
  // quesNum 题目个数，now 当前序号，visible 显隐，answers 数组答案列表
  props: ['quesNum', 'now', 'visible', 'answers'],
  computed: {
    answersLen() {
      return this.answers.length - 1;
    }
  },
  methods: {
    // 显示隐藏
    updateVisible() {
      this.$emit('update:visible', false);
    },
    // 选择元素
    choiceItem(i) {
      if (i <= this.answers.length) {
        this.$emit('update:now', i);
        this.$emit('update:visible', false);
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
  .panel {
    @include pop-cover;
    z-index: 7;
    background-color: rgba(0, 0, 0, 0.4);
    &.panel-leave-to,
    &.panel-enter {
      opacity: 0;
      .container-wrap {
        transform: translate3d(0, 50px, 0);
      }
    }
    &.panel-leave-active,
    &.panel-enter-active {
      transition: $transitionFast;
      .container-wrap {
        transition: $transitionFast;
      }
    }
    .container-wrap {
      position: absolute;
      width: 100%;
      min-height: 40%;
      margin-bottom: 160px;
      bottom: 0;
      background-color: #fff;
      font-size: $font-size-large;
      box-sizing: border-box;
      padding-top: $padding-base;
      .container {
        .item-wrap {
          display: flex;
          flex-wrap: wrap;
        }
        .item {
          flex: 0 1 16.6666667%;
          text-align: center;
          padding: $padding-base 0;
          border: 1px solid transparent;
          box-sizing: border-box;
          border-radius: $radius-base;
          text-align: center;
          color: $color-text-label;
          &:active {
            background-color: rgba($color-base, 0.5);
          }
          & > span.on {
            color: $color-base;
          }
          & > span.now {
            background-color: $color-on;
            color: #fff;
          }
          & > span  {
            $conHei: 52px;
            // padding: $padding-base / 2;
            display: inline-block;
            border-radius: 50%;
            width: $conHei;
            height: $conHei;
            line-height: $conHei;
          }
        }
      }
      .icon-close {
        position: absolute;
        right: 35px;
        top: -40px;
        border: 4px solid $color-base;
        padding: $padding-base / 2;
        background-color: #fff;
        font-weight: bold;
        font-size: $font-size-large;
        border-radius: 50%;
        color: $color-base;
        &:before {
          position: relative;
          top: 1px;
        }
      }
    }
  }
</style>
