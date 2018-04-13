import koaRouter from "koa-router";
import {renderHbs, renderReactComp} from "../utils/serverRender";
import Home from "../../client/page/index";
import {fetchGet} from '../../client/utils/fetchUtil';

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


    const topic_list = await fetchGet('https://cnodejs.org/api/v1/topics',{tab:ctx.params.topic});

    ctx.body = await renderHbs('home.hbs', {
        content: renderReactComp(Home, {
            location: ctx.url,
            context: {},
            topic_list
        }),
        initialState: JSON.stringify({topic_list}),
    })
});


export default router;