const koaRouter = require('koa-router');
let router = new koaRouter();

console.log("require index router2222222!");

router.get('/fake', async (ctx) => {

    console.log("fake ctx :" ,ctx.url);
    ctx.type = 'html';
    ctx.body = "11fake ff ll222l";
});

module.exports = router;