import "../css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import {LocaleProvider, Pagination} from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import {BrowserRouter, Route, StaticRouter, NavLink, Switch} from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import TopicList from './components/TopicList';
import {topic} from '../constant/config';
import "../css/reboot.css";
import './index.css';

moment.locale('zh-cn');

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

// ask share job good

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;

        return (
            <Router {...props}>
                <LocaleProvider locale={zhCN}>
                    <MainLayout>
                        <div style={{marginRight: '30rem'}}>
                            <div className="topic-header">
                                {
                                    Object.keys(topic).map((value) =>
                                        <NavLink key={value}
                                                 to={`/${value}`}
                                                 className='topic-tab'
                                                 activeClassName='current-tab'
                                                 exact>
                                            {topic[value]}
                                        </NavLink>)
                                }
                            </div>
                            <TopicList {...props}/>

                        </div>
                    </MainLayout>
                </LocaleProvider>
            </Router>
        );
    }
}

if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.hydrate(<Home {...initState}/>, document.getElementById("react-container"));
}

export default Home;