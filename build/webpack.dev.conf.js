'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const mulitPage = require('./mulit-page');
const vConsolePlugin = require('vconsole-webpack-plugin');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

// 配置多页的输出html文件,entries对应 key为包名value为入口文件地址
// 需要配置其他的页面只引入公共包和页面的入口包
const entries = mulitPage.getEntries('src/pages/**/*.html');
const appExcludeChunks = entries.map(item => item.moduleName);

const customerConfig = {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
        }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    // vconsole for debugger
    // new vConsolePlugin({
    //   enable: true
    // }),
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      excludeChunks: appExcludeChunks
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
};

// 添加多个入口的html文件（多个new HtmlWebpackPlugin）
const htmlPlugins = [];
for (let i = 0; i < entries.length; i += 1) {
  const cur = entries[i];
  const otherExcludeChunks = appExcludeChunks.map(
    item => (item === cur.moduleName ? 'app' : item)
  );
  const conf = {
    filename: cur.fileName,
    template: cur.path,
    inject: true,
    excludeChunks: otherExcludeChunks
  };
  htmlPlugins.push(new HtmlWebpackPlugin(conf));
  customerConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// 合并配置
const devWebpackConfig = merge(baseWebpackConfig, customerConfig);

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
