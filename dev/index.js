require('source-map-support').install({environment: 'node'}); // 让node支持source-map
const cluster = require('cluster');
const path = require('path');
const fs = require('fs');

// process.env.NODE_ENV = "production";

const webpack = require('webpack');
const webpackDevConfig = require('../config/webpack_client_dev.config.js');
const e2k = require('express-to-koa')
const expressDevMiddleware = require('webpack-dev-middleware');
const expressHotMiddleware = require('webpack-hot-middleware');

var clientCompiler = webpack(webpackDevConfig);

clientCompiler.plugin('done', stats => {
    console.log("client compile done!");
});

let webpackDevOptions = {
    noInfo: true,// display no info to console (only warnings and errors)
    publicPath: webpackDevConfig.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    stats: {
        colors: true,
        hash: false
    }
};

var devMidware = e2k(expressDevMiddleware(clientCompiler, webpackDevOptions));
var hotMidware = e2k(expressHotMiddleware(clientCompiler));


const webpackServerDevConfig = require('../config/webpack_server_dev.config.js');
let serverCompiler = webpack(webpackServerDevConfig);


/*  使用compiler.watch 启动时也会compile ，不需要serverCompiler.run */
serverCompiler.watch({
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
}, (err, stats) => {
});

serverCompiler.plugin("compile", stats => {
    console.log("compiling....  ");
});

serverCompiler.plugin('done', stats => {
    console.log("server compile done! ");
    requireManual().then(() => {
        // Make sure our newly built server bundles aren't in the module cache.
        Object.keys(require.cache).forEach((modulePath, index) => {
            if (modulePath.indexOf(serverCompiler.options.output.path) !== -1) {
                delete require.cache[modulePath];
            }
        });


        var bundlePath = path.join(serverCompiler.options.output.path, serverCompiler.options.output.filename);

        var serverEntry = require(bundlePath).default;


        console.log("require entry done!!!");
        server = serverEntry(devMidware, hotMidware);

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
var requireManual = () => {
    return new Promise((resolve)=>{
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





