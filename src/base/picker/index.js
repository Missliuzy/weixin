/**
 * @author jinglf000
 * 单例模式下的picker
 */
import Vue from 'vue';
import picker from './picker';

// 构造函数 实例
const PickerConstructor = Vue.extend(picker);
let instance = {};

const initInstance = () => {
  instance = new PickerConstructor({
    el: document.createElement('div')
  });
  instance.isInstance = true;
};

/**
 * $addressPicker 地址选择器
 */
export default function $Picker() {
  /* 初始化实例 */
  if (instance.visible) return Promise.resolve();
  if (!instance.isInstance) {
    initInstance();
    /* 挂载点 */
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.visible = true;
    });
  }
  return instance;
}
