const path = require('path');
const Koa = require('koa');
const fs= require('fs');
const bodyParser = require('koa-bodyparser');

// process.env.NODE_ENV = "production";

const app = new Koa();

// dev
{
    const webpack = require('webpack');
    const webpackDevConfig = require('../config/webpack_client_dev.config.js');
    const e2k = require('express-to-koa')
    const expressDevMiddleware = require('webpack-dev-middleware');
    const expressHotMiddleware = require('webpack-hot-middleware');

    var clientCompiler = webpack(webpackDevConfig);

    clientCompiler.plugin('done', stats => {
        console.log("----- compiler.plugin done!");
    });

    let webpackDevOptions = {
        noInfo: false,
        publicPath: webpackDevConfig.output.publicPath,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        stats: {
            colors: true,
            hash: false
        }
    };

    app.use(e2k(expressDevMiddleware(clientCompiler, webpackDevOptions)));
    app.use(e2k(expressHotMiddleware(clientCompiler)));
}

app.use(bodyParser());

// server bundle
{
    const webpack = require('webpack');
    const webpackServerDevConfig = require('../config/webpack_server_dev.config.js');


    let serverCompiler = webpack(webpackServerDevConfig);

    serverCompiler.run((err, stats) => {
    })

    serverCompiler.watch({
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    }, (err, stats) => {
    });

    serverCompiler.plugin("compile", stats => {
        console.log("compiling....");
    });

    let requireCount = 0;
    serverCompiler.plugin('done', stats => {
        console.log("done !", requireCount);
        var bundlePath = path.join(serverCompiler.outputPath, "server.js");
        console.log("path :", bundlePath);

        


        var data = fs.readFileSync(bundlePath,'utf-8',function(err,data){
        });

        console.log("~~~~~~~~~~~~~~~~~~~~~~~ readFileSync file",data);

        // var hotEntry = require(bundlePath);
        //
        //
        // console.log("hotEntry",hotEntry);
        // hotEntry(app);
        requireCount++;

    });


    // require(path.join(process.cwd(), "server_dist/server.js"))(app);

}

{
    // require('./entry')(app);
}

// dev
{
    app.use(async (ctx, next) => {
        const filename = path.join(clientCompiler.outputPath, "index.html");
        let result = await new Promise(function (resolve, reject) {
            clientCompiler.outputFileSystem.readFile(filename, 'utf8', function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result)
            });
        })

        ctx.type = 'html';
        ctx.body = result;
    });
}


const port = process.env.PORT || 8087;
app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost:${port}`);
});


