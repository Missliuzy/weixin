/**
 * form 元素校验 mixin
 */

/* eslint-disable  import/prefer-default-export */

/**
 * 方法校验mixin
 * 添加了data{status,valid}
 * 添加了methods{validItem,initValid,resetValid}
 * 添加了created钩子
 */

import { status } from 'common/js/valid';

export const mixinValid = {
  data() {
    return {
      status,
      valid: status.PENDING
    };
  },
  methods: {
    // 元素校验方法
    async validItem() {
      if (!this.prop) return '';
      const val = this.value;
      const validFn = this.formEle.rules[this.prop];
      const result = await new Promise((resolve, reject) => {
        validFn('', val, c => {
          if (c) {
            reject(c.message);
            this.valid = status.REJECTED;
          } else {
            resolve();
            this.valid = status.RESOLVED;
          }
        });
      });
      return result;
    },
    // 初始化校验
    initVaild() {
      this.componentName = 'coInput';
      this.inputId = `${Date.now()}`;
      let formEle = this.$parent;
      while (formEle.componentName && formEle.componentName !== 'coForm') {
        formEle = formEle.$parent;
      }
      this.formEle = formEle;
      this.$root.$emit('co.form.addField', this);
      this.$once('hook:beforeDestroy', () => {
        this.$root.$emit('co.form.removeField', this);
      });
    },
    // 重置校验
    resetValid() {
      this.valid = status.PENDING;
    }
  },
  created() {
    this.initVaild();
  }
};
