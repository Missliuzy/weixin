<docs>
  ## select 组件
</docs>
<template>
<div @click="$emit('click', $event)"
  :class="`weui-cell weui-cell_select weui-cell_select-after
 ${valid === status.REJECTED ? 'weui-cell_warn' : ''}`">
  <div class="weui-cell__hd">
    <label class="weui-label">{{label}}</label>
  </div>
  <div class="weui-cell__bd">
      <!-- <input :type="type" class="weui-input" @input="$emit('input', $event.target.value)"
    :value="value" @blur="validItem" @focus="resetValid"
    :maxlength="maxLength" :placeholder="placeholder"> -->
    <select class="weui-select" v-model="selectValue"
      @focus="resetValid">
      <option disabled value="">请选择</option>
      <option v-for="(item, i) in list" :key="i"
        :value="item[alias.id]">{{item[alias.name]}}</option>
    </select>
  </div>
</div>
</template>
<script>
import { mixinValid } from 'common/mixins/mixins';

export default {
  name: 'co-select',
  props: {
    label: String,
    prop: String,
    value: String,
    rules: Object,
    list: Array,
    alias: {
      type: Object,
      default() {
        return {
          id: 'dmid',
          name: 'dmmc'
        };
      }
    }
  },
  data() {
    return {
      selectValue: ''
    };
  },
  watch: {
    value(val) {
      this.selectValue = val;
    },
    selectValue(val) {
      this.$emit('input', val);
      this.$nextTick(() => {
        this.validItem();
      });
    },
    list() {
      this.$nextTick(() => {
        this.selectValue = this.value;
      });
    }
  },
  mixins: [mixinValid]
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.weui-label {
  @include label;
}
.weui-select {
  @include input-text;
}
</style>
