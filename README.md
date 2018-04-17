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
客户端配置很常见，主要是webpack配置，一个用于开发环境webpack_client_dev.config.js，一个用于生产环境webpack_client_production.config.js，支持webpack多页面配置，
把入口entry和生成html文件的html-webpack-plugin配置提取到webpack.common.config.js。

这里也把babel的配置都集中到babel.config.js，因为服务器端也需要用到，下面会讲到。

## 服务器端配置（关键）
web服务器采用了koa2框架。
