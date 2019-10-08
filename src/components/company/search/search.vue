<docs>
  ##
</docs>
<template>
  <div>
    <div class="search">
      <input type="text" maxlength="64" placeholder="请输入职位、公司名称" v-model="qwss" ref="searchInput">
      <span @click="GET_search(1)">搜索</span>
    </div>
    <pagination-list @pullingDown="asyncFetch"
      :no-data="noData" class="search-result"
      :ajax-loading="ajaxLoading">
      <position v-for="(item,index) in zpxx" :key="index"
      :job="item.gwmc" :money="item.xc" :company="item.dwmc" :data="item.gwfbsj"
      :dwdjid="item.dwdjid" :zpgwid="item.zpgwid"></position>
    </pagination-list>
  </div>
</template>
<script>
import Position from 'base/job/job';
import $ from '@/common/js/axios';
import PaginationList from 'base/paginationList/paginationList';

export default {
  name: 'jobDetail',
  components: { Position, PaginationList },
  data() {
    return {
      zpxx: [],
      qwss: '',
      ajaxLoading: false,
      noData: false
    };
  },
  methods: {
    // 搜索职位
    GET_search(page = 1) {
      this.$loading = true;
      this.ajaxLoading = true;
      $.get('/grgl/zpxxSs', {
        params: {
          qwgjz: this.qwss,
          pageNum: page,
          pageSize: '10'
        }
      })
        .then(res => {
          sessionStorage.setItem('qwss', this.qwss);
          sessionStorage.setItem('page', page);
          const data = res.returnData;
          // 无查询结果
          if (+data.executeResult === 0) {
            this.noData = true;
            this.zpxx = [];
          } else {
            this.noData = false;
            // 有数据
            if (page === 1) {
              this.zpxx = data.zpxx;
            } else {
              this.zpxx = this.zpxx.concat(data.zpxx);
            }
          }
        })
        .finally(() => {
          this.ajaxLoading = false;
          this.$loading = false;
        });
    },
    // async fetach data
    asyncFetch(page) {
      this.GET_search(page);
    }
  },
  created() {
    this.qwss = this.$store.getters.qwgjz;
    this.GET_search();
  },
  mounted() {
    this.$refs.searchInput.focus();
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
$height: 109px;
.search {
  height: $height;
  line-height: $height;
  background-color: #244458;
  position: fixed;
  top: 0;
  width: 100%;
  input {
    height: 60px;
    line-height: 60px;
    width: 64%;
    padding-left: 20px;
    border-radius: 30px;
    background-color: #fff;
    margin: 3% 10% 3% 12%;
    float: left;
  }
  span {
    font-size: 30px;
    color: #fff;
  }
}
.search-result {
  margin-top: $height + 40px;
}
</style>
