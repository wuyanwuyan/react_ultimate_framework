
import "../css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import MainLayout from "../layout/MainLayout";
import "../css/reboot.css";
import "./downloadApp.css";

class DownloadApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <MainLayout url={this.props.url} fullWidth={true}>
                    <section className="flex_center_vh download-section">
                        <section>
                            <h2>未来金融最灵敏的风向标</h2>
                            <h3>--CQCOIN</h3>

                            <section>
                                <img src={require('../assets/img/download_qrcode.jpg')} alt="qrcode" className="qrcode"/>
                                <div className="flex_center_vh btn">
                                    <img src={require('../assets/img/ios-logo.png')} alt="ios"/>
                                    iOS下载
                                </div>
                            </section>
                        </section>
                        <img src={require('../assets/img/download_phone.png')} alt="phone" width={500}/>
                    </section>

                </MainLayout>
        );
    }
}

if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.render(<DownloadApp {...initState}/>, document.getElementById("react-container"));
}

export default DownloadApp;