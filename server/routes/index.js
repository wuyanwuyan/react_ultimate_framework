import koaRouter from "koa-router";
import {renderHbs, renderReactComp} from "../utils/serverRender";
import Home from "../../client/page";

let router = new koaRouter();

//首页渲染
router.get('/', async (ctx) => {
    ctx.body = await renderHbs('home.hbs', {
        content: renderReactComp(Home, {
            location: ctx.url,
            context: {}
        }),
    })
});


router.get('/coin/:coin', async (ctx) => {
    ctx.body = await renderHbs('home.hbs')
});

//下载app
router.get('/download', async (ctx) => {
    ctx.body = await renderHbs('home.hbs', {
        rootClass:'download',
        content: renderReactComp(Home, {
            location: ctx.url,
            context: {}
        }),
    })
});


// //登陆页面渲染
// router.get('/login', async (ctx) => {
//     ctx.body = await renderHbs('login.hbs', {
//         content: renderReactComp(Login),
//     })
// });


// router.get('/manager', async (ctx) => {
//     ctx.body = await renderHbs('manager.hbs')
// });


router.get('/bitChart', async (ctx) => {
    ctx.body = await renderHbs('bitChart.hbs');
});

export default router;