import koaRouter from 'koa-router';
import userRouter from './users';
let router = new koaRouter();

router.get('/fake', async (ctx) => {

    console.log("fake ctx :" ,ctx.url);
    ctx.type = 'html';
    ctx.body = "11fake ff ll222l";
});


router.get('/utm', async (ctx) => {

    ctx.type = 'html';
    ctx.body = "utm";
});

router.use(userRouter.routes());

export default router;