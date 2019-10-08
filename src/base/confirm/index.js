/**
 * 提供了prompt的封装
 * @author jinglf000
 *
 */
import Vue from 'vue';
import confirm from './confirm';

const defaultSetting = {
  title: '确认',
  cancelBtnText: '取消',
  confirmBtnText: '确认'
};

const ConfirmConstructor = Vue.extend(confirm);
let instance;

const initInstance = () => {
  instance = new ConfirmConstructor({
    el: document.createElement('div')
  });
};

/**
 * $confirm 方法的封装
 * @param {String} content  内容
 * @param {String} title 标题
 * @param {Object} options 按钮文案 {confirmButtonText, cancelButtonText}
 * @param {String} options.confirmButtonText 确认按钮
 * @param {String} options.cancelButtonText 取消按钮
 * @return {Promise} 返回Promise
 * 注意：点击取消按钮的时候会返回，拒绝的Promise
 */
const $confirm = function confirmFn(
  content,
  title = defaultSetting.title,
  options = defaultSetting
) {
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }
    const opts = typeof options === 'object' ? options : {};
    // 传值 和默认值
    instance.title = title;
    instance.content = content;
    instance.confirmBtnText = opts.confirmBtnText
      ? opts.confirmBtnText
      : defaultSetting.confirmBtnText;
    instance.cancelBtnText = opts.cancelBtnText
      ? opts.cancelBtnText
      : defaultSetting.cancelBtnText;

    // 按钮
    instance.$on('confirm', event => {
      resolve(event);
    });
    instance.$on('cancle', event => {
      reject(event);
    });
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.visible = true;
    });
  });
};

export default $confirm;
