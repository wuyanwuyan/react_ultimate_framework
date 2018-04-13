import "../css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import {LocaleProvider} from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import {BrowserRouter, Route, StaticRouter,NavLink, Switch} from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import "../css/reboot.css";
import './index.css';

moment.locale('zh-cn');

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // ask share job good
        const topic = {
            all:'全部',
            good:'精华',
            share:'分享',
            ask:'问答',
            job:'招聘',
        }

        return (
            <Router {...this.props}>
                <LocaleProvider locale={zhCN}>
                    <MainLayout>
                        <div style={{marginRight:'30rem'}}>
                            <div className="topic-header">
                                {
                                    Object.keys(topic).map((value)=> <NavLink key={value} to={`/${value}`} className='topic-tab' activeClassName='current-tab' exact replace={true}>{topic[value]}</NavLink>)
                                }
                            </div>
                            <div>
                                <div className='topic_list'>
                                    <div className='cell'>

                                    </div>
                                </div>
                            </div>
                        </div>
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