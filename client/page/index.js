import "../css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import "moment/locale/zh-cn";
import {BrowserRouter, Route, StaticRouter, NavLink, Switch} from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import {topic} from '../constant/config';
import "../css/reboot.css";
import './index.css';

import IndexView from './components/IndexView';
import RealTimeView from './components/RealTimeView';
import AboutUs from './components/AboutUs';

moment.locale('zh-cn');

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;

        return (
            <Router {...props}>
                <MainLayout>
                    <div className='main-wp'>
                        <Route exact path="/" component={IndexView}/>
                        <Route exact path="/realtime" component={RealTimeView}/>
                        <Route exact path="/about" component={AboutUs}/>
                    </div>
                </MainLayout>
            </Router>
        );
    }
}

if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.render(<Home {...initState}/>, document.getElementById("react-container"));
}

export default Home;