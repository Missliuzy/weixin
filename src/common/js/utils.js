/**
 * utils fn
 * @author jinglf000
 * ###### Tue Apr 3 13:58:41 CST 2018
 */

/* eslint-disable */

/**
 * timer Frame Funtion
 * @param {Function} fn 定时执行的函数
 */
export const timer = fn => {
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(fn);
  } else {
    setTimeout(fn, 16);
  }
};

/**
 * 时间显示补零，只处理两位
 * @param {Number|string} num 数字或数字字符串
 */
export const fixZero = num => {
  const a = num + '';
  return a.length === 2 ? a : `0${a}`;
}

/**
 * 时间显示格式化
 * @param {Number} time 剩余时间秒
 */
export const timeFormate = time => {
  if (!time && time !== 0) return;
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${fixZero(m)}:${fixZero(s)}`;
}
/**
 * 设置缓存
 * @param {String} name 列表名
 * @param {String} id 单个id
 * @param {String} data 对应的数据
 */
export const setCache = (name, id, data) => {
  if (!window.___cache) {
    window.___cache = {};
  } else if (!window.___cache[name]) {
    window.___cache[name] = { length: 0 };
  } else if (window.___cache[name].length > 50) {
    window.___cache[name] = { length: 0 };
  }
  const cache = window.___cache[name];
  if (id !== undefined && data !== undefined) {
    cache[id] = data;
    cache.length += 1;
  }
}

/**
 * 获取内容
 * @param {String} name 表名
 * @param {String} id id
 */
export const getCache = (name, id) => {
  let val = null;
  if (window.___cache) {
    if (window.___cache[name]) {
      val = window.___cache[name][id];
    }
  } else {
    setCache(name);
  }
  return val;
}

/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
export function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 上次执行时间点
  var previous = 0;
  if (!options) options = {};
  // 延迟执行函数
  var later = function() {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) previous = now;
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    //如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
