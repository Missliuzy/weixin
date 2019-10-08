/**
 * ###### Mon Jul 10 11:31:32 CST 2017
 * @name valid 在Vue和Element ui 封装的自定义校验规则
 * @description Vue Element UI 整合的自定义校验，前后台统一配置，故采用约定好的校验名称和正则
 * @author jinglf000
 * @returns undefined
 */

// import { checkCard } from './checkCard';

/**
 * 校验规则
 */
export const status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

// 正则
/* eslint-disable no-useless-escape */
const rules = {
  full: /^[^\[\]:?\"{}`=^&!*|;$%@'<>()+\r\n,\\../ ]*$/,
  normal: /^[^|;$%'<>`()+\r\n,\\../ *]*$/,
  less: /^[^|$'<>`\\/*]*$/,
  least: /^[^|$'<>`]*$/,
  bz: /^[^|$%'<>`]*$/,
  username: /^[a-zA-Z][\w-]{7,15}$/,
  sfzhm: /(^\d{15}$)|(^\d{17}(\d|X|x)$)/,
  yb: /^[0-9]{6}$/,
  sjh: /^1\d{10}$/,
  email: /^[-\w]?\w+([-+.]\w+)*[-\w]?@[-\w]?\w+([-.]\w+)*[-\w]?\.[-\w]?\w+([-.]\w+)*[-\w]?$/,
  lxdh: /^(((\d{3,4}-)|\d{3.4}-)?\d{7,8}),((\d{3,4}-)|\d{3.4}-)?\d{7,8}|((\d{3,4}-)|\d{3.4}-)?\d{7,8}$/,
  url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\\])*$/, // 网址
  englist: /^[A-Za-z]+$/,
  chinese: /^[Α-￥]+$/,
  qq: /^[1-9]\d{4,}$/,
  number: /^\d+$/, // 正整数 包含0
  num: /^[1-9]\d*$/,
  integer: /^[-\+]?\d+$/,
  double: /^[-\+]?\d+(\.\d+)?$/, // 浮点数（正和负）
  posdouble: /^\d+(\.\d+)?$/, // 正浮点数 （包含0）
  zzjgdm: /^[a-zA-Z0-9-]{0,18}$/,
  fzwh: /^[\u4e00-\u9fa5\d]*[\【\（\(\〔\[]\d{4}[\]\】\）\〕\)\]][\u4e00-\u9fa5\d]+$/, // 发文字号
  ip: /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/,
  /* eslint-disable no-control-regex */
  szjzf: /[^\x00-\xff]/,
  chinaChart: /[^\x00-\xff]/g,
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,48}$/,
  zkzhgz: /^[1-9][0-9]{3,5}$/
};
// 内置提示信息
const messages = {
  full: '含有非法字符',
  normal: '含有非法字符',
  less: '含有非法字符',
  englist: '只能输入英文',
  chinese: '只能输入中文'
};
// 扩展提示信息
const messageExtend = {
  full: /[\[\]:?\"{}`=^&!*|;$%@'<>()+\r\n,\\../ ]/,
  normal: /[|;$%'<>`()+\r\n,\\../ *]/,
  less: /[|$'<>`\\/*]/
};
// 特定的几个字符：空格，引号，校验的字符规则
const space = /\s/g;
const dot = /['"]/g;
const optRule = /^\d+,([\w\W]+,){2}((true)|(false))$/;


/*

* @param {string} option 128，"less","单位名称",true
* @param {Object} obj
*/
/**
 * @desc 基于Element UI form 组件封装的校验规则
 * @param {String} option '128，"less","单位名称",true'
 * @param {Function} sync 异步校验方法，或者可以在原有方法基础之上在次校验，
 * 输出参数为 rule, value, callback
 * @returns undefined
 */
function validFn(option, sync) {
  const optStr = option.replace(space, '');
  if (!optRule.test(optStr)) {
    /* eslint-disable no-console */
    console.error('【校验规则使用错误】---正确的规则为：“128，"full","单位名称",true”');
    console.info(`当前输入的规则为：${option}`);
    return false;
  }
  const optArr = optStr.split(',');
  let [maxlen, check, info, required] = optArr;
  maxlen = parseInt(optArr[0], 10);
  check = optArr[1].replace(dot, '');
  info = optArr[2].replace(dot, '');
  required = optArr[3] === 'true';

  if (!rules[check]) {
    console.error(`【校验项错误】---valid.js中无“${check}”这一项校验规则，请修改`);
    return false;
  }

  /* eslint-disable consistent-return */
  return (rule, val, callback) => {
    let value = val;
    if (typeof value === 'number') {
      value = value.toString();
    }
    // 是否为空判断，false
    if (!required && !value) {
      return callback(new Error(`${info}不能为空`));
    }
    // true可以为空
    // if (required && !value) {
    //   return callback();
    // }
    // 拦截器非法字段[--]
    if (value.indexOf('--') !== -1) {
      return callback(new Error('包含非法字符[--]'));
    }
    // 长度判断
    const regChinese = /([\u0391-\uFFE5])/ig;
    const length = value.replace(regChinese, '--').length;
    if (length > optArr[0]) {
      return callback(new Error(`${info}长度不能超过${maxlen}个字符`));
    }
    // 身份证号格式判断
    // if (check === 'sfzhm' && !checkCard(value)) {
    // return callback(new Error(`${info}格式不正确`));
    // }
    // 通用的校验规则
    if (value && !rules[check].test(value)) {
      if (messages[check]) {
        let msg;
        if (check === 'full' || check === 'normal' || check === 'less') {
          msg = value.match(messageExtend[check]);
          msg = msg ? `:${msg[0]}` : '';
          if (msg === ': ') {
            msg = ':空格';
          } else if (msg === ':\n' || msg === ':\r\n') {
            msg = ':回车';
          }
        }
        callback(new Error(messages[check] + msg));
      } else {
        callback(new Error(`${info}格式不正确`));
      }
    } else if (typeof sync === 'function') {
      // 额外的校验规则
      sync.call(null, rule, value, callback);
    } else {
      callback();
    }
  };
}

// 默认输出
// export default validFn;
// // 输入方法的别名
/* eslint-disable */
export {
  validFn as validator
};
