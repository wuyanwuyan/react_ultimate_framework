import koaRouter from 'koa-router';
import userRouter from './users';
import {renderReactComp, renderHbs} from '../utils/serverRender';
import Home from '../../client/page/home';
import Login from '../../client/page/login';


let router = new koaRouter();


//首页渲染
router.get('/', async (ctx) => {

    var initialState = JSON.stringify({"sate":[1,5,4]});
    ctx.type = 'html';
    ctx.body = await renderHbs('home.hbs', {
        content: renderReactComp(Home,initialState),
        users: '<script>alert("hello")</script>',
        initialState
    })

});


//登陆页面渲染
router.get('/login', async (ctx) => {
    var initialState = JSON.stringify({"sate":[1,5,4]});
    ctx.type = 'html';
    ctx.body = await renderHbs('login.hbs', {
        content: renderReactComp(Login,initialState),
        initialState
    })

});

router.use(userRouter.routes());

export default router;