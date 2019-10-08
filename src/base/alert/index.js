/**
 * 提供了alert的封装
 * @author jinglf000
 * ###### Thu Mar 29 16:44:03 CST 2018
 */
import Vue from 'vue';
import alert from './alert';

const defaultSetting = {
  title: '提示',
  btnText: '我知道了'
};

const AlertConstructor = Vue.extend(alert);
let instance = {}; // 对实例进行缓存，提高性能

const initInstance = () => {
  instance = new AlertConstructor({
    el: document.createElement('div')
  });
};

/**
 * $alert 方法的封装
 * @param {Object} options 选项也可为string
 * @param {String} options.message 提示内容
 * @param {String} options.btnText 提示按钮的文字
 * @param {Function} options.cb 按钮回调，非箭头函数的情况下，
 * this为alert实例，回调参数为event事件对象。
 * @param {Function} cb 点击的回调函数
 * @return {Promise} 返回的为Promise
 */

export default function $alert(options, cb) {
  if (instance.visible) return Promise.resolve();
  if (!instance.isInstance) {
    initInstance();
  }
  let opts = {};
  if (typeof options === 'string') {
    opts.message = options;
  } else {
    opts = options;
  }
  // 默认值
  instance.btnText = opts.btnText ? opts.btnText : defaultSetting.btnText;
  instance.title = opts.title ? opts.title : defaultSetting.title;

  instance.message = opts.message;
  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  // promise 处理
  const async = new Promise(resolve => {
    instance.$on('close', event => {
      if (typeof cb === 'function') {
        cb.call(instance, event);
      }
      if (typeof opts.cb === 'function') {
        opts.cb.call(instance, event);
      }
      resolve(event);
    });
  });
  return async;
}
