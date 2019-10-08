<docs>
  ## 测评分析
</docs>
<template>
  <div class="analysis">
    <div class="list">
      <div class="common" v-for="(item, index) in cpfxlb" :key="index">
        <div class="name clearfix">
          <p class="left zhiwei">{{item.zygz_dmmc}}</p>
          <p class="iconfont icon-info right"
           @click="messageAlert(item.ms)" v-show="cpwd == '03'"></p>
          <p class="right pipei" @click="messageAlert(item.ms)">
            匹配度：{{cpwd == '03' ? item.ms : item.ppd}}</p>
        </div>
        <div class="disapire">
          <p :class="item.visible ? 'text box_orient' : 'text over box_orient'">
            <span class="color_z ms">职位描述</span>
            <span>{{item.tmmc}}</span>
          </p>
          <!-- <p v-show="item.visible">
            <span class="color_z ms">职业工种</span>{{item.zygz_dmmc}}
          </p> -->
          <p class="color_g look"
          @click="item.visible = !item.visible">{{item.visible ? '收起' : '查看'}}</p>
        </div>
      </div>
    </div>
    <button class="btn btn-primary recommend-btn"
    :disabled="cpfxlb.length === 0" @click="recommendJob">测评岗位推荐</button>
  </div>
</template>
<script>
import $ from '@/common/js/axios';
import { helpInfo } from 'common/js/conf';

export default {
  name: 'matchAnalysis',
  data() {
    return {
      cpfxlb: [],
      cppcids: '',
      cpwd: ''
    };
  },
  methods: {
    // 查询匹配度
    search() {
      this.$loading = true;
      $.get('/grzycp/cpfxCx', {
        params: {
          cppcids: this.cppcids
        }
      })
        .then(res => {
          const data = res.returnData;
          this.cpfxlb = data.cpfxlb;
          this.cpfxlb.forEach(item => {
            this.$set(item, 'visible', false);
          });
        })
        .finally(() => {
          this.$loading = false;
        });
    },
    // 职位推荐
    recommendJob() {
      const zygzs = this.cpfxlb.map(item => item.zygz).join();
      this.$router.push({
        name: 'matchJob',
        query: { zygzs }
      });
    },
    // 显示匹配度信息
    messageAlert(ms) {
      if (this.cpwd !== '03') return;
      const arr = ms.split('');
      const msgs = arr.map(item => `${item}：${helpInfo[item]}`);
      this.$helpInfo({
        title: ms,
        msg: msgs
      });
    }
  },
  created() {
    this.cppcids = this.$route.query.cppcids;
    this.cpwd = this.$route.query.cpwd;
    this.search();
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.analysis {
  .common {
    width: 90%;
    margin: 30px auto;
    background-color: #fff;
    &:last-child {
      margin-bottom: 120px;
    }
    .name {
      min-height: 60px;
      width: 90%;
      margin: 0 auto;
      padding: 20px 0 0;
      .zhiwei {
        min-height: 60px;
        font-weight: 600;
        font-size: $font-size-base;
        color: #000;
        width: 60%;
        line-height: 1.3;
      }
      .pipei {
        font-size: $font-size-small;
        color: $color-success;
        line-height: 1.3;
      }
    }
  }
}
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.disapire {
  width: 90%;
  margin: 0 auto;
  line-height: 40px;
  padding-bottom: 30px;
  position: relative;
  .text {
    &.over {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
    }
    width: 90%;
    min-height: 76px;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off  */
    -webkit-box-orient: vertical;
    /*! autoprefixer: on  */
  }
  .color_g {
    color: $color-help;
  }
  .color_z {
    color: $color-warning;
  }
  .ms {
    margin-right: 10px;
  }
  .look {
    position: absolute;
    bottom: 30px;
    right: 0;
  }
}
.left {
  float: left;
}
.right {
  float: right;
}
.recommend-btn {
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: 100%;
  border-radius: 0;
}
.iconfont {
  font-size: $font-size-large;
  margin-left: 10px;
}
</style>
