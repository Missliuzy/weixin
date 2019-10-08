<docs>
  ##
</docs>
<template>
  <div>
    <div class="position margin">
      <!-- <div class="left">
        <img src="../../../common/images/man.png" alt="">
      </div> -->
      <div class="left">
        <p class="title">{{gwxx.gwmc}}</p>
        <p>{{gwxx.xcfw}}</p>
        <p>{{gwxx.nlfw}}/{{gwxx.whcd_xs}}/{{gwxx.ygxs_xs}}</p>
      </div>
    </div>
    <div class="common margin">
      <div class="title tem_comm">
        <p><span></span>工作地址</p>
      </div>
      <div class="edu_list tem_comm">
        <p>{{gwxx.gzdq_xs}}{{gwxx.gzdd}}</p>
      </div>
    </div>
    <div class="common margin">
      <div class="title tem_comm">
        <p><span></span>职位描述</p>
      </div>
      <div class="pos_com tem_comm">
        <p><span>知识描述：</span>{{gwxx.zsms}}</p>
        <p><span>技能描述：</span>{{gwxx.jnms}}</p>
        <p><span>工作活动描述：</span>{{gwxx.gzhdms}}</p>
        <p><span>工作内容描述：</span><span v-html="gwxx.gznrms" class="span_spac"></span></p>
        <p><span>福利待遇：</span>{{gwxx.fldy}}</p>
      </div>
    </div>
    <div class="common margin message">
      <div class="title tem_comm">
        <p><span></span>公司信息</p>
      </div>
      <div class="pos_com tem_comm" >
        <p><span>公司名称：</span>{{gwxx.dwmc}}</p>
        <p><span>公司性质：</span>{{gwxx.dwxz_xs}}</p>
        <p><span>公司规模：</span>{{gwxx.qygm_xs}}</p>
      </div>
    </div>
    <div class="tdresume" @click="visibleResume = true">投递简历</div>
    <Tankuang :visible.sync="visibleResume" :jlxx="jlxx" @qrtd="toudi"></Tankuang>
  </div>
</template>
<script>
import Tankuang from 'base/jltd/jltd';
import $ from '@/common/js/axios';

export default {
  name: 'jobDetail',
  components: { Tankuang },
  data() {
    return {
      visibleResume: false,
      gwxx: {
        zpgwid: '',
        dwmc: '',
        dwxz: '',
        qygm: '',
        dwdjid: '',
        gwmc: '',
        gzdq: '',
        gzdq_xs: '',
        gzdd: '',
        ygxs_xs: '',
        xcfw: '',
        gznrms: '',
        whcd_xs: ''
      },
      jlxx: [],
      qwss: ''
    };
  },
  methods: {
    // 点击投递简历
    tdjlHandle() {
      this.tdjl = true;
    },
    // 获取招聘信息
    Search() {
      $.get('/grcptj/zpxqCx', {
        params: {
          zpgwid: this.qwss
        }
      }).then(res => {
        const data = res.returnData;
        this.gwxx = data.gwxx;
      });
    },
    // 获取简历列表
    Resume_list() {
      $.get('/grgl/jlxxCx').then(res => {
        const data = res.returnData;
        this.jlxx = data.jlxx;
      });
    },
    // 投递简历
    toudi(data) {
      this.$loading = true;
      $.post('/grgl/jltdxxBc', {
        jlid: data,
        zpgwid: this.gwxx.zpgwid
      })
        .then(res => {
          if (+res.returnCode === 1) {
            this.visibleResume = false;
            this.$alert(res.returnData.message);
          }
        })
        .finally(() => {
          this.$loading = false;
        });
    }
  },
  created() {
    this.qwss = this.$route.query.id;
    this.Search();
    this.Resume_list();
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.left {
  float: left;
  margin-left: 30px;
  img {
    width: 118px;
    height: 118px;
    vertical-align: middle;
    margin: 30px 20px 0 30px;
  }
  p {
    color: $color-text-primary;
    margin-bottom: 10px;
  }
  .title {
    color: $color-text-title;
    font-weight: bold;
    margin: 30px 0 10px;
  }
}
.right {
  float: right;
}
.margin {
  margin-bottom: 20px;
}
.position {
  height: 180px;
  background-color: #fff;
}
.common {
  min-height: 175px;
  background-color: #fff;
  .tem_comm {
    width: 90%;
    margin: 0 auto;
    p {
      font-size: $font-size-base;
    }
  }
  .title {
    height: 90px;
    line-height: 90px;
    border-bottom: 1px solid #dbdbdb;
    color: $color-text-title;
    font-weight: bold;
    span {
      width: 10px;
      height: 30px;
      border-radius: 10px;
      background-color: $color-base;
      margin-right: 10px;
      display: inline-block;
    }
  }
  .edu_list {
    line-height: 84px;
    p {
      color: $color-text-primary;
    }
  }
  .pos_com {
    line-height: 60px;
    margin: 20px auto 0;
    padding-bottom: 20px;
    span {
      font-weight: bold;
    }
    .span_spac {
      font-weight: normal;
    }
  }
}
.message {
  margin-bottom: 120px;
}
.tdresume {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: $color-base;
  color: #fff;
  position: fixed;
  bottom: 0;
}
</style>
