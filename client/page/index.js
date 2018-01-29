import "../css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import {LocaleProvider} from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import {BrowserRouter, StaticRouter,Route} from "react-router-dom";


import MainLayout from "../layout/MainLayout";

import HomePage from './HomePage';
import DownloadApp from './DownloadApp';
import CoinInfo from './coinInfo';

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
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/coin/:coin" component={CoinInfo}/>
                        <Route exact path="/download" component={DownloadApp}/>
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

export default Home;