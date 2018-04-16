import React from "react";
import koaRouter from "koa-router";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {renderToString} from 'react-dom/server';
import {renderHbs} from "../utils/serverRender";
import Home from "../../client/page/index";
import HomeSPA from "../../client/page/indexSPA";
import {fetchGet} from '../../client/utils/fetchUtil';
import rootReducer from '../../client/page/indexSPA/reducers';

let router = new koaRouter();

router.get(['/indexSPA', '/indexSPA/:topic'], async (ctx) => {

    let page = ctx.query.page || 1;

    const topic_list = await fetchGet('https://cnodejs.org/api/v1/topics', {tab: ctx.params.topic, page});

    let state = {
        topic:{
            topic_list,
            tab: ctx.params.topic,
            page,
        }
    };

    const store = createStore(rootReducer, state)

    ctx.body = await renderHbs('homeSPA.hbs', {
        content: renderToString(
            <Provider store={store}>
                <HomeSPA location={ctx.url} context={{}}/>
            </Provider>),
        initialState: JSON.stringify(state),
    })
});

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
        content: renderToString(<Home {...state} />),
        initialState: JSON.stringify(state),
    })
});


export default router;