<template id="resumeList">
  <div>
    <div class="pos_list">
      <div>
        <p>
          <router-link :to="{ name: 'jobDetail', query: {id: zpgwid}}" class="text_l job">
            {{job}}</router-link>
          <span>{{ygxs}}</span>
          <span class="money">{{money}}</span>
        </p>
        <p>
          <router-link :to="{ name: 'companyDetail', query: {id: dwdjid}}"
           v-show="company" class="text_l com">
          {{company}}</router-link>
          <span v-show="count">招聘人数：{{count}}</span>
          <span class="text_r data">{{data}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'resumeList',
  props: {
    job: {
      type: String
    },
    money: {
      type: String
    },
    company: {
      type: String
    },
    data: {
      type: String
    },
    zpgwid: {
      type: String
    },
    dwdjid: {
      type: String
    },
    count: {
      type: String
    },
    ygxs: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~common/scss/var.scss';
.pos_list {
  width: 90%;
  margin: 0 auto;
  div {
    height: 140px;
    margin: 24px auto;
    background-color: #fff;
    p {
      width: 90%;
      margin: 0 auto;
      padding-top: 28px;
      line-height: 1.2;
      display: flex;
      justify-content: space-between;
      span,
      a {
        @extend .overflow;
      }
      .job {
        color: $color-text-title;
        font-size: $font-size-base;
        flex-basis: 60%;
      }
      .money {
        color: $color-error;
        font-size: $font-size-small;
      }
      .com {
        color: $color-text-primary;
        font-size: $font-size-mini;
      }
      .data {
        color: $color-text-label;
        font-size: $font-size-mini;
        width: 240px;
        text-align: right;
      }
    }
  }
}
</style>
