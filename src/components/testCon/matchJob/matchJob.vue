<docs>
  ## 测评完成，匹配职位
</docs>
<template>
  <div class="match">
    <div class="level-wrap">
      <level-select :data="types" @hasChoiced="choiceType"
      :options="{children: 'gwxx', name: 'zymc', subName: 'gwmc'}"></level-select>
    </div>
    <div class="list-wrap">
      <!-- <job-card ></job-card> -->
      <job-card v-for="(item, index) in data" :job="item.gwmc" :ygxs="item.ygxs_xs"
      :data="item.gwfbsj" :money="item.xcfw" :company="item.dwmc" :zpgwid="item.zpgwid"
      :dwdjid="item.dwdjid"
      :key="index"></job-card>
    </div>
  </div>
</template>
<script>
import JobCard from 'base/job/job';
import PaginationList from 'base/paginationList/paginationList';
import LevelSelect from './levelSelect';

export default {
  name: 'matchJob',
  components: { LevelSelect, JobCard, PaginationList },
  data() {
    return {
      typeStr: '',
      types: [],
      subTypes: [],
      data: []
    };
  },
  methods: {
    // 获取推荐职位的查询条件
    GET_searchParam() {
      this.$loading = true;
      this.$http
        .get('/grcptj/pptjCx', { params: { zygzs: this.typeStr } })
        .then(result => {
          const resData = result.returnData;
          if (+resData.executeResult === 1) {
            this.types = resData.cxtjlb;
          } else {
            // 再来一个提示
            this.$alert('暂无推荐职位').then(() => {
              this.$router.push({ name: 'testResult' });
            });
          }
          this.$loading = false;
        })
        .catch(() => {
          this.$loading = false;
        });
    },
    // 获取职位列表
    GET_jobs(params) {
      this.$loading = true;
      this.$http
        .get('/grcptj/ppjgCx', { params })
        .then(result => {
          const resData = result.returnData;
          this.data = resData.zpdwlb;
        })
        .finally(() => {
          this.$loading = false;
        });
    },
    choiceType(params) {
      if (!params.zygzs) return;
      this.GET_jobs(params);
    }
  },
  created() {
    this.typeStr = this.$route.query.zygzs;
    this.GET_searchParam();
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
</style>
