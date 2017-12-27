import koaRouter from 'koa-router';
import {renderReactComp, renderHbs} from '../utils/serverRender';
import Home from '../../client/page/home';
import Login from '../../client/page/login';


let router = new koaRouter();


//首页渲染
router.get('/', async (ctx) => {
    ctx.body = await renderHbs('home.hbs', {
        content: renderReactComp(Home),
    })
});


//登陆页面渲染
router.get('/login', async (ctx) => {
    ctx.body = await renderHbs('login.hbs', {
        content: renderReactComp(Login),
    })
});


router.get('/manager', async (ctx) => {
    ctx.body = await renderHbs('manager.hbs')
});


router.get('/bitChart', async (ctx) => {
    ctx.body = await renderHbs('bitChart.hbs');
});

export default router;