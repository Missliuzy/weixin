// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
// import fastclick from 'fastclick';
import Vue from 'vue';
// import 'common/weui/weui.less';
import 'common/scss/index.scss';
import $alert from 'base/alert/index';
import $toast from 'base/toast/index';
import $confirm from 'base/confirm/index';
import loading from 'base/loading/index';
import $helpInfo from 'base/helpInfo/index';
import $picker from 'base/picker/index';
import Axios from 'common/js/axios';

import App from './App';
import store from './store';
import router from './router';

// fastclick.attach(document.body);
Vue.config.productionTip = false;

// base component
Vue.prototype.$alert = $alert;
Vue.prototype.$toast = $toast;
Vue.prototype.$confirm = $confirm;
Vue.prototype.$helpInfo = $helpInfo;
Vue.prototype.$http = Axios;
Vue.prototype.$picker = $picker;
Vue.use(loading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted() {
    // for ios
    document.body.addEventListener('touchstart', () => {});
  }
});

// router.beforeEach((to, from, next) => {
//   console.log(to, from);
//   next();
// });

/**
 * 路由配置实现：document.title 由路由meta来决定
 * 帮助按钮设置，路由不为首页，bar显示
 */
router.afterEach(to => {
  // 跳转完成之后，修改document.title
  document.title = to.meta.title;
  // 默认帮助按钮不显示，需要显示在路由组件单独设置
  store.commit('SET_VISIBLE_HELP', false);
  // 首页不显示 bar
  if (to.name === 'index') {
    store.commit('SET_VISIBLE_ALL', false);
  } else {
    store.commit('SET_VISIBLE_ALL', true);
  }
});
