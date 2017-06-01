var path = require('path');
var fs = require('fs');
var Koa = require('koa');
var koaRouter = require('koa-router');
var bodyParser = require('koa-bodyparser');
var webpack = require('webpack');
var devMiddleware = require('../plugin/devMiddleware');
var hotMiddleware = require('../plugin/hotMiddleware');
var webpackDevConfig = require('../config/webpack_client_dev.config.js');


var app = new Koa();
const router = new koaRouter();

var compiler = webpack(webpackDevConfig);

// process.env.NODE_ENV = "production";


let webpackDevOptions = {
    noInfo: false,
    publicPath: webpackDevConfig.output.publicPath,
    stats: {
        colors: true,
        hash: false
    }
};

app.use(bodyParser());

app.use(devMiddleware(compiler, webpackDevOptions));
app.use(hotMiddleware(compiler));


app.use(require('koa-static')(compiler.outputPath));

app.use(router.routes());


router.get('/', async (ctx, next) => {

    const filename = path.join(compiler.outputPath, "index.html");

    console.log("fffssss : ", filename);

    var result = await new Promise(function (resolve, reject) {
        compiler.outputFileSystem.readFile(filename, 'utf8' ,function (err, result) {
            if (err) {

                reject(err);
            }
            resolve(result)
        });
    })

    ctx.type = "html";
    ctx.body = result;
});


router.get('*', async (ctx, next) => {

    console.log(ctx.path,ctx.url);

    const filename = path.join(compiler.outputPath, ctx.path);

    console.log("fffssss : ", filename);

    var result = await new Promise(function (resolve, reject) {
        compiler.outputFileSystem.readFile(filename, 'utf8' ,function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result)
        });
    })

    ctx.type = "html";
    ctx.body = result;

    await next();


});

const port = 8087;
app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost:${8087}`);
});


