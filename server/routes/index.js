import React from "react";
import koaRouter from "koa-router";
import {renderToString} from 'react-dom/server';
import {renderHbs} from "../utils/serverRender";

import {fetchPost} from "../../client/utils/fetchUtil";

let router = new koaRouter();


router.get(['/', '/:topic'], async (ctx) => {

    // console.log('hellooo ','now');
    //
    // const ret = await fetchPost('http://www.bitnews360.com/app/getCoinList', {limit: 5, page: 1, userId: 0}, 'form');
    //
    // console.log('ret   ', ret);

    ctx.body = await renderHbs('home.hbs')
});


export default router;