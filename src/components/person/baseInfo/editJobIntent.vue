<docs>
  ## 编辑求职意向
</docs>
<template>
  <div class="wrap">
    <co-form :model="data" :rules="rules" ref="form" label="求职意向信息">
       <co-position label="求职岗位" v-model="data.gwmc" prop="gwmc"
      :gwbh.sync="data.gwbm"></co-position>
      <co-select prop="ygxs" label="求职形式" v-model="data.ygxs"
        :list="codeTable.zyjs_d_dwygxs"></co-select>
      <co-input prop="zdyx" v-if="yx" label="期望最低月薪" max-length="128"
        v-model="data.zdyx"></co-input>
      <co-input prop="zgyx" v-if="yx" label="期望最高月薪" type="tel" max-length="11"
        v-model="data.zgyx"></co-input>
      <co-input prop="zdsx" v-if="sx" label="期望最低时薪" max-length="128"
        v-model="data.zdsx"></co-input>
      <co-input prop="zgsx" v-if="sx" label="期望最高时薪" type="tel" max-length="11"
        v-model="data.zgsx"></co-input>

      <co-select prop="qwqyxz" label="期望企业性质" v-model="data.qwqyxz"
      :list="codeTable.cdl_orgtype"></co-select>
      <co-level-picker prop="qwdjzclx"  v-if="zclx" label="期望登记注册类型" table-name="cdg_regtype"
        v-model="data.qwdjzclx" show-type="2" :name="qwdjzclx_xs"></co-level-picker>
      <co-select v-if="qtzclx" label="其他登记注册类型" v-model="data.qtdjzclx" prop="qtdjzclx"
      :list="codeTable.cdl_orgtype_01"></co-select>

      <co-level-picker label="单位行业" prop="qwcshy" v-model="data.qwcshy"
        :name="qwcshy_xs" table-name="cdg_industry_all" show-type="2"></co-level-picker>
      <co-select label="工作地区" :list="codeTable.zyjs_d_gzdq" prop="qwjydq"
        v-model="data.qwjydq"></co-select>
      <co-input prop="qwjydd" label="工作地点" max-length="128"
        v-model="data.qwjydd"></co-input>
    </co-form>
    <div class="btn-wrap">
      <button class="weui-btn weui-btn_primary" @click.prevent="save" type="button">保存</button>
      <button class="weui-btn weui-btn_default" @click="backBase" type="button">返回</button>
    </div>
  </div>
</template>
<script>
import coForm from 'base/form/form';
import coInput from 'base/form/input';
import coSelect from 'base/form/select';
import { validator } from 'common/js/valid';
import coLevelPicker from 'base/form/levelPicker';
import coPosition from 'base/form/position';

export default {
  name: 'editJobIntent',
  components: {
    coForm,
    coInput,
    coSelect,
    coLevelPicker,
    coPosition
  },
  data() {
    return {
      data: {
        qzyxid: '', // 求职意向id
        grqzid: '', // 个人求职id
        qwqyxz: '', // 企业性质
        qwcshy: '', // 单位行业
        qwjydq: '', // 工作地区
        qwjydd: '', // 工作地点
        ygxs: '', // 求职形式
        gwmc: '', // 岗位名称
        gwbm: '', // 岗位编码
        zdyx: '', // 期望最低薪资
        zgyx: '', // 期望最高薪资
        zdsx: '', // 最低时薪
        zgsx: '', // 最高时薪
        qwdjzclx: '', // 期望登记注册类型
        qtdjzclx: '', // 其他登记注册类型
        ywcz: ''
      },
      rules: {
        gwmc: validator('64,less,岗位名称,false'), // 岗位名称
        qzyxid: validator('14,"full","求职意向id",false'), // 求职意向id
        grqzid: validator('14,"full","个人求职id",false'), // 个人求职id
        qwqyxz: validator('2,"full","企业性质",false'), // 企业性质
        qwcshy: validator('5,"full","单位行业",false'), // 单位行业
        qwjydq: validator('12,"full","工作地区",false'), // 工作地区
        qwjydd: validator('128,"full","工作地点",false'), // 工作地点
        ygxs: validator('2,"full","求职形式",false'), // 求职形式
        zdyx: validator('7,"number","最低月薪",true', (rules, value, cb) => {
          const { bjszdyx } = this;
          if (!value && !this.data.zgyx) {
            cb(new Error('最低与最高月薪不能都为空'));
          } else if (+value < bjszdyx) {
            cb(new Error(`最低月薪不能低于北京市最低工资${bjszdyx}`));
          } else {
            cb();
          }
        }), // 期望最低薪资
        zgyx: validator('7,"number","最高月薪",true', (rules, value, cb) => {
          if (!value && !this.data.zdyx) {
            cb(new Error('最低与最高月薪不能都为空'));
          } else {
            cb();
          }
        }), // 期望最高薪资
        zdsx: validator('7,"number","最低时薪",true', (rules, value, cb) => {
          if (!value && !this.data.zgsx) {
            cb(new Error('最低与最高时薪不能都为空'));
          } else {
            cb();
          }
        }), // 最低时薪
        zgsx: validator('7,"number","最高时薪",true', (rules, value, cb) => {
          if (!value && !this.data.zdsx) {
            cb(new Error('最低与最高时薪不能都为空'));
          } else {
            cb();
          }
        }), // 最高时薪
        qwdjzclx: validator('3,"full","期望登记注册类型",false'), // 期望登记注册类型
        qtdjzclx: validator('3,"full","其他登记注册类型",true'), // 其他登记注册类型
        ywcz: validator('14,"full","求职意向id",false')
      },
      codeTable: {
        zyjs_d_dwygxs: [], // 求职形式
        zyjs_d_gzdq: [], // 工作地区
        cdl_orgtype: [], // 单位性质
        // cdg_regtype: [], // 期望登记注册类型
        cdl_orgtype_01: [], // 其他登记注册类型
        cdg_industry_all: [] // 单位行业
      },
      bjszdyx: '', // 北京市最底薪资
      gzdq_xs: '',
      qwdjzclx_xs: '',
      qwcshy_xs: '',
      visible: false,
      visibleSuggestion: false,
      qtzclx: false,
      zclx: false,
      yx: true,
      sx: false
    };
  },
  watch: {
    'data.qwqyxz': function watcher(val) {
      if (val === '90') {
        this.qtzclx = true;
      } else {
        this.qtzclx = false;
      }
      if (val === '10') {
        this.zclx = true;
      } else {
        this.zclx = false;
      }
    },
    'data.ygxs': function watcher(val) {
      if (val === '40') {
        this.sx = true;
        this.yx = false;
      } else {
        this.sx = false;
        this.yx = true;
      }
    }
  },
  methods: {
    /* 获取代码表 */
    GET_codeTable() {
      const arrTableName = Object.keys(this.codeTable);
      this.$http
        .get('/dmbgl/dmblbCx', {
          params: {
            table_name: arrTableName.join()
          }
        })
        .then(res => {
          this.getCodeTabled = true;
          const data = res.returnData.dmblb;
          arrTableName.forEach(item => {
            this.codeTable[item] = data[item];
          });
        });
    },
    inputSuggestion() {
      this.visibleSuggestion = true;
    },
    backBase() {
      this.$router.go(-1);
    },
    save() {
      this.$refs.form.validate(() => {
        this.$loading = true;
        this.$http
          .post('/grgl/qzyxBc', this.data)
          .then(res => {
            const resData = res.returnData;
            this.$alert(resData.message, () => {
              const code = +resData.executeResult;
              if (code) {
                this.$router.push({ name: 'personBaseInfo' });
              }
            });
          })
          .finally(() => {
            this.$loading = false;
          });
      });
    }
  },
  created() {
    // 获取代码表
    this.getCodeTabled = false;
    this.GET_codeTable();
    // 赋值
    let { data } = this.$route.params;
    if (!data) {
      this.data.ywcz = '1';
      data = {};
    } else {
      Object.keys(this.data).forEach(item => {
        this.data[item] = data[item];
      });
      this.data.ywcz = '2';
    }
    // 行政区划显示
    this.bjszdyx = this.$route.params.bjszdyx;
    this.gzdq_xs = data.gzdq_xs;
    this.qwcshy_xs = data.qwcshy_xs;
    this.qwdjzclx_xs = data.qwdjzclx_xs;
    // this.jzdxzqh_xs = data.jzdxzqh_xs;
    // 隐藏home按钮
    this.$store.commit('SET_VISIBLE_ALL', false);
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.wrap {
  .btn-wrap {
    display: flex;
    .weui-btn {
      margin: $margin-base auto;
      flex: 0 1 47%;
    }
  }
}
</style>

