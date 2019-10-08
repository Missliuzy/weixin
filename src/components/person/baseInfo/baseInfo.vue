<docs>
  ## 个人基本信息
</docs>
<template>
  <div class="bg_g">
    <!-- 基本信息 -->
    <div class="common">
      <div class="touxiang tem_comm">
        <div>
          <img class="images" :src="imgSrc" alt="">
        </div>
        <!-- <p>{{jlxx.qzgwmc}}</p> -->
      </div>
      <div class="point tem_comm baseinfo">
        <i class="iconfont icon-edit" @click="editBaseInfo"></i>
        <p class="person">{{jbxx.xm}} | {{jbxx.xb_xs}} | {{jbxx.nl}} </p>
        <p class="item">
          <span class="list_l duiqi">身份证</span><span class="list_r">{{jbxx.sfzhm}}</span>
        </p>
        <p class="item">
          <span class="list_l">手机号码</span><span class="list_r">{{jbxx.sj}}</span>
        </p>
        <p class="item">
          <span class="list_l">电子邮箱</span><span class="list_r">{{jbxx.email}}</span>
        </p>
      </div>
    </div>
    <!-- 求职意向 -->
    <div class="common job_intent">
      <div class="title tem_comm">
        <p>求职意向</p>
        <i class="iconfont icon-add" @click="editJobIntent('')"></i>
      </div>
      <div class="point tem_comm" v-for="(item, index) in qzyx" :key="index">
        <div class="group">
          <i class="iconfont icon-delete" @click="deleteJobIntent(item.qzyxid, index)"></i>
          <i class="iconfont icon-edit" @click="editJobIntent(item)"></i>
        </div>
        <p class="item">
          <span class="list_l">期望职位</span><span class="list_r list_r_fix">{{item.gwmc}}</span>
        </p>
        <p class="item">
          <span class="list_l">期望行业</span><span class="list_r">{{item.qwcshy_xs}}</span>
        </p>
        <p class="item">
          <span class="list_l">期望地点</span><span class="list_r">{{item.qwjydd}}</span>
        </p>
        <p class="item">
          <span class="list_l">期望薪资</span><span class="list_r">{{item.xc}}</span>
        </p>
        <p class="item">
          <span class="list_l">工作性质</span><span class="list_r">{{item.ygxs_xs}}</span>
        </p>
      </div>
    </div>
    <!-- 工作经历开始 -->
    <div class="common">
      <div class="title tem_comm">
        <p>工作经历</p>
      </div>
      <div class="edu_list tem_comm" v-for="(item, index) in gzjl" :key="index">
        <div class="circle"></div>
        <div class="point exper">
          <p>{{item.sj}}</p>
          <p class="collage">{{item.gzgw}}</p>
          <div class="item">
            <span class="list_l">单位名称</span>
            <span class="list_r">{{item.dwmc}}</span>
          </div>
          <div class="item">
            <span class="list_l duiqi">月薪</span>
            <span class="list_r">{{item.xc}}</span>
          </div>
          <div class="item">
            <span class="list_l">工作说明</span>
            <span class="list_r">{{item.gzsm}}</span>
          </div>
          <!-- <p>单位名称{{item.dwmc}}</p>
          <p>月薪{{item.xc}}</p>
          <div class="text">工作说明{{item.gzsm}}</div> -->
        </div>
      </div>
    </div>
    <!-- 职业技能开始 -->
    <div class="common">
      <div class="title tem_comm">
        <p>职业技能</p>
      </div>
      <div class="point tem_comm" v-for="(item, index) in zyjn" :key="index">
        <div class="item">
          <span class="list_l">技能名称</span>
          <span class="list_r">{{item.yyjnbm_xs}}</span>
        </div>
        <div class="item">
          <span class="list_l">技能等级</span>
          <span class="list_r">{{item.jsdj_xs}}</span>
        </div>
      </div>
    </div>
    <!-- 语言能力开始 -->
    <div class="common">
      <div class="title tem_comm">
        <p>语言能力</p>
      </div>
      <div class="point tem_comm" v-for="(item, index) in yynl" :key="index">
        <div class="item">
          <span class="list_l">语言能力</span>
          <span class="list_r">{{item.yyjnbm_xs}}</span>
        </div>
        <div class="item">
          <span class="list_l">熟练程度</span>
          <span class="list_r">{{item.slcd_xs}}</span>
        </div>
      </div>
    </div>
    <!-- 计算机开始 -->
    <div class="common">
      <div class="title tem_comm">
        <p>计算机</p>
      </div>
      <div class="point tem_comm" v-for="(item, index) in jsj" :key="index">
        <div class="item">
          <span class="list_l list_l_width">计算机能力</span>
          <span class="list_r">{{item.yyjnbm_xs}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from '@/common/js/axios';
import editBaseInfo from './editBaseInfo';
import editJobIntent from './editJobIntent';

export default {
  name: 'personResume',
  components: { editBaseInfo, editJobIntent },
  data() {
    return {
      jbxx: {
        bjszdyx: '', // 最底薪资
        sfzhm: '',
        xm: '',
        xb_xs: '',
        whcd: '',
        email: '',
        sj: '',
        nl: ''
      },
      qzyx: [],
      gzjl: [],
      zyjn: [],
      yynl: [],
      jsj: [],
      jlxx: {
        jlmc: '',
        qzgwmc: ''
      },
      src: '',
      visibleEditBase: false,
      visibleEditQzyx: false,
      initEditBase: null,
      jobEditBase: null
    };
  },
  computed: {
    imgSrc() {
      /* eslint-disable no-undef */
      return `${conf.urlPrefix}/grgl/tpxxCx`;
    }
  },
  methods: {
    // 获取个人简历信息
    get_jbxx() {
      this.$loading = true;
      $.get('/grgl/grxqCx').then(res => {
        const data = res.returnData;
        this.jbxx = data.jbxx;
        this.initEditBase = data.jbxx;
        this.qzyx = data.qzyx;
        this.gzjl = data.gzjl;
        this.zyjn = data.zyjn;
        this.yynl = data.yynl;
        this.jsj = data.jsj;
        this.jlxx = data.jlxx;
      }).finally(() => {
        this.$loading = false;
      });
    },
    // 编辑个人基本信息
    editBaseInfo() {
      if (!this.initEditBase) return;
      this.$router.push({
        name: 'personBaseInfoEdit',
        params: { data: this.initEditBase }
      });
    },
    //  编辑或新增求职意向
    editJobIntent(item) {
      const { jbxx } = this;
      this.$router.push({
        name: 'PersonJobIntentEdit',
        params: { data: item, bjszdyx: jbxx.bjszdyx }
      });
    },
    // 删除求职意向
    async deleteJobIntent(qztx, index) {
      if (this.qzyx.length <= 1) {
        this.$alert('求职意向至少有一条');
        return;
      }
      try {
        await this.$confirm('是否删除该条求职意向？', '提示');
        const res = await this.$http.post('/grgl/qzyxBc', {
          qzyxid: qztx,
          ywcz: 0
        });
        this.$alert(res.returnData.message);
        if (res.returnData.executeResult === '1') {
          this.qzyx.splice(index, 1);
        }
      } catch (e) {
        //
      }
    }
  },
  created() {
    this.get_jbxx();
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.iconfont {
  font-size: $font-size-large;
}
.bg_g {
  background-color: $color-bg;
}
.common {
  min-height: 254px;
  margin: $padding-base;
  background-color: #fff;
  .tem_comm {
    width: 90%;
    margin: 0 auto;
    p {
      font-size: $font-size-base;
      color: #4a9fe9;
    }
  }
  .title {
    height: 96px;
    line-height: 96px;
    border-bottom: 1px solid #dbdbdb;
  }
  .touxiang {
    height: 289px;
    border-bottom: 1px solid #dbdbdb;
    div {
      width: 160px;
      margin: 0 auto;
      .images {
        width: 160px;
        height: 160px;
        display: inline-block;
        vertical-align: middle;
        margin: 34px auto;
      }
    }
    p {
      font-size: 30px;
      text-align: center;
      color: $color-text-title;
    }
  }
  .point {
    padding: 32px 0;
    border-bottom: 1px dashed #ccc;
    &:last-child {
      border-bottom: 0;
    }
    span {
      display: inline-block;
      line-height: 38px;
    }
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .list_l {
      flex: 0 1 120px;
      color: $color-text-label;
      margin-right: 20px;
    }
    .list_r_fix {
      padding-right: $padding-base * 8;
      box-sizing: border-box;
    }
    .list_l_width {
      flex: 0 1 150px;
    }
    .duiqi {
      text-align-last: justify;
      width: 120px;
    }
    .list_r {
      flex: 1 0 62%;
      width: 62%;
      color: $color-text-title;
      word-wrap: break-word;
    }
    .person {
      margin: 33px 0;
      font-size: 30px;
      color: $color-text-title;
    }
  }
  .edu_list {
    position: relative;
    border-left: 1px dashed $color-help;
    margin-left: 52px;
    margin-top: 30px;
    .exper {
      margin: 0px 0 0 58px;
      p {
        color: $color-text-label;
        line-height: 40px;
      }
      .collage {
        color: $color-text-title;
      }
      .company {
        margin: 50px 0;
      }
    }
    .circle {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background-color: $color-help;
      position: absolute;
      left: -13px;
      top: 0;
    }
  }
  .text {
    line-height: 40px;
    padding-bottom: 20px;
    color: $color-text-label;
  }
  // 基础信息
  .baseinfo {
    position: relative;
    .icon-edit {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 5;
      padding: $padding-base;
    }
  }
}
// 求职意向
.job_intent {
  .title {
    position: relative;
    .icon-add {
      position: absolute;
      right: 0;
      top: 0;
      padding: 0 $padding-base;
      z-index: 5;
    }
  }
  .tem_comm {
    position: relative;
    .group {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 5;
      .iconfont {
        display: inline-block;
        padding: $padding-base;
      }
      .icon-delete {
        color: $color-error;
      }
    }
  }
}
</style>
