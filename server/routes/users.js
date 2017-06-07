import koaRouter from 'koa-router';
let userRouter = new koaRouter();

userRouter.get('/user', async (ctx) => {

    ctx.type = 'html';
    ctx.body = "user";
});


userRouter.get('/user/:id', async (ctx) => {

    ctx.type = 'html';
    ctx.body = "user: " + ctx.params.id;
});



export default userRouter;