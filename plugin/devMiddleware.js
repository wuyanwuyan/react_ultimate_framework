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
    const doIt = expressMiddleware(compiler, option);


    return async (ctx, next) => {
        await doIt(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: (name, value) => {
                ctx.set(name, value)
            }
        }, async ()=>{
            await next();
        })
    }


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


    }

    Object.keys(doIt).forEach(function(p){
        koaMiddleware[p] = doIt[p];
    });

    return koaMiddleware;
};