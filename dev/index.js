require('source-map-support').install({environment: 'node', entryOnly: false}); // 让node支持source-map
const chalk = require('chalk');

const webpack = require('webpack');
const webpackServerDevConfig = require('../config/webpack_server_dev.config.js');
const webpackClientDevConfig = require('../config/webpack_client_dev.config.js');
const expressDevMiddleware = require('webpack-dev-middleware');
const expressHotMiddleware = require('webpack-hot-middleware');
const {destroyServer, restartServer} = require('./restartServer');

let clientCompiler = webpack(webpackClientDevConfig);

clientCompiler.plugin("compile", stats => {
    console.log(chalk.yellow("client compiling....  "));
});

clientCompiler.plugin('done', stats => {
    console.log(chalk.green("client compile done!"));
});

let webpackDevOptions = {
    // logLevel: 'warn',
    publicPath: webpackClientDevConfig.output.publicPath,
    stats: 'minimal',
    watchOptions: {
        aggregateTimeout: 400,   // client 重新编译要晚于server，这个数值要略大点
        poll: 1000,
        ignored: /node_modules/
    },
};

const devMidware = expressDevMiddleware(clientCompiler, webpackDevOptions);

const hotMidware = expressHotMiddleware(clientCompiler);

let serverCompiler = webpack(webpackServerDevConfig);

/*  使用compiler.watch 启动时也会compile ，不需要serverCompiler.run */
serverCompiler.watch({
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
}, (err, stats) => {
});

serverCompiler.plugin("compile", stats => {
    destroyServer(serverCompiler);
    console.log(chalk.yellow("server compiling....  "));
});

serverCompiler.plugin('done', stats => {
    console.log(chalk.blue("server compile done! "));
    restartServer(serverCompiler, devMidware, hotMidware)
});







