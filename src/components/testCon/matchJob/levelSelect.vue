<docs>
  ## 两级层次选择
</docs>
<template>
  <div class="level">
    <div class="one container" v-show="list.length > 0">
      <div v-for="(item, index) in list"
        @click="levelChoice(item)" :class="item.selected ? 'item on': 'item'"
        :key="index">
        <p class="text">{{item[nameKey]}}</p>
      </div>
    </div>
    <transition name="sub">
      <div class="two container" v-show="subList.length > 0">
        <div class="item" v-for="(item, index) in subList"
        @click="levelChoiceSub(item)" :class="item.selected ? 'item on': 'item'"
        :key="index">
          <p class="text">{{item[subNameKey]}}</p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'levelSelect',
  props: {
    // 数据
    data: {
      type: Array
    },
    // 配置对象，children:配置子集，name：父级显示，subName：子集显示
    options: {
      type: Object,
      default() {
        return {
          children: 'children',
          name: 'name',
          subName: 'name'
        };
      }
    },
    // 是否有全部选项
    hasAll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [],
      subList: [],
      selectEle: null
    };
  },
  computed: {
    childrenKey() {
      return this.options.children;
    },
    nameKey() {
      return this.options.name;
    },
    subNameKey() {
      return this.options.subName;
    }
  },
  watch: {
    // 实际显示的列表，只有子类存在时才显示；
    data() {
      const arr = [];
      const { children, name } = this.options;
      this.data.forEach(item => {
        if (item[children].length > 0) {
          arr.push(item);
          this.$set(item, 'selected', false);
        }
      });
      if (this.hasAll) {
        arr.unshift({
          [name]: '全部',
          isAll: true,
          selected: true
        });
        this.selectEle = arr[0];
      }
      this.list = arr;
    },
    selectEle(val) {
      const params = {
        zygzs: ''
      };
      // 全部
      params.zygzs = val.zygz;
      if (val.isAll) {
        params.zygzs = this.list.map(ele => ele.zygz).join();
      }
      // 子类
      if (val.gwbm) {
        params.zygzs = val.zygz;
        params.gwbms = val.gwbm;
      }

      this.$emit('hasChoiced', params);
    }
  },
  methods: {
    /**
     * 第一级选中
     */
    levelChoice(item) {
      /* eslint-disable no-param-reassign */
      this.selectEle.selected = false;
      this.list.forEach(ele => { ele.selected = false; });
      item.selected = true;
      if (!item.isAll) {
        this.subList = item[this.childrenKey];
        this.subList.forEach(ele => {
          if (ele.selected === undefined) {
            this.$set(ele, 'selected', false);
          }
        });
      }
      this.selectEle = item;
    },
    /**
     * 第二级选中
     */
    levelChoiceSub(item) {
      this.subList.forEach(ele => { ele.selected = false; });
      item.selected = true;
      this.selectEle = item;
      this.$emit('hasChoiced', {
        zygzs: item.zygz,
        gwbms: item.gwbm
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.level {
  .container {
    padding: $padding-base 0;
    $fh: 48px;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    font-size: $font-size-small;
    .item {
      flex: 0 1 auto;
      text-align: center;
      padding: 10px;
      .text {
        padding: 0 15px;
        height: $fh;
        line-height: $fh + 3px;
      }
      &:active,
      &.on {
        .text {
          color: $color-base;
          background-color: #e1ebfa;
          border-radius: $fh;
        }
      }
    }
  }
  .two {
    padding-top: 0;
    border-top: 1px solid $color-text-placeholder;
    // position: absolute;
    // width: 100%;
    max-height: 210px;
    overflow: scroll;
    .item {
      &:active,
      &.on {
        .text {
          color: $color-base;
          background: #fff;
          border-radius: 0;
          box-sizing: border-box;
          border-bottom: 1px solid $color-base;
        }
      }
    }
    box-shadow: 0 2px 2px $color-alpha5;
  }
  .sub-enter {
    transform: translate3d(0, -30px, 0);
  }
  .sub-enter-active {
    transition: $transitionFast;
  }
  .sub-leave-to {
    opacity: 0;
  }
  .sub-leave-active {
    transition: $transition;
  }
}
</style>
