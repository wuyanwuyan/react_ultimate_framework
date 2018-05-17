import 'isomorphic-fetch';
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import indexRoute from "./routes/index";
import http from "http";
import proxy from "koa-proxies";

export default function serverEntry(devMiddleware, hotMiddleware, devMidware) {
    const app = new Koa();

    app.use(async function (ctx, next) { // error handle
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = err.message;
            ctx.app.emit('error', err, ctx);
        }
    });

    if (process.env.NODE_ENV !== "production") {
        app.use(devMiddleware);
        hotMiddleware && app.use(hotMiddleware);
        devMidware && require('./utils/serverRender').setCompiler(devMidware);
    }

    if (process.env.NODE_ENV === "production") {
        app.use(require('koa-static')(__dirname + '/client'));
    }

    app.use(bodyParser());

    app.use(indexRoute.routes());

    app.use(proxy('/fakeApi', {
        target: 'http://www.bitnews360.com',
        changeOrigin: true,
        rewrite: function(path){
            return path.replace(/^\/fakeApi/, 'http://www.bitnews360.com');
        },
        logs: __DEV__ ? true : false
    }));

    app.use(async (ctx) => {
        ctx.body = 404;
    });

    const port = process.env.PORT || 8087;

    var server = http.createServer(app.callback());

    server.listen(port, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('✅ Server start success! Listening at http://localhost:%s \n------------------------------------------------------------', port);
    });

    return server;
}

if (process.env.NODE_ENV === "production") {
    serverEntry();
}

