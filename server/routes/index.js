import koaRouter from "koa-router";
import {renderHbs, renderReactComp} from "../utils/serverRender";
import Home from "../../client/page/index";
import {fetchGet} from '../../client/utils/fetchUtil';

let router = new koaRouter();

router.get(['/', '/:topic'], async (ctx) => {

    console.log(ctx.params.topic);
    let page = ctx.query.page || 1;

    const topic_list = await fetchGet('https://cnodejs.org/api/v1/topics', {tab: ctx.params.topic, page});

    let state = {
        location: ctx.url,
        context: {},
        topic_list,
        page
    };
    ctx.body = await renderHbs('home.hbs', {
        content: renderReactComp(Home, state),
        initialState: JSON.stringify(state),
    })
});

router.get(['/indexSPA', ''], async (ctx) => {

    ctx.body = await renderHbs('homeSPA.hbs')
});


export default router;