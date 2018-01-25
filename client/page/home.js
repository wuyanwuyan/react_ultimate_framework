import "../css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import {Input, LocaleProvider} from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import MainLayout from "../layout/MainLayout";

moment.locale('zh-cn');

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainLayout>
                <LocaleProvider locale={zhCN}>
                    <section className="section-wrapper">
                        <div>
                            <label>所有货币</label>
                            <Input.Search placeholder="input search text" onSearch={value => console.log(value)}
                                          enterButton/>
                        </div>
                    </section>
                </LocaleProvider>
            </MainLayout>
        );
    }
}

if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.hydrate(<Home {...initState}/>, document.getElementById("react-container"));
}

export default Home;