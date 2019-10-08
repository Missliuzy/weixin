<docs>
  ## 简历内容
</docs>
<template>
  <div class="resume">
    <!-- 简历名称 -->
    <div class="r_item resume_name">
      <div class="title">
        <h3 v-if="data.jlmc">{{data.jlmc}}</h3>
        <h3 v-else @click="editResumeName">请填写简历名称</h3>
        <i class="iconfont icon-edit" @click="editResumeName"></i>
      </div>
    </div>
    <!-- 基本信息 不可编辑-->
    <div class="r_item base">
      <div class="title">
        <h3>基本信息</h3>
      </div>
      <div class="content">
        <div class="item item_base">
          <p class="label">{{data.jbxx.xm}}</p>
          <p class="label">{{data.jbxx.xb_xs}}</p>
          <p class="label">{{data.jbxx.nl}}</p>
        </div>
        <div class="item">
          <p class="label">身份证号码</p>
          <p class="text">{{data.jbxx.sfzhm}}</p>
        </div>
        <div class="item">
          <p class="label">手机号码</p>
          <p class="text">{{data.jbxx.sj}}</p>
        </div>
      </div>
    </div>
    <!-- 工作经历 求职意向 职业技能  计算机 语言能力 可以编辑 -->
    <!-- conf-item 为页面渲染选项配置引用自conf配置文件，data[item.datakey]为真实页面数据 -->
    <div :class="`r_item ${item.className}`" v-for="(item, index) in conf" :key="index">
      <div class="title">
        <h3>{{item.title}}</h3>
        <i class="iconfont icon-edit" @click="editResumeItem(item)"></i>
      </div>
      <div class="content">
        <transition-group tag="div" name="slide">
          <div class="list" v-for="(list, n) in data[item.dataKey]" :key="n">
            <i class="iconfont icon-delete" v-if="item.selectType !== '2'"
            @click="deleteResumeItem(item, n)"></i>
            <div class="item" v-for="(mark, m) in item.showList" :key="m">
              <p class="label">{{mark.label}}</p>
              <p class="text">{{list[mark.key]}}</p>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <!-- 其他信息 不可编辑-->
    <div class="r_item other">
      <div class="title">
        <h3>其他信息</h3>
      </div>
      <div class="content">
        <div class="item" v-for="(item, index) in other" :key="index">
          <p class="label">{{item.label}}</p>
          <p class="text">{{data.qtsx[item.key] | formate}}</p>
        </div>
      </div>
    </div>
    <!-- 简历设置 -->
    <div class="r_item setting">
      <div class="title">
        <h3>简历设置</h3>
      </div>
      <div class="content weui-cells weui-cells_form">
        <div class="item weui-cell weui-cell_switch">
          <div class="weui-cell__bd">是否公开电话</div>
          <div class="weui-cell__ft">
            <input type="checkbox" class="weui-switch"
              :true-value="'1'" :false-value="'0'" v-model="data.sfgkdh">
          </div>
        </div>
        <div class="item weui-cell weui-cell_switch">
          <div class="weui-cell__bd">是否公开简历</div>
          <div class="weui-cell__ft">
            <input type="checkbox" class="weui-switch"
              :true-value="1" :false-value="0" v-model="data.sfgkjl">
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="btn-wrap">
      <button class="weui-btn weui-btn_primary"
        @click.prevent="saveResume" type="button">保存</button>
      <button class="weui-btn weui-btn_default" @click="back" type="button">返回</button>
    </div>
    <!-- 选择框 -->
    <pop-select :visible.sync="visible" :data="list"
      @pop-selected="popSelected" :type="options.selectType"
     :list-key="showListId" :checked-list="checkedList">
      <!-- 工作经历 -->
      <template slot="text" slot-scope="props">
        <div v-if="item.dataKey === options.dataKey"
          v-for="(item, index) in conf" :key="index" class="pop_item_wrap">
          <p class="item" v-for="(list, i) in item.showList" :key="i">
            <span class="label">{{list.label}}</span>
            <span class="text">{{props.item[list.key]}}</span>
          </p>
        </div>
      </template>

      <!-- <p v-if="options.dataKey === 'gzjl'" slot="text" slot-scope="props"></p> -->
      <!-- 求职意向 -->
      <!-- <p v-else-if="options.dataKey === 'qzyx'"  slot="text" slot-scope="props"></p> -->
      <!-- 职业技能 -->
      <!-- <p v-else-if="options.dataKey === 'zyjn'"  slot="text" slot-scope="props"></p> -->
      <!-- 外语特长 -->
      <!-- <p v-else-if="options.dataKey === 'yy'"  slot="text" slot-scope="props"></p> -->
      <!-- 计算机特长 -->
      <!-- <p v-else-if="options.dataKey === 'jsj'"  slot="text" slot-scope="props"></p> -->
    </pop-select>
  </div>
</template>
<script>
import { validator } from 'common/js/valid';
import { SFGKDH, SFGKJL } from 'common/js/conf';
import popSelect from './popSelect';
import { conf, other } from './showContent';

const validResumeName = validator('64,"normal","简历名称",false');


export default {
  name: 'personResume',
  components: { popSelect },
  data() {
    return {
      conf,
      other,
      jlid: '',
      grqzid: '',
      data: {
        jlmc: '',
        jbxx: {
          xm: '',
          nl: '',
          xb_xs: '',
          sfzhm: '',
          sj: ''
        },
        gzjl: [],
        qzyx: [],
        zyjn: [],
        yy: [],
        jsj: [],
        qtsx: {
          sftk: ''
        },
        sfgkdh: '',
        sfgkjl: ''
      },
      visible: false,
      list: [],
      showListId: '',
      checkedList: [],
      options: {
        title: '',
        dataKey: '',
        selectType: ''
      },
      doType: ''
    };
  },
  filters: {
    /* 转换显示文字，1是，0否 */
    formate (value) {
      return value === '1' ? '是' : '否';
    }
  },
  methods: {
    /* 初始化页面数据 */
    initPageData({ type, jlid, grqzid }) {
      this.GET_content({ type, jlid, grqzid }).then(res => {
        const resData = res.returnData.jlxx;
        Object.keys(this.data).forEach(item => {
          this.data[item] = resData[item];
        });
        /* 新增 */
        if (type === 5) {
          // 默认公开手机和简历都为是
          this.data.sfgkdh = SFGKDH;
          this.data.sfgkjl = SFGKJL;
        }
      });
    },
    /* 异步获取内容 */
    GET_content({ type, jlid, grqzid }) {
      this.$loading = true;
      return this.$http.get('/grgl/jlxqCx', {
        params: {
          cxlx: type,
          jlid,
          grqzid
        }
      }).finally(() => {
        this.$loading = false;
      });
    },
    /* 编辑简历名 */
    editResumeName() {
      /* eslint-disable no-alert */
      const val = window.prompt();
      if (!val) return;
      validResumeName('', val, e => {
        if (e) {
          this.$toast({
            message: e.message,
            duration: 1500,
            icon: 'warning'
          });
        } else {
          this.data.jlmc = val;
        }
      });
    },
    /* 编辑简历项 */
    editResumeItem(item) {
      const { jlid, grqzid, data } = this;
      const { title, dataKey, showListId, selectType } = item;
      this.GET_content({ type: item.dataType, jlid, grqzid }).then(res => {
        const resData = res.returnData;
        if (+resData.executeResult !== 1) return;
        this.list = resData.jlxx[item.dataKey];
        if (this.list.length === 0) {
          this.$toast(`无${item.title}`);
          return;
        }

        this.visible = true;
        /* 控制如何显示内容 */
        this.checkedList = data[dataKey].map(ele => ele[showListId]);
        this.showListId = showListId;
        this.options.title = title;
        this.options.dataKey = dataKey;
        this.options.selectType = selectType;
      });
    },
    /* 删除其中一项 */
    deleteResumeItem(item, n) {
      const { dataKey } = item;
      const arr = this.data[dataKey];
      arr.splice(n, 1);
    },
    /* popSelect 选中了 */
    popSelected(list) {
      const { data, options } = this;
      data[options.dataKey] = list;
    },
    /* 保存 */
    saveResume() {
      const { data, jlid, grqzid, doType } = this;
      // 简历名称
      if (!data.jlmc) {
        this.$alert('简历名称不能为空，请添加简历名称');
        return;
      }
      // 求职意向
      if (data.qzyx.length !== 1) {
        this.$alert('求职意向不能为空，您需要选择一条求职意向');
        return;
      }
      const skills = [].concat(data.zyjn).concat(data.yy).concat(data.jsj);
      const postData = {
        jlid,
        grqzid,
        jlmc: data.jlmc,
        qzyxid: data.qzyx[0].qzyxid,
        gzjlids: data.gzjl.map(item => item.gzjlid).join(),
        grjnids: skills.map(item => item.grjnid).join(),
        ywcz: doType,
        sfgkdh: data.sfgkdh,
        sfgkjl: data.sfgkjl
      };
      this.$loading = true;
      this.$http.post('/grgl/jlsxBc', postData).then(res => {
        const resData = res.returnData;
        this.$alert(resData.message, () => {
          if (+resData.executeResult === 1) {
            this.$router.push({ name: 'personResumeList' });
          }
        });
      }).finally(() => {
        this.$loading = false;
      });
    },
    /* 返回 */
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    const { jlid, grqzid } = this.$route.query;
    /* 无id表明是新增, 有表示修改 */
    if (!jlid || !grqzid) {
      this.initPageData({ type: 5 });
      this.doType = '1';
    } else {
      this.initPageData({ type: '1', jlid, grqzid });
      this.doType = '2';
    }
    this.jlid = jlid;
    this.grqzid = grqzid;
    // 隐藏home按钮
    this.$store.commit('SET_VISIBLE_ALL', false);
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
  .resume {
    padding: $padding-base;
    .r_item {
      background-color: #fff;
      padding: $padding-base/2 $padding-base;
      margin-bottom: $margin-base;
      /* 简历名称 */
      &.resume_name {
        background-color: transparent;
        .title {
          border-bottom: none;
          line-height: 1.5;
          font-size: $font-size-larges;
          text-align: center;
          color: $color-text-title;
          // word-wrap: break-word;
          word-break: break-all;
        }
      }
      /* 基本信息 */
      &.base {
        .content .item .label {
          color: $color-text-primary;
          min-width: 0;
        }
      }
      /* 内容块标题 */
      .title {
        font-size: $font-size-large;
        display: flex;
        color: $color-base-light;
        border-bottom: $border;
        h3 {
          font-size: inherit;
          font-weight: normal;
          flex: 1;
          padding: $padding-base;
        }
        .iconfont {
          padding: $padding-base;
          font-size: inherit;
          flex: 0 0 auto;
        }
      }
      /* 内容 */
      .content {
        font-size: $font-size-base;
        line-height: 1.5;
        /* 多个列表 */
        .list {
          border-bottom: 1px dotted $color-border;
          position: relative;
          .icon-delete {
            position: absolute;
            right: 0;
            top: 0;
            padding: $padding-base;
            font-size: $font-size-large;
            color: $color-error;
          }
          & .item:nth-child(2){
            .text {
              padding-right: $padding-base * 4;
            }
          }
        }
        & .list:last-child {
          border-bottom: none;
        }
        /* 内容项 */
        .item {
          display: flex;
          padding: $padding-base;
          .label {
            flex: 0 0 auto;
            color: $color-text-label;
            padding-right: $padding-base;
            min-width: 120px;
            text-align-last: justify;
          }
          .text {
            flex: 1;
            color: $color-text-primary;
            word-break: break-all;
          }
        }
      }
    }
    .setting {
      .weui-cells {
        margin-top: -1px;
      }
    }
    .btn-wrap {
      display: flex;
      .weui-btn {
        margin: $margin-base auto;
        flex: 0 1 47%;
      }
    }
    .iconfont:active {
      background-color: $color-touch-avtive;
    }
  }
  /* popSelect 组件选择样式 */
  .pop_item_wrap {
    .item {
      display: flex;
      font-size: $font-size-small;
      .label {
        flex: 0;
        padding-right: $padding-base;
        min-width: 120px;
        text-align-last: justify;
        color: $color-text-label
      }
      .text {
        color: $color-text-primary;
      }
    }
  }
  /* 过渡动画 */
  .slide-enter-active,
  .slide-leave-active {
    transition: all ease-in-out 0.45;
  }
  .slide-enter,
  .slide-leave-to {
    opacity: 0;
    transform: translate3d(0, 25px, 0);
  }
</style>
