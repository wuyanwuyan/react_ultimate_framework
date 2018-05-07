## 前言
用react开发了不少项目，大多数是客户端渲染。  
当涉及到资讯类，官网类的网站时，为了优化seo，必须使用react服务器渲染。  
于是查阅不少资料，总结一套自己觉得还不错的框架。  
说是框架，更像是一堆配置的集合。


## 特点
- 前后端分离，nodejs做中间层(这里的后端一般指提供api接口的后端，比如java后端)
- 支持webpack多页面多入口配置
- 支持react 服务器渲染，包含集成了redux的SPA页面服务器渲染
- live reload。修改客户端代码，浏览器自动刷新；修改服务器代码，自动reload。如果页面用到服务器渲染，修改前后端公共代码，将同时起作用
- 使用postCss，同时可支持服务器渲染+css modules
- 集成了ant-design UI，可以选择不用
- 所有的依赖均已经升级到最新版本(😅尴尬，这里webpack是3的版本，最新已经到4)

## 运行
``` shell
yarn install
yarn start
```
打开 http://localhost:8087   
或者 http://localhost:8087/indexSPA （单页面redux服务器渲染）

## 目录结构
```
├── client      客户端react代码
│   ├── assets  图片或字体资源文件夹
│   ├── component
│   ├── config
│   ├── constant
│   ├── css
│   ├── decorator
│   ├── default.hbs     项目中使用handlebars，来渲染模版，实际上只用了非常少的功能
│   ├── layout
│   ├── page            客户端多页面入口
│   └── utils
├── config      webpack配置文件夹
│   ├── babel.config.js     webpack的babel-loader配置提取到这个文件
│   ├── webpack.common.config.js    webpack的入口和生成html文件的配置提取到这个文件
│   ├── webpack_client_dev.config.js    开发环境，客户端webpack配置
│   ├── webpack_client_production.config.js 生产环境，客户端webpack配置
│   ├── webpack_server_dev.config.js        开发环境，node后端webpack配置
│   └── webpack_server_production.config.js     生产环境，node后端webpack配置
├── dev
│   ├── index.js        开发环境关键的启动脚本，npm start的入口
│   └── restartServer.js   实现对node server重启的功能，参考how to shutdown nodejs server
├── server
│   ├── index.js        服务器入口文件
│   ├── routes          路由
│   └── utils
├── ecosystem.config.js     发布部署的pm2配置，暂未使用
├── package.json
├── stats.generated.json    assets-webpack-plugin插件生成的webpack资源列表文件
└── yarn.lock               推荐使用yarn
```


## 客户端配置
客户端配置很常见，主要是webpack配置，一个用于开发环境`webpack_client_dev.config.js`，一个用于生产环境`webpack_client_production.config.js`，支持webpack多页面配置，
把入口entry和生成html文件的html-webpack-plugin配置提取到`webpack.common.config.js`。
``` javascript
const entry = {
    vendor: ['react', 'react-dom'],
    home: ['./client/page/index.js'],
    homeSPA: ['./client/page/indexSPA/index.js'],
};
```
这里也把babel-loader的option配置都集中到`babel.config.js`，因为服务器端也需要用到，下面会讲到。

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

### 服务器端渲染遇到的一些问题

#### 服务器同样需要引用客户端的组件，调用`react-dom/server`的`renderToString`才能将组件渲染成html。node端无法理解前端代码中require的css文件和图片。  

**解决方法：**  
使用webpack对服务器端代码进行打包。  
对于css文件webpack配置为`ignore-loader`,忽略css。  
对于图片文件，同样使用`url-loader`,配置成和客户端一样(经常会配置成小于多少k图片转换成base64)。  

需要注意的一些地方：  
1. 我们只对自己写的代码打包，node_modules里的安装模块不打包。但是如果引用的是前端组件库的代码，必须同样打包。 这里使用`webpack-node-externals`,防止webpack打包node_modules的代码。
``` javascript
target: 'node', // in order to ignore built-in modules like path, fs, etc.
externals: [nodeExternals({whitelist:[/^antd/]})], // in order to ignore all modules in node_modules folder,
```

#### 对服务端代码进行了webpack打包，使其可以正常require css文件和图片，但开发过程中怎么样才能继续保留webpack实时打包，热刷新机制？
**解决方法：**

**客户端**

开发过程中实时打包，我们依旧使用`webpack-dev-midddleware`和`webpack-hot-midddleware`，但要注意保证这两个对象不会因为服务器重启而被销毁。

**服务端（重点）**

当后端代码改变，我们同样需要重启后端，因为我们使用了webpack对后端代码进行打包，需要自己实现重启后端的工作。

**实现node服务器重启：**

（核心）webpack的compiler对象提供了watch模式，同时暴露出了打包过程中的事件钩子([详见文档](https://doc.webpack-china.org/api/compiler/))。

于是，我们监听后端webpack对compiler对象的重新打包事件和打包完成事件，分别销毁服务器和重启服务器，自己实现了后端的修改热刷新。
这里使用到到两个hook事件：
``` javascript
// webpack监听到代码改变，开始重新打包时，销毁现有的server对象
serverCompiler.plugin("compile", stats => {
    destroyServer(serverCompiler);
    console.log(chalk.yellow("server compiling....  "));
});

// 打包完成，重新启动服务器
serverCompiler.plugin('done', stats => {
    console.log(chalk.blue("server compile done! "));
    restartServer(serverCompiler, devMidware, hotMidware)
});
```
如何关闭http server，这里参考了stackoverflow上的一个答案 [shut down http server](https://stackoverflow.com/questions/14626636/how-do-i-shutdown-a-node-js-https-server-immediately)

关键的一点，我们在这个项目中启动了两次webpack打包，一个对客户端的`clientCompiler`，一个对后端的`serverCompiler`。客户端至关重要的两个对象，`webpackDevMiddle`和`webpackHotMiddle`对象无论如何都不能销毁。

我们将后端webpack打包时，指定了`libriaryTarget`为`commonjs`,这里写个hook脚本，手动启动或者销毁服务器对象，在hook脚本中始终保存着`webpackDevMiddle`和`webpackHotMiddle`对象。

试想一下，不保留这两个middleware，那么修改node端代码的每一次重启都会导致客户端的重新打包，这是非常慢的过程。

工程中，这个只使用在开发环境的hook脚本在`dev`文件夹，也是`npm start`的入口。

![](https://github.com/wuyanwuyan/react_ultimate_framework/raw/master/doc/flowImg.png)

## 服务器渲染的示例
服务器渲染的流程：
1. node端获取数据,作为服务器渲染 组件的props。
2. React服务端渲染HTML,放在和客户端渲染一样的标签位置
``` javascript
import {renderToString} from 'react-dom/server';
renderToString(<RootComponent {...props}/>)
```
``` handlebars
<body>
<div id="react-container">{{{renderContent}}}</div>
</body>
```
3. 脱水。服务端交给浏览器的不光要有HTML，还需要有“脱水数据”，也就是在服务端渲染过程中给React组件的输入数据。
“脱水数据”传递至浏览器的方式：
``` handlebars
<body>
<div id="react-container">{{{content}}}</div>
<script id="INITIAL_STATE">window.__INITIAL_STATE__ = {{{initialState}}}</script>
</body>
```
4. 注水。当浏览器渲染时可以直接根据“脱水数据”来渲染React组件，这个过程叫做“注水”。使用“脱水数据”就是为了保证两端数据一致，同时避免不必要的服务器请求。
``` javascript
if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.hydrate(<Home {...initState}/>, document.getElementById("react-container"));
}
```

工程例子里面使用到了一个cnode的api，[get /topics 主题首页](https://cnodejs.org/api)，实现服务器端渲染cnode端首页，以及包含使用了redux端单页面应用，如何实现react服务器渲染。
