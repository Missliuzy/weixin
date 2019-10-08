<docs>
  ## picker 选择器
</docs>
<template>
<transition name="picker">
  <div class="picker" v-show="visible" @click.stop="closePicker">
    <div class="container-wrap" @click.stop>
      <!-- 内容区域 -->
      <div class="container">
        <div class="title">
          <div class="wrap" ref="wrap">
            <span v-for="(item, index) in list" @click="navClick(item)"
            :class="item[alias.id] === navValue ? 'on' : '' "
            :key="index">{{item[alias.name]}}</span>
            <span @click="navClick()" :class="'' === navValue ? 'on' : '' "
            >请选择</span>
          </div>
          <i class="iconfont icon-close" @click="closePicker"></i>
        </div>
        <ul class="list">
          <li v-for="(item, index) in data" @click="listClick(item)"
            :class="item[alias.id] === listValue ? 'on': ''"
            :key="index" >{{item[alias.name]}}</li>
        </ul>
      </div>
    </div>
  </div>
</transition>
</template>
<script>


export default {
  name: 'coPicker',
  props: {
    // 单例模式下唯一id
    codeId: String,
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    alias: {
      type: Object,
      default() {
        return {
          id: 'dmid',
          name: 'dmmc'
        };
      }
    },
  },
  data() {
    return {
      visible: false,
      lastLevel: false,
      listValue: '',
      list: [],
      navValue: '',
    };
  },
  watch: {
    visible(val) {
      // 当再次显示的时候，初始化面板
      if (val) {
        this.listValue = '';
        this.list = [];
        this.navValue = '';
        // 初始化时获取新数据
        this.$emit(`need-data${this.codeId}`);
      }
    },
    lastLevel(val) {
      if (val) {
        this.$emit(`choiced-code${this.codeId}`, this.list);
        this.closePicker();
      }
    }
  },
  methods: {
    // 关闭picker
    closePicker() {
      this.visible = false;
    },
    // 内容列表点击选择
    listClick(item) {
      // 赋值
      const { list, alias, navValue } = this;
      const keyId = alias.id;
      this.listValue = item[keyId];
      // 渲染面板内容
      if (navValue) {
        const i = list.findIndex(ele => ele[keyId] === navValue);
        list[i] = item;
        list.splice(i + 1, list.length);
      } else {
        list.push(item);
      }
      this.navValue = '';
      // 获取新数据
      this.$emit(`need-data${this.codeId}`, item[alias.id]);
      this.scrollLeftFix();
    },
    // 导航点击选择
    navClick(item = '') {
      // 赋值显示选中状态
      const { list, alias } = this;
      const keyId = alias.id;
      this.navValue = item ? item[keyId] : item;
      this.listValue = this.navValue;
      /* 查找所需的最新的数据 */
      let val;
      // 点击列表时，列表的前一个
      if (item) {
        const i = list.findIndex(ele => ele[keyId] === item[keyId]);
        val = list[i - 1];
        // 点击选择，列表的最后一个
      } else {
        val = list[list.length - 1];
      }
      const id = val ? val[keyId] : '';
      // 获取新数据
      this.$emit(`need-data${this.codeId}`, id);
    },
    // 内容过长时，滚动修正
    scrollLeftFix() {
      this.$nextTick(() => {
        // 设定一个极大的值，点击时滚动到最底
        this.$refs.wrap.scrollLeft = 99999;
      });
    }
  }
};
</script>
<style scoped lang="scss">
  @import '~common/scss/var.scss';
  .picker {
    @include pop-cover;
    @include pop-animation(picker, 0px);
    .container-wrap {
      position: absolute;
      bottom: 0;
      height: 60%;
      left: 0;
      width: 100%;
    }
    .container {
      background: #fff;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .title {
        position: relative;
        flex: 0 0 auto;
        font-size: $font-size-large;
        padding-left: $padding-base;
        padding-right: $padding-base * 4;
        border-bottom: 1px solid #f1f0f4;
        line-height: 1.5;
        .wrap {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: scroll;
          font-size: $font-size-small;
          overflow-y: hidden;
          padding: $padding-base 0;
        }
        span {
          display: inline-block;
          padding: 0 $padding-base;
          white-space: nowrap;
        }
        span.on {
          color: $color-base;
          position: relative;
        }
        span.on:after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          z-index: 1;
          height: 1px;
          background-color: $color-base;
          bottom: -$padding-base - 1px;
          left: 0;
        }
      }
      .icon-close {
        line-height: 1.5;
        position: absolute;
        right: $padding-base;
        top: $padding-base;
      }
      .list {
        flex: 1;
        overflow: scroll;
        // padding: $padding-base;
        font-size: $font-size-base;
        color: $color-text-primary;
        -webkit-overflow-scrolling: touch;
        li {
          padding: $padding-base * 1.2 $padding-base;
        }
        li:active {
          background-color: $color-touch-avtive;
        }
        li.on {
          color: $color-base;
          position: relative;
        }
        li.on:after {
          content: '\e603';
          font-family: 'iconfont';
          color: $color-base;
          position: absolute;
          right: $padding-base;
          top: $padding-base;
        }
      }
    }
  }
</style>
