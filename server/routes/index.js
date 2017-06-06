const koaRouter = require('koa-router');
let router = new koaRouter();

console.log("require index router2222222!");

router.get('/fake', async (ctx) => {

    console.log("fake ctx :" ,ctx.url);
    ctx.type = 'html';
    ctx.body = "11fake ff ll222l";
});


router.get('/utm', async (ctx) => {

    ctx.type = 'html';
    ctx.body = "utm";
});

module.exports = router;