import React from "react";
import "./downloadApp.css";

class DownloadApp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log('DownloadApp componentDidMount');
    }

    render() {
        return (
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

        );
    }
}

export default DownloadApp;