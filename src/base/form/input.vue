<docs>
  ## input输入元素
</docs>
<template>
  <div :class="`weui-cell ${valid === status.REJECTED ? 'weui-cell_warn' : ''}`">
    <div class="weui-cell__hd">
      <label class="weui-label">{{label}}</label>
    </div>
    <div class="weui-cell__bd">
      <input :type="type" class="weui-input" @input="$emit('input', $event.target.value)"
        :value="value" @blur="validItem" @focus="resetValid"
        :maxlength="maxLength" :placeholder="placeholder">
    </div>
    <div class="weui-cell__ft" v-show="valid === status.REJECTED">
      <i class="weui-icon-warn"></i>
    </div>
  </div>
</template>
<script>
import { mixinValid } from 'common/mixins/mixins';

export default {
  name: 'co-input',
  props: {
    label: String,
    placeholder: String,
    maxLength: String,
    prop: String,
    rules: Object,
    type: {
      type: String,
      default: 'text'
    },
    value: String,
  },
  mixins: [mixinValid]
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.weui-label {
  @include label;
}
.weui-input {
  @include input-text;
}
</style>
