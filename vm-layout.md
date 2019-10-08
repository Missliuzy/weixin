## vm 移动端布局方案，(2018-04-02 暂且不使用该方案)

> 1px 像素方案 ：https://www.w3cplus.com/css/fix-1px-for-retina.html
> vw 移动端适配： https://www.w3cplus.com/css/vw-for-layout.html
> 在 Vue 项目中使用 vw：https://www.w3cplus.com/mobile/vw-layout-in-vue.html

* 解决`retain`屏下的 1px 的边框的问题
* 使用`vw vh vmin vmax`单位解决移动端适配的问题
* `vw`解决方案、现有的项目组件和 weui 样式整合
* 需要在 IOS 上直接测试

weui 是怎么处理在不同设备上一直的呢？它有没有对于 1px border 的处理方案？事先构思一下还是相当重要的。

## postcss 配置

```js
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  // "plugins": {
  //   // to edit target browsers: use "browserslist" field in package.json
  //   "autoprefixer": {}
  // }
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    // 'postcss-aspect-ratio-mini': {},
    // 'postcss-write-svg': {
    //   utf8: false
    // },
    'postcss-cssnext': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750, // (Number) The width of the viewport.
      viewportHeight: 1334, // (Number) The height of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false // (Boolean) Allow px to be converted in media queries.
    },
    'postcss-viewport-units': {},
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    }
  }
};
```

## 安装扩展 for vw layout

```shell
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano --D
npm i cssnano-preset-advanced --D
```

##
