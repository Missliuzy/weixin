<docs>
  ## 基于weui的form，内置表单校验
</docs>
<template>
<div class="form">
  <div class="error_msg" v-show="errorMsg">{{errorMsg}}</div>
  <h2 v-if="label" class="title">{{label}}</h2>
  <div class="weui-cells weui-cells_form">
    <form class="form_wrap">
      <slot :rules="rules"></slot>
    </form>
  </div>
</div>
</template>
<script>
export default {
  name: 'co-form',
  props: {
    label: String,
    rules: Object,
    model: Object
  },
  data() {
    return {
      fields: [],
      errorMsg: ''
    };
  },
  watch: {
    errorMsg(val) {
      val &&
        setTimeout(() => {
          this.errorMsg = '';
        }, 1500);
    }
  },
  methods: {
    async validate(cb) {
      try {
        await Promise.all(this.fields.map(item => item.validItem()));
        typeof cb === 'function' && cb();
      } catch (e) {
        this.errorMsg = e;
        if (process.env.NODE_ENV !== 'production') {
          /* eslint-disable no-console */
          console.error(e);
        }
      }
    },
    resetForm() {
      this.fields.forEach(item => {
        item.resetValid();
      });
    }
  },
  created() {
    this.componentName = 'coForm';
    // add field to valid
    this.$root.$on('co.form.addField', field => {
      if (field) {
        this.fields.push(field);
      }
    });
    // remove
    this.$root.$on('co.form.removeField', field => {
      if (field) {
        const index = this.fields.indexOf(
          item => item.inputId === field.inputId
        );
        this.fields.splice(index, 1);
      }
    });
  },
  beforeDestroy() {
    this.$root.$off('co.form.addField');
    this.$root.$off('co.form.removeField');
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/var.scss';
.form {
  .error_msg {
    position: fixed;
    font-size: $font-size-small;
    padding: $padding-base;
    text-align: center;
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    background-color: $color-error;
    color: #fff;
    line-height: 1.2;
  }
  .title {
    font-weight: normal;
    font-size: $font-size-large;
    padding: $padding-base * 2;
  }
  .weui-cells {
    margin-top: 0;
    background-color: transparent;
    .form_wrap {
      background: #fff;
    }
  }
}
</style>

