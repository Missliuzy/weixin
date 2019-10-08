<docs>
  ## 兴趣选择
</docs>
<template>
<transition name="choice">
  <div class="choice" v-show="visible">
    <div class="container-wrap" @click="visibleHandle">
      <div class="container" @click.stop>
        <h2 class="title">兴趣方向</h2>
        <div class="con-wrap">
          <div v-for="(item, index) in list" :key="index"
            :class="type === item.type ? 'item on' : 'item'"
            @click="type = item.type">
            <i :class="`iconfont ${item.iconClass}`"></i>
            <p class="text">{{item.text}}</p>
          </div>
        </div>
        <div class="wrap-btn">
          <button class="btn btn-gray" @click="btnHandle(false)">取消</button>
          <button class="btn btn-primary" :disabled="!type" @click="btnHandle(true)">确定</button>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
// 基础配置
const list = [
  {
    type: 'I1',
    iconClass: 'icon-collecte2_on',
    text: '活动喜好'
  },
  {
    type: 'I2',
    iconClass: 'icon-nengli',
    text: '能力特征'
  },
  {
    type: 'I3',
    iconClass: 'icon-job',
    text: '职业喜好'
  }
];

export default {
  name: 'choiceInterest',
  props: {
    visible: {
      type: Boolean,
      default: false
      // default: true
    }
  },
  data() {
    return {
      type: '',
      list
    };
  },
  methods: {
    // 显示隐藏
    visibleHandle() {
      this.$emit('update:visible', false);
    },
    // flag true隐藏，false显示
    btnHandle(flag) {
      if (flag) {
        this.$emit('choiceType', this.type);
      }
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style scoped lang="scss">
  @import '~common/scss/var.scss';
  @mixin on($alpha) {
    color: rgba($color-base, $alpha);
      .iconfont {
        background-color: rgba($color-base, $alpha);
        color: #fff;
      }
  }

  .choice {
    @include pop-cover;
    .container-wrap {
      @include pop-wrap;
    }
    @include pop-animation(choice);
    .container {
      z-index: 5;
      position: relative;
      max-height: 100%;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
      .title {
        font-size: $font-size-large;
        margin-top: -1px;
        color: #fff;
        text-align: center;
        padding: 20px 0 50px;
        background: #357ae1 url('~common/images/choice.jpg') center bottom no-repeat;
        background-size: 600px 60px;
      }
      .con-wrap {
        display: flex;
        margin: $margin-base 0;
        .item {
          flex: 1;
          text-align: center;
          color: $color-text-primary;
          // 选中 样式
          &.on {
            @include on(1);
          }
          // hove 样式
          &:active {
            @include on(0.6);
          }
          .text {
            padding: 20px 0;
          }
          .iconfont {
            font-size: 50px;
            padding: 10px;
            border: 1px solid $color-text-primary;
            border-color: inherit;
            border-radius: 50%;
            display: inline-block;
          }
        }
      }
      .wrap-btn {
        // border-top: 1px solid $color-text-label;
        display: flex;
        position: relative;
        bottom: -1px;
        .btn {
          flex: 1;
          border-radius: 0;
        }
      }
    }
  }
</style>
