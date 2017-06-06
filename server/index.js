var serverEntry = function (expressDevMiddleware, expressHotMiddleware) {

    const Koa = require('koa');
    const fs = require('fs');
    const bodyParser = require('koa-bodyparser');

    const app = new Koa();

    // error handle
    app.use(async function (ctx, next) {
        try {
            await next();
        } catch (e) {
            app.emit('error', e, ctx);
        }
    });

    if (process.env.NODE_ENV !== "production") {
        app.use(expressDevMiddleware);
        app.use(expressHotMiddleware);
    }

    if (process.env.NODE_ENV === "production") {
        app.use(require('koa-static')(__dirname +'/client'));
    }

    app.use(bodyParser());

    var indexRoute = require('./routes/index');
    app.use(indexRoute.routes());

    app.use(async (ctx) => {
        ctx.redirect("/");
    });

    const port = process.env.PORT || 8087;

    var server = require('http').createServer(app.callback());

    server.listen(port, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('✅ Listening at http://localhost:%s',port);
    });

    return server;

}

if (process.env.NODE_ENV === "production") {
    serverEntry();
}

module.exports = serverEntry;





