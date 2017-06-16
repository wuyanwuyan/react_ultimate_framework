import koaRouter from 'koa-router';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {renderToStaticMarkup} from 'react-dom/server'
import TestServer from '../../client/page/TestServer';

let userRouter = new koaRouter();

userRouter.get('/user', async (ctx) => {

    ctx.type = 'html';
    ctx.body = "user";
});


userRouter.get('/user/:id', async (ctx) => {

    var render = renderToString(<TestServer />);

    console.log(render);

    console.log("render static :",renderToStaticMarkup(<TestServer />));

    ctx.type = 'html';
    ctx.body = "user: " + ctx.params.id + render;
});



export default userRouter;