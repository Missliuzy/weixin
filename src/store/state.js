const state = {
  // 应用统一帮助bar按钮
  bar: {
    visibleAll: false,
    visibleHome: true,
    visibleHelp: true,
    helpTitle: '帮助',
    helpContent: ''
  },
  // 页面高度
  winHeight: window.innerHeight,
  // 用户个人信息
  userInfo: {
    name: '',
    sfzhm: '',
    grbh: ''
  },
  // 是否可以进入测试题目页面路由
  canGoTestRouter: false
};


export default state;
