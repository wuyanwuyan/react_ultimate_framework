import koaRouter from "koa-router";
import {renderHbs, renderReactComp} from "../utils/serverRender";
import Home from "../../client/page/index";

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


router.get('/:topic', async (ctx) => {

    console.log(ctx.params.topic);

    ctx.body = await renderHbs('home.hbs', {
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



export default router;