<docs>
  ## 历史测评记录
</docs>
<template>
  <div class="result">
    <div :class="item.disabled ? 'list weui-cells weui-cells_checkbox disabled':
      'list weui-cells weui-cells_checkbox'"
      v-for="(item,index) in list" :key="index">
      <label class="weui-cell weui-check__label" :for="`abc${index}`">
        <div class="weui-cell__bd rwidth">
          <input type="checkbox" :disabled="item.disabled" class="weui-check" name="checkbox"
           :id="`abc${index}`" :value="item" v-model="selected">
          <span class="weui-icon-checked"></span>
        </div>
        <div class="weui-cell__hd lwidth">
          <p class="res_name">本次测评维度为：<span hell="dss">{{item.cpwdmc}}</span></p>
          <p class="data">{{item.djsj}}</p>
          <p class="res_pos">{{item.zf}}</p>
        </div>
      </label>
    </div>
    <button class="btn-primary btn position" @click="goAnalysis"
    :disabled="selected.length === 0">测评结果分析</button>
  </div>
</template>
<script>
import $ from '@/common/js/axios';
import { listTestMark } from 'common/js/conf';

export default {
  name: 'testResult',
  data() {
    return {
      list: [],
      selected: []
    };
  },
  watch: {
    // 动态设置禁用
    selected(selects) {
      /* eslint-disable no-param-reassign  */
      this.list.forEach(item => {
        item.disabled = false;
        selects.forEach(ele => {
          if (ele === item) return;
          const type = ele.cpwd;
          const typeSub = ele.wdzx;
          const flag =
            (type === '01' || type === '02') &&
            (item.cpwd === '03' || item.cpwd === type);
          const flagTwo =
            type === '03' &&
            (typeSub === item.wdzx || item.cpwd === '01' || item.cpwd === '02');
          if (flag || flagTwo) {
            item.disabled = true;
          }
        });
      });
    }
  },
  methods: {
    GET_results() {
      this.$loading = true;
      $.get('/grzycp/cpjgCx').then(res => {
        const data = res.returnData;
        if (+data.executeResult === 1) {
          this.list = data.cpwdlb;
          this.list.forEach(item => {
            this.$set(item, 'disabled', false);
          });
        } else {
          this.$alert('暂无历史测评结果').then(() => {
            this.$router.replace({ name: 'index' });
          });
        }
      }).finally(() => {
        this.$loading = false;
      });
    },
    // 跳转页面
    goAnalysis() {
      const cppcids = this.selected.map(item => item.cppcid).join();
      const cpwd = this.selected[0].cpwd;
      this.$router.push({
        path: '/test/matchAnalysis',
        query: { cppcids, cpwd }
      });
    }
  },
  created() {
    this.GET_results();
    this.$store.commit('SET_VISIBLE_HELP', true);
    this.$store.commit('SET_HELP_TITLE', listTestMark.title);
    this.$store.commit('SET_HELP_CONTENT', listTestMark.content);
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.result {
  margin-bottom: 100px;
}
.list {
  margin: 0 auto 30px;
  transition: $transitionFast;
  &.disabled {
    background-color: $color-disabled;
  }
}
.lwidth {
  width: 85%;
}
.rwidth {
  width: 15%;
}
.res_name {
  font-size: $font-size-base;
  color: #000;
  line-height: 60px;
  span {
    color: $color-success;
  }
}
.data {
  position: absolute;
  bottom: 20px;
  left: 75%;
  font-size: $font-size-small;
  color: $color-text-primary;
}
.res_pos {
  font-size: $font-size-small;
  color: $color-text-primary;
}
.position {
  border-radius: 0;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 5;
}
</style>
