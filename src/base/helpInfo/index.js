import Vue from 'vue';
import HelpInfo from './helpInfo';

const HelpConstructor = Vue.extend(HelpInfo);

let instance = null;

/**
 * 获取实例
 */
const getInstance = () => new HelpConstructor({
  el: document.createElement('div')
});


/**
 * 帮助页面选项配置
 * @param {Object} opt 选项配置
 * @param {String} opt.title 标题
 * @param {String|Array} opt.msg 内容
 */
export default function $helpInfo(opt) {
  let opts = {};
  if (typeof opts === 'string') {
    opts.msg = opt;
  } else {
    opts = opt;
  }
  opts.msg = typeof opts.msg === 'string' ? [opts.msg] : opts.msg;
  if (!instance) {
    instance = getInstance();
    document.body.appendChild(instance.$el);
  }
  instance.title = opts.title || '提示信息';
  instance.msg = opts.msg;
  // instance.visible = false;

  Vue.nextTick(() => {
    // show
    instance.visible = true;
  });
  return instance;
}
