import "../../css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {LocaleProvider} from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import {BrowserRouter, Route, StaticRouter, NavLink, Switch} from "react-router-dom";

import MainLayout from "../../layout/MainLayout";
import TopicListConnect from './TopicListConnect';
import {topic} from '../../constant/config';
import configureStore from './configureStore';
import '../index.css';

moment.locale('zh-cn');

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

class HomeSPA extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;
        return (
            <Router {...props}>
                <LocaleProvider locale={zhCN}>
                    <MainLayout>
                        <div className="topic-header">
                            {
                                Object.keys(topic).map((value) =>
                                    <NavLink key={value}
                                             to={`/indexSPA/${value}`}
                                             className='topic-tab'
                                             activeClassName='current-tab'
                                             exact>
                                        {topic[value]}
                                    </NavLink>)
                            }
                        </div>
                        <Switch>
                            <Route exact path="/indexSPA" component={TopicListConnect}/>
                            <Route path="/indexSPA/:topic" component={TopicListConnect}/>
                        </Switch>
                    </MainLayout>
                </LocaleProvider>
            </Router>
        );
    }
}

if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    const store = configureStore(initState);
    ReactDOM.hydrate(
        <Provider store={store}>
            <HomeSPA/>
        </Provider>,
        document.getElementById("react-container"));
}

export default HomeSPA;