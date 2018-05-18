import React from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './RealTimeView.css';
import {fetchPost} from "../../utils/fetchUtil";
import {trendFormat} from "../../utils/formatUtil";
import QrcodeSection from './QrcodeSection';
import UpDown24h from './UpDown24h';
import LoadingEff from '../../component/LoadingEff';


export default class RealTimeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coinPriceList: [],
            isLoading:true,
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData = (page = 1) => {
        this.setState({isLoading:true});
        fetchPost('/app/getCoinList', {type: 1}, 'form').then(data => {
            data = JSON.parse(data);

            this.setState({coinPriceList: this.state.coinPriceList.concat(data.data.coinPriceList), page,isLoading:false});
        })
    }

    render() {
        const state = this.state;

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
        };

        const slickContent = [
            {
                src: require('../../assets/1.png')
            },
            {
                src: require('../../assets/2.png')
            },
            {
                src: require('../../assets/3.png')
            },
        ]

        return (
            <div className='flex'>
                <section className='section left margin-right'>
                    <Slider {...settings}>
                        {
                            slickContent.map((v, index) =>
                                <div className='slider-item' key={index}>
                                    <a className='slider-item-a'>
                                        <img src={v.src} alt='slider'/>
                                    </a>
                                </div>
                            )
                        }
                    </Slider>
                    <div className='margin-top-md'>
                        <table border="0" cellSpacing="0" cellPadding="0" className="tablist">
                            <thead>
                            <tr>
                                <th>名称</th>
                                <th>简写</th>
                                <th>价格</th>
                                <th>市值</th>
                                <th>24H交易量</th>
                                <th>24H百分比</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                state.coinPriceList.map(v => {
                                    let trendObj = trendFormat(v.percent_change_24h)
                                    return (
                                        <tr key={v.coin_id}>
                                            <td className='td-coin-name'>{v.coin_name}</td>
                                            <td>{v.symbol}</td>
                                            <td>{`￥${v.price_cny}`}</td>
                                            <td>{`￥${v.market_cap_cny}`}</td>
                                            <td>{`￥${v.volume_cny_24h}`}</td>
                                            <td>
                                                <button className='trend'
                                                        style={{backgroundColor: trendObj.color}}>{trendObj.txt}</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        {state.isLoading && <LoadingEff/>}
                    </div>
                </section>

                <div>
                    <QrcodeSection/>
                    <UpDown24h/>
                </div>
            </div>
        )
    }
}