const expressMiddleware = require('webpack-dev-middleware');

function middleware(doIt, req, res) {
    const {end: originalEnd} = res;

    return (done) => {
        res.end = function end() {
            originalEnd.apply(this, arguments);
            done(null, 0);
        };
        doIt(req, res, () => {
            done(null, 1);
        })
    };
}

module.exports = function(compiler, option){
    const expressMiddleware = expressMiddleware(compiler, option);

    function koaMiddleware(ctx, next) {

        // return next().then(function () {
        //     middleware(expressMiddleware, ctx.req, {
        //         end(content) {
        //             ctx.body = content;
        //         },
        //         setHeader() {
        //             ctx.set.apply(ctx, arguments);
        //         }
        //     });
        // });

        return async (ctx, next) => {
            await expressMiddleware(ctx.req, {
                end: (content) => {
                    ctx.body = content
                },
                setHeader: (name, value) => {
                    ctx.set(name, value)
                }
            }, next)
        }




    }

    Object.keys(expressMiddleware).forEach(function(p){
        koaMiddleware[p] = expressMiddleware[p];
    });

    return koaMiddleware;
};