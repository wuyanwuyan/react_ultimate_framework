import "../css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import {LocaleProvider} from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import {BrowserRouter, Route, StaticRouter, Switch} from "react-router-dom";


import MainLayout from "../layout/MainLayout";

import HomePage from "./HomePage";
import DownloadApp from "./DownloadApp";
import CoinInfo from "./coinInfo/index";
import News from "./component/News";
import PageNotFound from "./PageNotFound";
import RegisterPage from "./RegisterPage";

import "../css/reboot.css";

moment.locale('zh-cn');


const Router = __CLIENT__ ? BrowserRouter : StaticRouter;


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router {...this.props}>
                <LocaleProvider locale={zhCN}>
                    <MainLayout>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/news" component={News}/>
                            <Route exact path="/coin/:coin" component={CoinInfo}/>
                            <Route exact path="/download" component={DownloadApp}/>
                            <Route exact path="/register" component={RegisterPage}/>
                            <Route component={PageNotFound}/>
                        </Switch>
                    </MainLayout>
                </LocaleProvider>
            </Router>
        );
    }
}

if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.render(<Home {...initState}/>, document.getElementById("react-container"));
}


console.log(__DEV__, __CLIENT__, __MOBILE__);

export default Home;