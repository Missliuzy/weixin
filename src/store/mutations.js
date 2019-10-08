import * as types from './mutation-types';

const mutations = {
  [types.SET_VISIBLE_ALL](state, flag) {
    state.bar.visibleAll = flag;
  },
  [types.SET_VISIBLE_HELP](state, flag) {
    state.bar.visibleHelp = flag;
  },
  [types.SET_HELP_TITLE](state, title) {
    state.bar.helpTitle = title;
  },
  [types.SET_HELP_CONTENT](state, content) {
    state.bar.helpContent = content;
  },
  [types.SET_USER_INFO](state, content) {
    state.userInfo = content;
  },
  [types.SET_TESTROUTER_CANGO](state, content) {
    state.canGoTestRouter = content;
  }
};

export default mutations;
