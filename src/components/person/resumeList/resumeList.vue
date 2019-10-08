<template>
  <div>
    <div class="res_list" v-for="(item,index) in items" :key="index">
      <div class="group">
        <i class="iconfont icon-delete" @click="deleteResume(item)"></i>
        <i class="iconfont icon-edit" @click="editResume(item)"></i>
      </div>
      <div class="item">
        <p class="title">{{item.jlmc}}</p>
        <p class="money">
          <span>{{item.ygxs_xs}}</span>{{item.xc}}
        </p>
      </div>
      <div class="item">
        <p class="label">应聘岗位：</p>
        <p class="text">{{item.qzgwmc}}</p>
      </div>
    </div>
    <div class="res_list add iconfont icon-add"
      :disabled="items.length === maxResume" @click="addResume"></div>
  </div>
</template>
<script>
import $ from 'common/js/axios';
import { MAX_RESUME } from 'common/js/conf';

export default {
  name: 'resumeList',
  data() {
    return {
      items: [],
      maxResume: MAX_RESUME
    };
  },
  methods: {
    // 获取简历列表
    Get_resumeList() {
      $.get('/grgl/jlxxCx')
        .then(res => {
          const data = res.returnData;
          this.items = data.jlxx;
        })
        .catch(() => {});
    },
    async deleteResume(item) {
      const { jlid, grqzid } = item;
      try {
        await this.$confirm('确定要删除该条简历？', '提示');
        const res = await this.$http.post('/grgl/jlsxBc', {
          jlid, grqzid, ywcz: 0
        });
        const resData = res.returnData;
        // success
        this.$toast(resData.message);
        if (+resData.executeResult === 1) {
          this.Get_resumeList();
        }
        /* eslint-disable no-empty */
      } catch (e) {}
    },
    /* 编辑 */
    editResume(item) {
      const { jlid, grqzid } = item;
      this.$router.push({ name: 'personResume', query: { jlid, grqzid } });
    },
    /* 添加 */
    addResume() {
      const { items, maxResume } = this;
      if (items.length >= maxResume) {
        this.$toast(`简历数不能超过${maxResume}条`);
        return;
      }
      this.$router.push({ name: 'personResume' });
    }
  },
  created() {
    this.Get_resumeList();
    // 隐藏home按钮
    this.$store.commit('SET_VISIBLE_ALL', false);
  }
};
</script>

<style lang="scss" scoped>
@import '~common/scss/var.scss';
.res_list {
  width: 90%;
  padding: 20px 60px 20px 20px;
  box-sizing: border-box;
  margin: 30px auto;
  position: relative;
  background-color: #fff;
  .item {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    .title {
      flex: 0 1 60%;
      width: 60%;
      line-height: 1.2;
      word-wrap: break-word;
      font-size: $font-size-large;
      font-weight: bold;
      color: $color-text-title;
    }
    .money {
      flex: 0 1 40%;
      span {
        margin-right: 20px;
      }
    }
    .label {
      width: 26%;
      flex: 0 1 26%;
    }
    .text {
      width: 70%;
      flex: 0 1 70%;
      word-break: break-all;
      line-height: 1.3;
    }
  }
  .group {
    position: absolute;
    top: 0;
    right: 0;
    .iconfont {
      font-size: 40px;
      padding: $padding-base;
      display: block;
    }
    .icon-delete {
      color: $color-error;
    }
  }
}
.add {
  text-align: center;
  font-size: $font-size-larges;
  border: 1px solid $color-border;
}
.add[disabled] {
  color: $color-disabled;
}
.res_list:active {
  background-color: $color-touch-avtive;
}
</style>
