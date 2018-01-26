import "../../css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import {LocaleProvider} from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import MainLayout from "../../layout/MainLayout";
import TrendTable from "../../component/TrendTable";
import News from "../../component/News";

import "../../css/reboot.css";
import {BrowserRouter} from "react-router-dom";
moment.locale('zh-cn');


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <LocaleProvider locale={zhCN}>
                    <MainLayout>
                        <div className="flex">
                            <div className="flex1" style={{marginRight: 20}}>
                                <TrendTable />
                            </div>
                            <div className="left-wrapper">
                                <News />
                            </div>
                        </div>
                    </MainLayout>
                </LocaleProvider>
            </BrowserRouter>
        );
    }
}

if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.render(<Home {...initState}/>, document.getElementById("react-container"));
}

export default Home;