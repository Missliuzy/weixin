<docs>
</docs>
<template>
  <div :class="`weui-cell weui-cell_access ${valid === status.REJECTED ? 'weui-cell_warn' : ''}`"
   @click="initPicker">
    <div class="weui-cell__hd">
      <p class="weui-label">{{label}}</p>
    </div>
    <div class="weui-cell__ft text">{{labelName || value}}</div>
    <input-suggestion :hasInitEvent.sync="hasInitEvent"
     @update:labelName="updateLabelName" :gwbh.sync="gwbm"></input-suggestion>
  </div>
</template>
<script>
import inputSuggestion from 'base/form/inputSuggestion';
import { mixinValid } from 'common/mixins/mixins';

export default {
  name: 'position',
  components: { inputSuggestion },
  props: {
    gwmc: String,
    prop: String,
    tableName: String,
    label: String,
    value: String
  },
  mixins: [mixinValid],
  data() {
    return {
      hasInitEvent: false,
      labelName: '',
      gwbm: ''
    };
  },
  methods: {
    updateLabelName(val) {
      this.labelName = val;
    },
    initPicker() {
      this.hasInitEvent = true;
    }
  },
  watch: {
    labelName(val) {
      if (this.labelName) {
        this.resetValid();
        this.$emit('input', val);
      }
    },
    gwbm(val) {
      if (this.gwbm) {
        this.$emit('update:gwbh', val);
      }
    }
  },
  created() {}
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.weui-label {
  @include label;
}
.text {
  text-align: left;
  flex: 1 1 auto;
  line-height: 1.2;
  color: #000;
  font-size: inherit;
  @include input-text;
}
</style>
