// var webpackHotMiddleware = require('webpack-hot-middleware');
// var {PassThrough} = require('stream');
//
// function middleware(doIt, req, res) {
//     const {end: originalEnd} = res;
//
//     return (done) => {
//         res.end = function end() {
//             originalEnd.apply(this, arguments);
//             done(null, 0);
//         };
//         doIt(req, res, () => {
//             done(null, 1);
//         })
//     };
// }
//
//
// module.exports = function (compiler, opts) {
//     const expressMiddleware = webpackHotMiddleware(compiler, opts)
//     return async function (ctx, next) {
//         let stream = new PassThrough();
//         ctx.body = stream;
//         await expressMiddleware(ctx.req, {
//             write: stream.write.bind(stream),
//             writeHead: (status, headers) => {
//                 ctx.status = status
//                 ctx.set(headers)
//             }
//         }, next)
//     }
// }

var webpackHotMiddleware = require('webpack-hot-middleware');

function middleware(doIt, req, res) {
    var originalEnd = res.end;
    return function (done) {
        res.end = function () {
            originalEnd.apply(this, arguments);
            done(null, 0);
        };
        doIt(req, res, function () {
            done(null, 1);
        });
    };
}

module.exports = function (compiler, option) {
    var doIt = webpackHotMiddleware(compiler, option);

    function koaMiddleware(ctx, next) {
        const req = ctx.req;

        return next().then(function () {
            middleware(doIt, req, {
                end(content) {
                    ctx.body = content;
                },
                setHeader() {
                    ctx.set.apply(ctx, arguments);
                }
            });
        });
    }

    return koaMiddleware;
};
