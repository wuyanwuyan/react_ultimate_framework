require('source-map-support').install({environment: 'node', entryOnly: false}); // 让node支持source-map
const cluster = require('cluster');   // colorful console
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const webpack = require('webpack');
const webpackServerDevConfig = require('../config/webpack_server_dev.config.js');
const webpackClientDevConfig = require('../config/webpack_client_dev.config.js');
const c2k = require('koa2-connect'); // express middleware to koa2
const expressDevMiddleware = require('webpack-dev-middleware');
const expressHotMiddleware = require('webpack-hot-middleware');


let clientCompiler = webpack(webpackClientDevConfig);

clientCompiler.plugin("compile", stats => {
    console.log(chalk.yellow("client compiling....  "));
});

clientCompiler.plugin('done', stats => {
    console.log(chalk.green("client compile done!"));
});

let webpackDevOptions = {
    noInfo: true,// display no info to console (only warnings and errors)
    publicPath: webpackClientDevConfig.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    stats: {
        colors: true,
        hash: false
    },
    watchOptions: {
        aggregateTimeout: 400,   // client 重新编译要晚于server，这个数值要略大点
        poll: 1000,
        ignored: /node_modules/
    },
};

var devMidware = c2k(expressDevMiddleware(clientCompiler, webpackDevOptions));
var hotMidware = c2k(expressHotMiddleware(clientCompiler));

// var serverEntry = require('../server_dist/server').default;
// serverEntry(devMidware, hotMidware,clientCompiler);


let serverCompiler = webpack(webpackServerDevConfig);

/*  使用compiler.watch 启动时也会compile ，不需要serverCompiler.run */
serverCompiler.watch({
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
}, (err, stats) => {
});

var pipePromise = Promise.resolve();

serverCompiler.plugin("compile", stats => {
    pipePromise = destroyServer();
    console.log(chalk.yellow("server compiling....  "));
});

serverCompiler.plugin('done', stats => {
    console.log(chalk.blue("server compile done! "));
    pipePromise.then(() => {

        var bundlePath = path.join(serverCompiler.options.output.path, serverCompiler.options.output.filename);

        console.log("try require entry ?");

        var serverEntry = require(bundlePath).default;


        console.log("require entry done!");

        server = serverEntry(devMidware, hotMidware, clientCompiler);

        //参考 shut down http server  https://stackoverflow.com/questions/14626636/how-do-i-shutdown-a-node-js-https-server-immediately
        sockets = {}, nextSocketId = 0;
        server.on('connection', (socket) => {
            // Add a newly connected socket
            var socketId = nextSocketId++;
            sockets[socketId] = socket;

            // Remove the socket when it closes
            socket.on('close', () => {
                delete sockets[socketId];
            });

        });
    });
});

// Maintain a hash of all connected sockets
var server = null, sockets = {}, nextSocketId = 0;
var destroyServer = () => {
    return new Promise((resolve) => {

        // Make sure our newly built server bundles aren't in the module cache.
        Object.keys(require.cache).forEach((modulePath, index) => {
            if (modulePath.indexOf(serverCompiler.options.output.path) !== -1) {
                delete require.cache[modulePath];
            }
        });

        if (server) {
            // Destroy all open sockets
            for (var socketId in sockets) {
                sockets[socketId].destroy();
            }
            server.close(function () {
                console.log('Server destroyed!!!');
                server = null;
                resolve();
            });
        } else {
            resolve();
        }
    })
}







