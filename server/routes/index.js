import koaRouter from 'koa-router';
import {renderReactComp, renderHbs} from '../utils/serverRender';
import Login from '../../client/page/login';
import DownloadApp from '../../client/page/DownloadApp';


let router = new koaRouter();


//首页渲染
router.get('/', async (ctx) => {
    ctx.body = await renderHbs('home.hbs', {
    })
});


//下载app
router.get('/download', async (ctx) => {
    ctx.body = await renderHbs('download.hbs', {
        content:renderReactComp(DownloadApp,{url:ctx.request.path})
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