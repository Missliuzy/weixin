import Vue from 'vue';
import Toast from './toast';

const ToastConstructor = Vue.extend(Toast);

/** toast实例缓存 */
// 使用数组能够把多次重复点击的都缓存下来，比每次都重新生成，以空间换性能
const toastPool = [];
/** 获取实例 */
const getInstance = () => {
  if (toastPool.length > 0) {
    return toastPool.shift();
  }
  return new ToastConstructor({
    el: document.createElement('div')
  });
};
/** toast默认设置 */
const deafultSetting = {
  duration: 1200, // 默认持续时间为1200ms
  icon: '', // 默认icon为空，可选[success,fail,warning],
  position: 'middle' // 默认位置为middle，可选[middle,top,bottom]
};

/** 事件回调异常DOM */
const removeDom = e => {
  if (e) {
    e.target.parentElement.removeChild(e.target);
  }
};

ToastConstructor.prototype.close = function close() {
  this.visible = false;
  this.$el.addEventListener('transitionend', removeDom);
  clearTimeout(this._timer);
  toastPool.push(this);
};

/**
 * toast 实例方法，默认选项在toast.vue
 * @param {Object} options.message 提示消息
 * @param {Object} options.duration 时间
 * @param {Object} options.icon icon
 * @param {Object} options.position 位置[top, middle, bottom]
 */

export default function $toast(options) {
  let opts = {};
  if (typeof options === 'string') {
    opts.message = options;
  } else {
    opts = options;
  }

  const instance = getInstance();
  const duration = opts.duration ? opts.duration : deafultSetting.duration;
  /* 默认值 */
  instance.position = opts.position ? opts.position : deafultSetting.position;
  instance.icon = opts.icon ? opts.icon : deafultSetting.icon;

  instance.message = opts.message;

  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.visible = true;
    instance.$el.removeEventListener('transitionend', removeDom);
    instance._timer = setTimeout(() => {
      instance.close();
    }, duration);
  });

  return instance;
}
