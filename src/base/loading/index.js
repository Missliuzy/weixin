/**
 * loading 组件
 * @author jinglf000
 * ###### Wed Apr 4 14:28:55 CST 2018
 */
import Vue from 'vue';
import Loading from './loading';

const LoadingContrustor = Vue.extend(Loading);

let instance = null;
const getInstance = () => {
  if (instance) {
    return instance;
  }
  return new LoadingContrustor({
    el: document.createElement('div')
  });
};

const defaultSetting = {
  text: '加载中...'
};

export default function loading(vm) {
  if (vm.prototype.$loading) return;
  Object.defineProperty(vm.prototype, '$loading', {
    enumerable: true,
    configurable: true,
    get() {
      return instance;
    },
    set(val) {
      if (val) {
        if (!instance) {
          instance = getInstance();
          document.body.appendChild(instance.$el);
          vm.nextTick(() => {
            instance.visible = true;
          });
        } else {
          instance.visible = true;
        }
        instance.text = defaultSetting.text;
      } else {
        instance.visible = false;
      }
    }
  });
}
