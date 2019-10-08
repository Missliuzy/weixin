<docs>
</docs>
<template>
  <div v-show="hasInitEvent" class="selects" @click.stop>
    <div class="search">
      <input type="text" placeholder="请输入职位关键字" v-model="gwmc">
      <button class="weui-btn weui-btn_primary" @click.prevent="getPosition(gwmc)">搜索</button>
    </div>
    <div class="position">
      <ul>
        <li v-for="(item, index) in position" :key="index" @click="choose(item.gwmc,item.gwbh)"
        :gwbh="item.gwbh">{{item.gwmc}}</li>
        <li class="no_data" v-show="!isFirst && position.length === 0">无匹配结果，请重新输入</li>
      </ul>
    </div>
    <p class="list_num" v-show="!isFirst">共{{position.length}}条结果</p>
    <!-- <div class="btn-wrap btn">
      <button class="weui-btn weui-btn_primary" @click.prevent="save" type="button">保存</button>
      <button class="weui-btn weui-btn_default" @click="backBase" type="button">返回</button>
    </div> -->
  </div>
</template>
<script>
import $ from '@/common/js/axios';

export default {
  props: {
    hasInitEvent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      position: [],
      gwmc: '',
      isFirst: true
    };
  },
  methods: {
    backBase() {
      this.$emit('update:hasInitEvent', false);
    },
    getPosition(gwmc) {
      $.get('/dmbgl/tsgwCx', { params: { gwmc, pageSize: 500 } }).then(res => {
        const data = res.returnData;
        this.position = data.tsgwxx;
        this.isFirst = false;
      });
    },
    // 点击职位获取职位名称
    choose(name, gwbh) {
      this.$emit('update:labelName', name);
      this.$emit('update:gwbh', gwbh);
      this.$emit('update:hasInitEvent', false);
    }
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.weui-label {
  @include label;
}

.selects {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 3;
  width: 100%;
  height: 100%;
}
.search {
  display: flex;
  margin: 20px 0;
  input {
    width: 60%;
    margin: 0 4% 0 6%;
    border: 1px solid #ccc;
    border-radius: 30px;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
  }
  button {
    width: 20%;
    height: 60px;
    line-height: 60px;
  }
}
.position {
  max-height: 800px;
  overflow: scroll;
  ul {
    margin-bottom: 30px;
    width: 90%;
    margin: 0 auto;
  }
  li {
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    color: $color-text-primary;
    text-align: center;
  }
  li:nth-of-type(odd) {
    background-color: rgba(#f7f7f7, 0.7);
  }
  li:nth-of-type(even) {
    background-color: rgba(#e0eee0, 0.7);
  }
}
.btn {
  width: 100%;
  display: flex;
  button {
    width: 40%;
    margin-top: 0;
  }
}
.list_num {
  text-align: center;
  font-size: $font-size-small;
  padding: $padding-base;
  color: $color-text-label;
}
</style>
