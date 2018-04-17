# react_ultimate_framework
##### 自己配置的前端基于react技术栈，后端使用koa2的web项目工程

## 前言
用react开发了不少项目，大多数是客户端渲染。
当涉及到资讯类，官网类的网站时，为了优化seo，必须使用react服务器渲染。
于是查阅不少资料，总结一套自己觉得还不错的框架。
说是框架，其实就是一堆配置的集合。


## 特点
1. 前后端分离,nodejs做中间层
2. 支持webpack多页面多入口配置
3. 支持react 服务器渲染，包含集成redux的SPA页面服务器渲染
4. hot reload。修改客户端代码，浏览器自动刷新；修改服务器代码，自动reload。如果页面用到服务器渲染，修改前后端共用模块，将同时热更新
5. 使用postCss，可扩展使用sass
4. 集成了ant-design UI，可以选择不用
6. 所有的依赖均已经升级到最新版本(😅尴尬，这里webpack是3的版本，最新已经到4)

## 目录结构

## 客户端配置
客户端配置很常见，主要是webpack配置，一个用于开发环境`webpack_client_dev.config.js`，一个用于生产环境`webpack_client_production.config.js`，支持webpack多页面配置，
把入口entry和生成html文件的html-webpack-plugin配置提取到`webpack.common.config.js`。

这里也把babel的配置都集中到`babel.config.js`，因为服务器端也需要用到，下面会讲到。

## 服务器端配置（关键）
web服务器采用了koa2框架。

如果不需要服务器渲染，node中间层，只用作webpack打包，一般使用两个中间件`webpack-dev-middleware`
和`webpack-hot-middleware`,一个用于在服务器端打包，一个支持hot reload特性

配置如下
``` javascript
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');

var compiler = webpack(webpackDevConfig);

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));
```

当涉及到服务器端渲染。会遇到一系列问题

1. 服务器同样需要客户端的组件，调用reactServer的`renderString`才能将组件渲染成html。服务器端无法理解前端代码中require端css文件，图片。

解决方法：

使用webpack对服务器端代码进行打包，对于css文件webpack配置为`ignore-loader`,忽略css。

对于图片文件，同样使用`url-loader`,配置成和客户端一样(经常会配置成小于多少k端图片转换成base64)


2. 对服务端代码进行了webpack打包，使其可以正常require css文件和图片，但开发过程中webpack实时打包，热刷新机制，
应该怎么样才能继续保留。 如果修改了一个客户端和服务器端都使用到的组件，客户端和服务器端都需要热加载。

解决方法：

**客户端**
开发过程中实时打包，我们依旧使用`webpack-dev-midddleware`和`webpack-hot-midddleware`。

**服务端**
当后端代码改变，我们同样需要重启后端，因为我们使用了webpack对后端代码进行打包，需要自己实现重启后端对工作。

**具体实现：**

webpack的compiler对象提供了watch模式，同时暴露出了打包过程中的事件钩子([详见文档](https://doc.webpack-china.org/api/compiler/))。

于是，我们监听后端webpack对compiler对象的重新打包事件和打包完成事件，分别销毁服务器和重启服务器，自己实现了后端的修改热刷新。
这里使用到到两个hook事件：
``` javascript
// 开始重新打包时，销毁现有到服务器对象
serverCompiler.plugin("compile", stats => {
});

// 打包完成，重新启动服务器
serverCompiler.plugin("done", stats => {
});
```

关键的一点，我们在这个项目中启动了两次webpack打包，一次对客户端，一次对后端。客户端至关重要的两个对象，`webpackDevMiddle`和`webpackHotMiddle`对象无论如何都不能销毁。

我们将后端webpack打包时，指定了`libriaryTarget`为`commonjs`,这里写个hook脚本，手动启动或者销毁服务器对象，在hook脚本中始终保存着`webpackDevMiddle`和`webpackHotMiddle`对象。

试想一下，不保留这两个middleware，那么服务器的重启都会导致客户端的重新打包，这是非常慢的过程。

工程中，这个只使用在开发环境的hook脚本在`dev`文件夹，也是`npm start`的入口。

通过对客户端和后端同时打包，保留了开发环境赖以生存的实时刷新机制。


