const koaRouter = require('koa-router');
let router = new koaRouter();
router.get('/fake', async (ctx) => {
    ctx.type = 'html';
    ctx.body = "fake";
});

module.exports = router;