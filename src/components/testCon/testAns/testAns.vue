<docs>
  ## 答题页面
  * 因为数据名称项不一致因此含有大量的转换，原则是前台的都有英文驼峰，只是在传接口的时候变化
  * 对于查询的值不予修改
  ## 数字、个数、序号均从零开始，只是在显示的时候，处理成需要的样子
</docs>
<template>
  <div class="test" :style="{minHeight: testHeight}">
    <h2 class="title">{{title}}</h2>
    <!-- 答题区域 -->
    <div class="ques-wrap">
      <question-list :type="type" :questions="questions" :options="options" :answers="answers"
      @choiceAns="saveAnswer" :now="now" ></question-list>
    </div>
    <!-- 题目选择面板 -->
    <div class="select-wrap">
      <panel-select :ques-num="quesNum" :now.sync="now" :answers="answers"
      :visible.sync="visiblePanel"></panel-select>
      <div class="btns-wrap">
        <i class="circle"></i>
        <div class="item-wrap">
          <div class="item" @click="visiblePanel = !visiblePanel">查看题库</div>
          <div class="item time">
            <p class="last-time">{{timeFormate(lastTime)}}</p>
            <p class="text">剩余时间</p>
          </div>
          <div :class="endClassName" @click="testResolve">结束测评</div>
        </div>
      </div>
    </div>
    <!-- 答题loading遮罩 -->
    <div class="loading-cover" v-show="visibleCover" ></div>
  </div>
</template>
<script>
import { timeFormate } from 'common/js/utils';
import store from '@/store/index';
import QuestionList from './questionList';
import PanelSelect from './panelSelect';

const defaultMaxTime = 1800;
/**
 * 处理返回的答案，答案的序号和num之间的转换
 * 以得到想要你的答案列表{th: '', ans: '', num: ''}
 */
const fixAnslist = (arr, queslist) => {
  const res = [];
  if (!arr) return res;
  arr.forEach(item => {
    let curNum = parseInt(item.tmbh, 10);
    if (isNaN(curNum)) {
      curNum = queslist.findIndex(e => e.th === item.tmbh);
    } else {
      curNum -= 1;
    }
    res[curNum] = {
      num: curNum,
      th: item.tmbh,
      ans: item.xzjg
    };
  });
  return res;
};

/**
 * 返回需要的题目列表
 */
const fixAnswers = (arr) => {
  const res = [];
  let num = 0;
  arr.forEach((item, index) => {
    if (index % 2 === 0) {
      res.push([item]);
    } else {
      res[num].push(item);
      num += 1;
    }
  });
  return res;
};


export default {
  name: 'testAns',
  components: { QuestionList, PanelSelect },
  data() {
    return {
      title: '',
      cpwd: '',
      wdzx: '',
      type: '',
      cppcid: '',
      quesNum: 0,
      timer: null,
      lastTime: '',
      visiblePanel: false,
      questions: [],
      options: [],
      // now 当前答案：（回显，选中），ansList now类型的对象的集合
      answers: [],
      now: 0,
      isNormalRouteGo: false,
      visibleCover: false
    };
  },
  computed: {
    testHeight() {
      return this.$store.getters.windowHeight;
    },
    endClassName() {
      let str = 'item';
      if (this.answers.length - 1 !== this.quesNum) {
        str += ' item-end';
      }
      return str;
    },
    ajaxParams() {
      return this.wdzx ? { cpwd: this.cpwd, wdzx: this.wdzx } : { cpwd: this.cpwd };
    }
  },
  methods: {
    // 获取题目信息，并初始化
    async GET_questionsAndInit() {
      const params = this.ajaxParams;
      this.cppcid && (params.cppcid = this.cppcid);
      const res = await this.$http.get('/grzycp/tmxxCx', { params });
      const resData = res.returnData;
      const type = resData.tmlx;
      const key = `tmxx${type}`;
      const data = resData[key];
      let maxtime = +resData.sysj || defaultMaxTime;
      // 赋值
      this.title = resData.cpwdmc;
      this.type = type;

      // 第一类题
      if (type === '1') {
        this.quesNum = data.quesList.length - 1;
        this.questions = data.quesList;
        this.options = data.optsList;
      } else if (type === '2') {
        this.quesNum = (data.optsList.length / 2) - 1;
        this.questions = fixAnswers(data.optsList);
        this.options = data.quesList;
      }
      // 处理返回答案
      this.answers = fixAnslist(data.sawsList, data.quesList);
      // 初始第一个值
      if (this.answers.length > 0) {
        this.now = 0;
      }
      this.lastTime = maxtime;
      // 定时器
      this.timer = setInterval(() => {
        if (maxtime > 0) {
          maxtime -= 1;
          this.lastTime = maxtime;
        } else {
          this.testTimeout();
          clearInterval(this.timer);
        }
      }, 1000);
    },
    /**
     * 单次保存答案
     * @param {String} th 题目编号
     * @param {String} ans 答案
     * @return {Promise}
     */
    POST_saveAns(th, ans) {
      // 参数拼接
      const params = Object.assign({}, this.ajaxParams);
      params.cppcid = this.cppcid;
      params.sysj = this.lastTime;
      params.tmbh = th;
      params.xzjg = ans;
      return this.$http.post('/grzycp/tmxxBc', params);
    },
    /**
     * 整体保存题目
     * @param {String} flag 标记，0未完成，1已完成，2答题超时
     * @return {Promise}
     */
    POST_test(flag) {
      const params = Object.assign({}, this.ajaxParams);
      params.cppcid = this.cppcid;
      params.sysj = this.lastTime;
      params.jsbs = flag;
      this.$loading = true;
      return this.$http.post('/grzycp/dtztBc', params).finally((res) => {
        this.$loading = false;
        return res;
      });
    },
    // 显示剩余时间
    timeFormate(time) {
      return timeFormate(time);
    },
    // 把答案保存到本地answer对象
    saveToAnswers(obj) {
      const lastNum = this.now;
      const answers = this.answers;
      // lastNum 赋值
      if (answers[lastNum]) {
        answers[lastNum].ans = obj.ans;
      } else if (answers.length === lastNum) {
        answers.push({
          th: obj.th,
          ans: obj.ans,
          num: lastNum
        });
      }
    },
    // 选择答案，异步保存
    saveAnswer(obj) {
      this.saveToAnswers(obj);
      this.visibleCover = true;
      this.POST_saveAns(obj.th, obj.ans).then(result => {
        const resData = result.returnData;
        // 成功 更新now,更新答对列表
        if (+resData.executeResult === 1) {
          this.cppcid = resData.cppcid;
          const lastNum = this.now;
          const nowNum = lastNum + 1 > this.quesNum ? lastNum : lastNum + 1;
          this.now = nowNum;
        }
        if (this.answers.length === this.quesNum + 1) {
          this.$toast('该试题已完成，请结束测评');
        }
      }).finally(() => {
        this.visibleCover = false;
      });
    },
    // 结束测评
    async testResolve() {
      if (this.answers.length - 1 !== this.quesNum) return;
      await this.$confirm('确定要结束测评？', '提示');
      const res = await this.POST_test('1');
      const resData = res.returnData;
      if (+resData.executeResult === 1) {
        this.$toast('答案提交成功！');
        this.isNormalRouteGo = true;
        this.$router.push({ name: 'testResult' });
      }
    },
    // 答题超时
    async testTimeout() {
      await this.$alert('答题时间到了，请重新选择开始');
      const res = await this.POST_test('2');
      const resData = res.returnData;
      if (+resData.executeResult === 1) {
        // 路由跳转
        this.isNormalRouteGo = true;
        this.$router.replace({ name: 'testType', query: this.ajaxParams });
      }
    }
  },
  created() {
    //  赋值
    const query = this.$route.query;
    this.cpwd = query.cpwd;
    this.wdzx = query.wdzx;
    this.cppcid = query.cppcid;
    this.GET_questionsAndInit();
  },
  // 禁止非正常的方式进入答题页面
  beforeRouteEnter (to, from, next) {
    if (store.state.canGoTestRouter) {
      store.commit('SET_TESTROUTER_CANGO', false);
      next();
      // 处理刷新时，跳转到首页
    } else if (from.path === '/') {
      next({ name: 'index' });
    } else {
      next(false);
    }
  },
  // 答题时非正常退出处理
  /* eslint-disable consistent-return */
  async beforeRouteLeave(to, from, next) {
    // 正常时，直接退出
    if (this.isNormalRouteGo) {
      next();
      // 清除定时器
      clearInterval(this.timer);
      return;
    }
    try {
      // 非正常时，弹出提示，确认异步接口
      await this.$confirm('确定要退出答题？', '提示');
      await this.POST_test('0');
      next();
      // 清除定时器
      clearInterval(this.timer);
    } catch (e) {
      next(false);
    }
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.test {
  background-color: $color-base;
  .title {
    font-size: $font-size-large + 2;
    color: #fff;
    text-align: center;
    padding: $padding-base * 2 0;
  }
  .select-wrap {
    position: absolute;
    bottom: 0;
    color: #fff;
    width: 100%;
    .btns-wrap {
      border-top: 1px solid #fff;
      position: relative;
      z-index: 8;
      .circle {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 26%;
        z-index: 1;
        background-color: $color-base;
        border: 1px solid #fff;
      }
      .item-wrap {
        display: flex;
        height: 156px;
      }
      .item {
        flex: 1;
        text-align: center;
        line-height: 156px;
        background-color: $color-base;
      }
      .item:active {
        background-color: #1e54a5;
      }
      .item.item-end {
        color: $color-alpha5;
      }
      .item.item-end:active {
        background-color: transparent;
      }
      .item.time {
        position: relative;
        z-index: 2;
        padding-top: 10px;
        line-height: 1.5;
        .last-time {
          font-size: 50px;
          position: relative;
        }

        .last-time:before,
        .last-time:after {
          position: absolute;
          top: 10px;
          content: '---';
          font-size: $font-size-base;
          color: rgba(255, 255, 255, 0.5);
        }

        .last-time:before {
          left: 0;
        }
        .last-time:after {
          right: 0;
        }
        .text {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  .loading-cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1500;
  }
}
</style>
