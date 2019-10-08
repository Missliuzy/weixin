<docs>
  ## 地址Picker
  * visible 决定了picker 是否显示
  * lastLevel 是否到达最后一级，visible和lastLevel相互之间是相反的关系，
  ## 用法
  * showType 展示方式，默认全部展示
  默认为1，为所有选中值拼接
  2，只显示最后一级
</docs>
<template>
  <div :class="`weui-cell weui-cell_access ${valid === status.REJECTED ? 'weui-cell_warn' : ''}`"
   @click="initPicker">
    <div class="weui-cell__hd">
      <p class="weui-label">{{label}}</p>
    </div>
    <div class="weui-cell__ft text">{{labelName || name}}</div>
    <!-- <picker :visible.sync="visible"  @need-data="GET_codeTable"
    :last-level="lastLevel" @choiced-code="choicedCode"
    :data="data"></picker> -->
  </div>
</template>
<script>
import Picker from 'base/picker/picker';
import { setCache, getCache } from 'common/js/utils';
import { mixinValid } from 'common/mixins/mixins';

export default {
  name: 'levelPicker',
  components: { Picker },
  props: {
    name: String,
    prop: String,
    tableName: String,
    label: String,
    value: String,
    showType: {
      type: String,
      default: '1'
    },
  },
  mixins: [mixinValid],
  data() {
    return {
      hasInitEvent: false,
      labelName: ''
    };
  },
  methods: {
    // 获取代码表内容
    async GET_codeTable(id = '') {
      const { tableName } = this;
      const picker = this.pickerInstance;
      picker.data = [];
      /* 从缓存获取 */
      let data = getCache(tableName, id);
      /* 缓存不存在，使用接口 */
      if (!data) {
        const res = await this.$http.get('/dmbgl/ycjdmbCx', {
          params: {
            table_name: tableName,
            dmid: id
          }
        });
        data = res.returnData.dmblb;
        setCache(tableName, id, data);
      }
      picker.data = data;
      if (data.length === 0) {
        picker.lastLevel = true;
      }
    },
    // 初始化picker
    initPicker() {
      let picker = null;
      if (!this.hasInitEvent) {
        picker = this.$picker();
        this.pickerInstance = picker;
        this.initPickEvent();
      } else {
        picker = this.pickerInstance;
      }
      picker.codeId = this.codeId;
      picker.visible = true;
      picker.lastLevel = false;
    },
    initPickEvent() {
      const picker = this.pickerInstance;
      const codeId = this.codeId;
      picker.$on(`need-data${codeId}`, this.GET_codeTable);
      picker.$on(`choiced-code${codeId}`, this.choicedCode);
      this.$once('hook:beforeDestroy', () => {
        picker.$off(`need-data${codeId}`);
        picker.$off(`choiced-code${codeId}`);
      });
      this.hasInitEvent = true;
    },
    // 最终选定了值
    choicedCode(item) {
      if (this.showType === '1') {
        this.labelName = item.map(ele => ele.dmmc).join('');
      } else if (this.showType === '2') {
        this.labelName = item[item.length - 1].dmmc;
      }
      this.$emit('input', item.pop().dmid);
      // 选定值重置校验
      this.resetValid();
    },
  },
  created() {
    this.codeId = Date.now();
  }
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
