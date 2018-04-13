import Koa from "koa";
import bodyParser from "koa-bodyparser";
import indexRoute from "./routes/index";
import http from "http";

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

    app.use(async (ctx) => {
        ctx.redirect("/");
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

