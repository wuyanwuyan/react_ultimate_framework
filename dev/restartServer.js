// 这个模块只完成一件事，销毁server，重启server
const chalk = require('chalk');
const path = require('path');
const c2k = require('koa2-connect'); // express middleware to koa2

let pipePromise = Promise.resolve();

// Maintain a hash of all connected sockets
let server = null, sockets = {}, nextSocketId = 0;

function destroyServerAsync(serverCompiler) {
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

exports.destroyServer = function (serverCompiler) {
    pipePromise = pipePromise.then(() => {
        return destroyServerAsync(serverCompiler);
    });
}

exports.restartServer = function (serverCompiler, devMidware, hotMidware) {
    pipePromise.then(() => {

        var bundlePath = path.join(serverCompiler.options.output.path, serverCompiler.options.output.filename);

        console.log("try require server entry ?");

        let serverEntry;

        try {
            serverEntry = require(bundlePath).default;
            server = serverEntry(c2k(devMidware), c2k(hotMidware), devMidware);
            console.log("require server entry done!");
        } catch (e) {
            console.log(chalk.red('require server entry error: '));
            console.error(e);
        }

        //参考 shut down http server  https://stackoverflow.com/questions/14626636/how-do-i-shutdown-a-node-js-https-server-immediately
        sockets = {}, nextSocketId = 0;
        server && server.on('connection', (socket) => {
            // Add a newly connected socket
            var socketId = nextSocketId++;
            sockets[socketId] = socket;

            // Remove the socket when it closes
            socket.on('close', () => {
                delete sockets[socketId];
            });

        });
    });
}