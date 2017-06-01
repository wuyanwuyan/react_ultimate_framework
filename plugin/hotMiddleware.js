var hotMiddleware = require('webpack-hot-middleware');
var {PassThrough} = require('stream');

module.exports = function (compiler, opts) {
    const expressMiddleware = hotMiddleware(compiler, opts)
    return async function (ctx, next) {
        let stream = new PassThrough();
        ctx.body = stream;
        await expressMiddleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (status, headers) => {
                ctx.status = status
                ctx.set(headers)
            }
        }, next)
    }
}
