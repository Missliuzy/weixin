// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
// import 'common/weui/weui.less';
import 'common/scss/index.scss';
import $alert from '@/base/alert/index';
import $toast from '@/base/toast/index';
import $confirm from '@/base/confirm/index';
import loading from '@/base/loading/index';

import Error from './error.vue';

fastclick.attach(document.body);
Vue.config.productionTip = false;

// base component
Vue.prototype.$alert = $alert;
Vue.prototype.$toast = $toast;
Vue.prototype.$confirm = $confirm;
Vue.use(loading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Error },
  template: '<Error/>'
});
