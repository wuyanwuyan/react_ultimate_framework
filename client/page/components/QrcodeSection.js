import React from 'react';

export default class QrcodeSection extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <section className='section flex_center_v'>
                <img className='margin-right-sm' style={{width: '30%'}} src={require('../../assets/qrcode.jpg')}/>
                <h4 style={{color: '#999', fontSize: '2.2rem', lineHeight: 1.6,textAlign:'center'}}>
                    扫码添加微信<br/>币圈大牛带你飞
                </h4>
            </section>
        )
    }
}