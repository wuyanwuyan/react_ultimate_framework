import koaRouter from 'koa-router';
import userRouter from './users';
import {renderReactComp, renderHbs} from '../utils/serverRender';
// import Home from '../../client/page/home';
import Login from '../../client/page/login';


let router = new koaRouter();


//首页渲染
router.get('/', async (ctx) => {
    ctx.body = await renderHbs('home.hbs', {})
});


//登陆页面渲染
router.get('/login', async (ctx) => {

    ctx.body = await renderHbs('login.hbs', {
        content: renderReactComp(Login),
    })

});


router.get('/login/:word/page/:country', async (ctx) => {

    console.log('query： ', ctx.query);

    console.log('params: ', ctx.params);

    ctx.body = await renderHbs('login.hbs', {
        content: renderReactComp(Login),
    })

});

router.use(userRouter.routes());

export default router;