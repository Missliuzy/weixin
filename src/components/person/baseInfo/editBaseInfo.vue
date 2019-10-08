<docs>
  ## 编辑个人基本信息
</docs>
<template>
  <div class="wrap">
    <co-form :model="data" :rules="rules" ref="form" label="个人基本信息">
      <co-select prop="mz" label="民族" v-model="data.mz" :list="codeTable.cdg_nation"></co-select>
      <co-select prop="hjxz" label="户籍性质" v-model="data.hjxz"
        :list="codeTable.cdl_rprtype"></co-select>
      <co-select prop="rylb" label="人员类别" v-model="data.rylb"
        :list="codeTable.zyjs_d_rylb"></co-select>
      <co-select prop="zysl" label="视力（左）" v-model="data.zysl"
        :list="codeTable.zyjs_d_slb"></co-select>
      <co-select prop="yysl" label="视力（右）" v-model="data.yysl"
        :list="codeTable.zyjs_d_slb"></co-select>

      <co-level-picker label="户籍所在地" prop="hjdxzqh" v-model="data.hjdxzqh"
        :name="hjdxzqh_xs"
        table-name="cdg_regioncode"></co-level-picker>
      <co-input prop="hkszd" label="户口所在地" max-length="128"
        v-model="data.hkszd" placeholder="请输入户口所在地"></co-input>
      <co-select prop="whcd" label="文化程度" v-model="data.whcd"
        :list="codeTable.cdg_educationallevel"></co-select>

      <co-input prop="sj" label="手机号码" type="tel" max-length="11"
        v-model="data.sj" placeholder="请输入手机号码"></co-input>
      <co-input prop="email" label="邮箱" type="email"
       v-model="data.email" placeholder="请输入邮箱"></co-input>
      <co-level-picker label="居住地行政区划" prop="jzdxzqh" v-model="data.jzdxzqh"
        :name="jzdxzqh_xs"
        table-name="cdg_regioncode"></co-level-picker>
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


export default {
  name: 'editBaseInfo',
  components: { coForm, coInput, coSelect, coLevelPicker },
  data() {
    return {
      data: {
        grqzid: '',
        mz: '', // 民族
        sj: '', // 手机号
        email: '',
        hjxz: '', // 户籍性质
        rylb: '', // 人员类别
        zysl: '', // 视力（左）
        yysl: '', // 视力（右）
        hjdxzqh: '', // 户籍所在地
        hkszd: '', // 户口所在地
        whcd: '', // 文化程度
        jzdxzqh: '' // 居住地行政区划
      },
      rules: {
        mz: validator('2,"full","民族",false'), // 民族
        sj: validator('11,"sjh","手机",false'), // 手机号
        email: validator('48,email,"邮箱",true'), // 邮箱
        hjxz: validator('2,"full","户籍性质",false'), // 户籍性质
        rylb: validator('2,"full","人员类别",false'), // 人员类别
        zysl: validator('2,"full","视力（左）",false'), // 视力（左）
        yysl: validator('2,"full","视力（右）",false'), // 视力（右）
        hjdxzqh: validator('12,"full","户籍所在地（行政区划）",false'),
        hkszd: validator('128,"normal","户口所在地",false'),
        whcd: validator('2,"full","文化程度",false'), // 文化程度
        jzdxzqh: validator('12,"full","居住地行政区划（行政区划）",false'),
      },
      codeTable: {
        cdg_nation: [], // 民族
        zyjs_d_rylb: [], // 人员类别
        cdl_rprtype: [], // 户籍性质
        zyjs_d_slb: [], // 视力
        cdg_ealthstate: [], // 健康状况
        cdg_educationallevel: [], // 文化程度
      },
      hjdxzqh_xs: '',
      jzdxzqh_xs: ''
    };
  },
  methods: {
    save() {
      this.$refs.form.validate(() => {
        this.POST_save();
      });
    },
    /* 获取代码表 */
    GET_codeTable() {
      const arrTableName = Object.keys(this.codeTable);
      this.$http.get('/dmbgl/dmblbCx', {
        params: {
          table_name: arrTableName.join()
        }
      }).then((res) => {
        this.getCodeTabled = true;
        const data = res.returnData.dmblb;
        arrTableName.forEach(item => {
          this.codeTable[item] = data[item];
        });
      });
    },
    /* 保存基本信息修改 */
    POST_save() {
      this.$loading = true;
      this.$http.post('/grgl/jbxxBc', this.data).then(res => {
        const resData = res.returnData;
        this.$alert(resData.message, () => {
          const code = +resData.executeResult;
          if (code) {
            this.backBase();
          }
        });
      }).finally(() => {
        this.$loading = false;
      });
    },
    /* 返回基础信息 */
    backBase() {
      this.$router.go(-1);
    }
  },
  created() {
    // 获取代码表
    this.getCodeTabled = false;
    this.GET_codeTable();
    // 赋值
    const { data } = this.$route.params;
    if (!data) return;
    Object.keys(this.data).forEach(item => {
      this.data[item] = data[item];
    });
    // 行政区划显示
    this.hjdxzqh_xs = data.hjdxzqh_xs;
    this.jzdxzqh_xs = data.jzdxzqh_xs;
    // 隐藏home按钮
    this.$store.commit('SET_VISIBLE_ALL', false);
  },
  beforeRouteEnter(to, from, next) {
    const { data } = to.params;
    if (data) {
      next();
    } else {
      next({ name: 'personBaseInfo' });
    }
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.wrap {
  background: $color-bg;
  .btn-wrap {
    display: flex;
    .weui-btn {
      margin: $margin-base auto;
      flex: 0 1 47%;
    }
  }
}
</style>
