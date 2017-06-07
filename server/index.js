import Koa from 'koa';
import fs from 'fs';
import Handlebars from 'handlebars';
import bodyParser from 'koa-bodyparser';
import indexRoute  from './routes/index';
import http from 'http';

export default function serverEntry(expressDevMiddleware, expressHotMiddleware) {

    const app = new Koa();

    // error handle
    app.use(async function (ctx, next) {
        try {
            await next();
        } catch (e) {
            app.emit('error', e, ctx);
        }
    });


    app.use(async function (ctx, next) {
        var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
            "{{kids.length}} kids:</p>" +
            "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
        var template = Handlebars.compile(source);

        var data = { "name": "Alan", "hometown": "Somewhere, TX",
            "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
        var result = template(data);

        console.log("result: ",result);

        await next();

    })


    if (process.env.NODE_ENV !== "production") {
        app.use(expressDevMiddleware);
        app.use(expressHotMiddleware);
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
            console.log(err);
            return;
        }
        console.log('✅ Listening at http://localhost:%s', port);
    });

    return server;

}

if (process.env.NODE_ENV === "production") {
    serverEntry();
}
