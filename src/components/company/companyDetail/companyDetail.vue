<docs>
  ##
</docs>
<template>
  <div>
    <div class="head">
      <!-- <img src="../../../common/images/man.png" alt=""> -->
      <p>{{dwxx.dwmc}}</p>
    </div>
    <div class="tab">
      <span :class="visible==true?'tab_c':''" v-on:click="changeTab(true)">单位信息</span>
      <span :class="visible == false ? 'tab_border' : ''" v-on:click="changeTab(false)">招聘信息</span>
    </div>
    <div class="comMess" v-show="visible">
      <p><span>单位性质：</span>{{dwxx.dwxz_xs}}</p>
      <p><span>单位规模：</span>{{dwxx.qygm_xs}}</p>
      <p><span>单位行业：</span>{{dwxx.dwhy_xs}}</p>
      <p><span>单位类型：</span>{{dwxx.dwlx_xs}}</p>
      <p><span>经营地址：</span>{{dwxx.jydz}}</p>
      <p><span>主营业务：</span>{{dwxx.zyyw}}</p>
    </div>
    <div v-show="!visible">
      <position v-for="(item, index) in gwxxlb" :key="index"
      :job="item.gwmc" :money="item.xcfw" :count="item.zrs" :data="item.gwfbsj"
      :zpgwid="item.zpgwid" :dwdjid="item.dwdjid" :ygxs="item.ygxs_xs"></position>
      <div class="comMess" v-show="gwxxlb.length == 0">
        <div>该公司暂无招聘信息</div>
      </div>
    </div>
  </div>
</template>
<script>
import Position from 'base/job/job';
import $ from '@/common/js/axios';

export default {
  name: 'companyDetail',
  components: { Position },
  data() {
    return {
      visible: true,
      dwxx: {
        dwmc: '',
        dwxz_xs: '',
        qygm_xs: '',
        dwhy_xs: '',
        dwlx_xs: '',
        jydz: '',
        zyyw: '',
        dwdjid: ''
      },
      gwxxlb: [],
      qwss: ''
    };
  },
  methods: {
    changeTab(flag) {
      this.visible = flag;
    },
    // 获取单位信息
    GET_message() {
      $.get('/grcptj/zpdwxxCx', {
        params: {
          dwdjid: this.qwss
        }
      })
        .then(res => {
          const data = res.returnData;
          this.dwxx = data.dwxx;
        })
        .catch(() => {});
    },
    // 获取招聘信息
    Get_position() {
      $.get('/grcptj/zpgwxxCx', {
        params: {
          dwdjid: this.qwss
        }
      })
        .then(res => {
          const data = res.returnData;
          this.gwxxlb = data.gwxxlb;
        })
        .catch(() => {});
    }
  },
  created() {
    this.qwss = this.$route.query.id;
    this.GET_message();
    this.Get_position();
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.head {
  height: 200px;
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid $color-text-placeholder;
  p {
    width: 80%;
    font-size: $font-size-base;
    color: $color-text-title;
    font-weight: 600;
    align-self: center;
    margin: 0 auto;
    line-height: 1.2;
  }
}
.tab {
  height: 100px;
  line-height: 100px;
  background-color: #fff;
  span {
    display: inline-block;
    box-sizing: border-box;
    float: left;
    text-align: center;
    width: 50%;
    color: $color-text-title;
    font-weight: 600;
    font-size: $font-size-base;
  }
  .tab_c {
    color: $color-base;
    border-right: 1px solid $color-text-placeholder;
  }
  .tab_border {
    color: $color-base;
    border-left: 1px solid $color-text-placeholder;
  }
}
.comMess {
  width: 90%;
  min-height: 1000px;
  margin: 30px auto;
  background-color: #fff;
  p {
    line-height: 40px;
    color: $color-text-primary;
    font-size: 0.34667rem;
    margin-left: 0.53333rem;
    padding-top: 40px;
    width: 90%;
    span {
      font-weight: 700;
      color: #333;
    }
  }
  div {
    padding-top: 50%;
    font-size: $font-size-large;
    color: $color-text-title;
    text-align: center;
  }
}
</style>
