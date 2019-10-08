/**
 * ###### Sat Nov 4 10:49:40 CST 2017
 * @name axios 基于axios的Ajax异步请求方法的封装
 * @description 核心方法基于axios，配合Elememt-ui和后台的数据返回规则统一封装异步处理
 * @author jinglf000
 * @return 返回axios的实例，需要的时候直接引用
 *
 */

import axios from 'axios';
import alert from '@/base/alert';

// axios 配置
axios.defaults.timeout = 20000; // 等待时长
// axios.defaults.headers.common['Content-type'] = 'application/x-www-form-urlencoded';// 内容类型
axios.defaults.headers['Content-type'] = 'application/json;charset=utf-8';
axios.defaults.validateStatus = function validateStatus(status) {
  return status >= 200 && status <= 300;
};
const message = function message(obj, fn) {
  /* eslint-disable no-alert */
  alert(obj, fn);
};

// 接口预处理，对接口进行处理
axios.interceptors.request.use(config => {
  /* eslint-disable */
  config.url = conf.urlPrefix + config.url;
  return config;
});

// 返回值统一拦截，业务拦截在status为200，接口调用成功了，但出现了业务错误
axios.interceptors.response.use(
  response => {
    const data = response.data;
    // 业务逻辑错误处理
    const code = parseInt(data.returnCode, 10);
    if (code !== 1) {
      switch (code) {
        // -10 校验失败
        case -10:
          message({
            type: 'warning',
            message: data.returnMsg
          });
          break;
          // -9 系统异常
        case -9:
          message({
            type: 'error',
            message: data.returnMsg
          });
          break;
          // -2 登录超时
        case -2:
          // 退出到登录页面
          window.location.href = `${conf.urlPrefix}/error.html?code=4`;
          // window.location.href = `./login.html`;
          break;
          // -1 操作失败
        case -1:
          message({
            type: 'error',
            message: data.returnMsg
          });
          break;
          // 参数含有非法字符，后台拦截器拦截
        case -11:
          message({
            type: 'warning',
            message: data.returnMsg
          });
          break;
        default:
          message({
            type: 'error',
            message: '出现了不明的错误'
          });
      }
      return Promise.reject(response);
    }

    return data;
    // error 为接口访问层面上的错误，比如404或者500等...
  },
  error => {
    // dev 环境下打印日志 'production'
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    // 统一的错误提示（for users)
    message({
      type: 'error',
      message: '服务器开小差了，请稍后再试'
    });
    return Promise.reject(error);
  }
);

export default axios;
