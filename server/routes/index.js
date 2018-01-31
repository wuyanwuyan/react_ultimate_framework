import koaRouter from "koa-router";
import {renderHbs, renderReactComp} from "../utils/serverRender";
import Home from "../../client/page";
import scriptInline from '../../client/utils/responsiveCss';
import {isMobile} from '../../client/utils/common';

let router = new koaRouter();

router.use(async (ctx,next)=>{
    if(isMobile(ctx.request.headers['user-agent'] || "")){
        return ctx.body = await renderHbs('home_mobile.hbs', {
            scriptInline:scriptInline,
            htmlId:'mobile'
        });
    }
    await next();
})

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