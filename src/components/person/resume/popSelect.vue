<docs>
  ## popSelect 选择框
  * type 为2时单选
  * type 为1时多选
</docs>
<template>
  <transition name="pop">
    <div class="pop" v-show="visible" @click.stop="closePop" @touchstart.stop>
      <div class="container-wrap" @click.stop>
        <div class="container ">
          <!-- 列表内容 多选-->
          <div class="weui-cells weui-cells_checkbox max_height" :style="{ maxHeight: maxHeight }"
            v-if="type === '1'">
            <label class="weui-cell weui-check__label" :for="`check__${index}`"
              v-for="(item, index) in data" :key="index">
              <div class="weui-cell__hd">
                <input type="checkbox" class="weui-check"
                  :value="item[listKey]" v-model="checkeds"
                  name="checkbox" :id="`check__${index}`" checked="checked">
                <i class="weui-icon-checked"></i>
              </div>
              <div class="weui-cell__bd">
                <slot name="text" :item="item" ></slot>
              </div>
            </label>
          </div>
          <!-- 单选 -->
          <div class="weui-cells weui-cells_radio max_height" :style="{ maxHeight: maxHeight }"
            v-if="type === '2'">
            <label :for="`radio__${index}`" class="weui-cell weui-check__label"
              v-for="(item, index) in data" :key="index">
              <div class="weui-cell_bd">
                <slot name="text" :item="item" ></slot>
              </div>
              <div class="weui-cell__ft">
                <input type="radio" class="weui-check" name="radio__radio"
                  :value="item[listKey]" v-model="checkeds"
                 :id="`radio__${index}`">
                <span class="weui-icon-checked"></span>
              </div>
            </label>
          </div>
          <!-- 列表内容 -->
          <button class="btn btn-primary btn_save" @click="saveItem">提交</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'popSelect',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    checkedList: {
      type: Array,
      default() {
        return [];
      }
    },
    listKey: String,
    type: String
  },
  watch: {
    checkedList(value) {
      this.checkeds = this.type === '2' ? value[0] : value;
    }
  },
  data() {
    return {
      checkeds: [],
      maxHeight: ''
    };
  },
  methods: {
    /* 关闭pop */
    closePop() {
      this.$emit('update:visible', false);
    },
    /* 保存项目 */
    saveItem() {
      const { data, listKey } = this;
      const list = data.filter(item => this.checkeds.indexOf(item[listKey]) > -1);
      this.$emit('pop-selected', list);
      this.closePop();
    }
  },
  created() {
    this.maxHeight = `${window.innerHeight * 0.6}px`;
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.pop {
  @include pop-cover;
  @include pop-animation(pop);
  .container-wrap {
    @include pop-wrap;
  }
  .container {
    background-color: #fff;
    font-size: $font-size-base;
    margin-top: 0;
    /* 保存 */
    .max_height {
      overflow-x: hidden;
      overflow: scroll;
    }
    .btn_save {
      width: 100%;
      border-radius: 0;
    }
  }
  .weui-cells:after {
    border-bottom: 0;
  }
}

</style>
