import React from 'react';

export default class QrcodeSection extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <section className='section flex_center_v'>
                <img className='margin-right-sm' style={{width: '30%'}} src="http://www.bitnews360.com/img/img2.jpg"/>
                <h4 style={{color: '#999', fontSize: '2.2rem', lineHeight: 1.6,textAlign:'center'}}>扫码下载币快讯APP<br/>领取<i
                    style={{color: '#6ea1fe'}}>500KNS</i>注册礼</h4>
            </section>
        )
    }
}