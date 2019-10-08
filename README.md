# 职业介绍服务
* 项目负责人：王斌


### 说明：

* 全局引入了axios 做为`ajax`异步请求库，使用方法`vm.$http`(vm 为vue实例)；
* 引入了weui（微信官方样式库）样式类可以直接使用


## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 简介

vue-mobile vue 移动端模板，基于 vue-cli，并在此基础之上添加了一些公用组件、自定义配置和项目规范。构建模板的目的是为了能够快速的开发，避免重复的工作，使开发人员能够快速上手，减少加班。

## Vue-cli 自定义配置

### 1、打包的相对路径设置

```js
config/index.js assetsPublicPath: './';
build/utils.js     ExtractTextPlugin.extract({publicPath: '../../'})
```

### 2、sass 预处理、或者 less 预处理

项目中使用的预处理为 scss 语法

```shell
npm install node-sass
npm install sass-loader
```

less 预处理

```shell
npm install less
npm install less-loader
```

### 3、postcss autoprefixer 自动补全兼容性处理

```json
package.json browserslist: ['last 3 version'];
```

### 4、postcss px 自动 转换为 rem

```
npm install postcss-plugin-px2rem
.postcssrc.js  "postcss-plugin-px2rem": { rootValue: 108, minPixelValue: 2 }
```

在 postcsssrc.js 文件中添加改插件和配置 rootValue 为确定的 html 的 font-size 比例，这里的 108 是这样计算出来的，设计稿的宽度为 1080---> 1080/10 108，同样：html 元素的根 fz 为 screen.width / 10（flexible 见 6 代码确定好的）

### 5、移动端 meta 标签

```html
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="yes" name="apple-touch-fullscreen">
<meta content="telephone=no,email=no" name="format-detection">
```

### 6、使用 淘宝 flexible 实现移动端响应式布局

* 方案已放弃

> 设备像素 --- 物理像素 --- 显示屏的实际像素，由显示屏的质量决定的，css 像素 --- 逻辑像素 --- 实际书写样式对应的像素，由 IOS 或 Android 不同系统决定的 dpr 设备像素比，pc 端通常为 1，即一个逻辑像素对应一个物理像素移动端高分屏使得 dpr 有所区别，screen.width / reailwidth ,iphone5,6---dpr 2,iphone6p dpr3;iphone5 逻辑像素为：320px，6 -> 375 ，6p -> 414 历史上，移动端为了显示 pc 端网页（在移动互联网早期）layout-wiewport 被设置为 980px(iphone,其他有所差异)for 为移动端所设计的网页，需要设定 layout-viewport 出现了 meta viewport 通过设置 width=device-width 实现布局容器 layout-viewport 为设备逻辑宽度 device-width；因此有了：<meta content="viewport" name="width=device-width,initial-scale=1.0,maximum-scale=1.0">

* 使用 flexible、rem 单位、flex 实现移动端布局，并解决 1px 像素的问题

### 7、使用 babel-polyfill 实现兼容，使用 babel-runtime 编译开发代码

```js
npm install -S babel-polyfill

main.js 添加 import 'babel-polyfill'；顶部添加
```

### 8、使用 fastclick 解决移动端 click 事件 300ms 延迟问题

```
npm install -S fastclick
import fastclick from 'fastclick';
fastclick.attach(document.body);
```

### 9、使用 axios 实现接口调用

* 使用统一的拦截处理异常，详见`common/js/axios.js`

### 10、配置 alias 简化路径的书写

* 在 `build/webpack.base.conf.js ---> resolve.alias` 配置相应的路径别名
* 在 js 中使用： `import MessageCard from '@/base/messageCard/messageCard';`
* 在 css/html 中使用时： `~@import '~common/scss/variable.scss';`要加上`~`前缀
* 在配置`node_modules`中的模块时，需要在配置时添加`$`标记（用例详见 vue）

### 11、集成了 weui 样式，微信官方样式

* 集成了 weui 的 style 样式
* 具体用法见：https://github.com/Tencent/weui/wiki
* 目前 集成的 weui 的版本为 v1.1.2

## 目录划分

* 基础组件 --- base
* 业务组件 --- components
* 通用模块 --- common / scss + js + fonts + imgs
* 多页面 --- pages / filename
  * 多页面时，pages 应包含子文件夹，子文件夹下应包含：建议使用和文件夹相同的名字
  * pages/login/login.html login.js xxxx.vue
  * \*\*.html（页面模板，必有）
  * \*\*.js （项目入口文件，必有）
* 路由配置 --- router

## 使用说明

* 模板构建的为 spa 应用，而不是多页应用
* 虽然模板里面有 pages 可以配置多页，不建议在 pages 的页面里写过多的业务逻辑，应该只是简单的页面
* 如果构建的为多页的 spa 应用（多个入口），则不应该使用该模板；
* iconfont 字体图标或其他 svg 图标的使用详情可见 http://iconfont.cn/
