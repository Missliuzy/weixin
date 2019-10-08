// help title
export const helpTitle = state => state.bar.helpTitle;
// help content
export const helpContent = state => state.bar.helpContent;
// title and content
export const help = state => ({
  title: state.bar.helpTitle,
  content: state.bar.helpContent,
});


// visible all
export const visibleAll = state => state.bar.visibleAll;
// visible help
export const visibleHelp = state => state.bar.visibleHelp;

// window height 浏览器窗口的高度，
export const windowHeight = state => `${state.winHeight}px`;
// 个人编号
export const grbh = state => state.userInfo.grbh;
