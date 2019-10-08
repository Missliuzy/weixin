import Vue from 'vue';
import Router from 'vue-router';
// import Message from 'components/message/message';
// import Weui from 'components/weui/weui';
import Index from 'components/index/index';

const TestType = () =>
  import(/* webpackChunkName: "module-test" */ 'components/testCon/testType/testType');
const TestAns = () =>
  import(/* webpackChunkName: "module-test" */ 'components/testCon/testAns/testAns');
const TestResult = () =>
  import(/* webpackChunkName: "module-test" */ 'components/testCon/testResult/testResult');
const MatchAnalysis = () =>
  import(/* webpackChunkName: "module-test" */ 'components/testCon/matchAnalysis/matchAnalysis');
const MatchJob = () =>
  import(/* webpackChunkName: "module-test" */ 'components/testCon/matchJob/matchJob');

const CompanyDetail = () =>
  import(/* webpackChunkName: "module-company" */ 'components/company/companyDetail/companyDetail');
const JobDetail = () =>
  import(/* webpackChunkName: "module-company" */ 'components/company/jobDetail/jobDetail');
const Search = () =>
  import(/* webpackChunkName: "module-company" */ 'components/company/search/search');

const PersonResume = () =>
  import(/* webpackChunkName: "module-person" */ 'components/person/resume/resume');

const PersonResumeList = () =>
  import(/* webpackChunkName: "module-person" */ 'components/person/resumeList/resumeList');

const PersonBaseInfo = () =>
  import(/* webpackChunkName: "module-person" */ 'components/person/baseInfo/baseInfo');

const PersonBaseInfoEdit = () =>
  import(/* webpackChunkName: "module-person" */ 'components/person/baseInfo/editBaseInfo');

const PersonJobIntentEdit = () =>
  import(/* webpackChunkName: "module-person" */ 'components/person/baseInfo/editJobIntent');

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/weui',
    //   name: 'weui',
    //   component: Weui
    // },
    // {
    //   path: '/message',
    //   name: 'message',
    //   component: Message
    // },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/test/type',
      name: 'testType',
      component: TestType,
      meta: {
        title: '个人职业测评'
      }
    },
    {
      path: '/test/ans',
      name: 'testAns',
      component: TestAns,
      meta: {
        title: '答题测评'
      }
    },
    {
      path: '/test/result',
      name: 'testResult',
      component: TestResult,
      meta: {
        title: '测评结果 '
      }
    },
    {
      path: '/test/matchAnalysis',
      name: 'matchAnalysis',
      component: MatchAnalysis,
      meta: {
        title: '匹配分析 '
      }
    },
    {
      path: '/company/companyDetail',
      name: 'companyDetail',
      component: CompanyDetail,
      meta: {
        title: '单位详情'
      }
    },
    {
      path: '/company/jobDetail',
      name: 'jobDetail',
      component: JobDetail,
      meta: {
        title: '职位详情'
      }
    },
    {
      path: '/test/matchJob',
      name: 'matchJob',
      component: MatchJob,
      meta: {
        title: '匹配分析'
      }
    },
    {
      path: '/person/resumeList',
      name: 'personResumeList',
      component: PersonResumeList,
      meta: {
        title: '个人简历'
      }
    },
    {
      path: '/person/baseInfo',
      name: 'personBaseInfo',
      component: PersonBaseInfo,
      meta: {
        title: '基本信息'
      }
    },
    {
      path: '/person/baseInfo/edit',
      name: 'personBaseInfoEdit',
      component: PersonBaseInfoEdit,
      meta: {
        title: '个人基本信息编辑'
      }
    },
    {
      path: '/person/baseInfo/jobEdit',
      name: 'PersonJobIntentEdit',
      component: PersonJobIntentEdit,
      meta: {
        title: '求职意向编辑'
      }
    },
    {
      path: '/person/resume',
      name: 'personResume',
      component: PersonResume,
      meta: {
        title: '简历详情'
      }
    },
    {
      path: '/company/search',
      name: 'search',
      component: Search,
      meta: {
        title: ' 职位搜索'
      }
    }
  ]
});
