import React from 'react';
import {fetchPost} from "../../utils/fetchUtil";
import {trendFormat} from "../../utils/formatUtil";
import SimpleTab from '../../component/SimpleTab';
import LoadingEff from "../../component/LoadingEff";

export default class UpDown24h extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            coinPriceListUp: [],
            coinPriceListDown: [],
            isLoading: true,
        }
    }


    componentDidMount() {
        this._fetchData();
    }

    _fetchData = (type = 2, page = 1) => {
        this.setState({isLoading: true})
        fetchPost('/app/getCoinList', {type}, 'form').then(data => {
            data = JSON.parse(data);
            if (type == 2) {
                this.setState({coinPriceListUp: data.data.coinPriceList, isLoading: false});
            } else {
                this.setState({coinPriceListDown: data.data.coinPriceList, isLoading: false});
            }
        })
    }

    _onChangeTab = (tabIndex) => {
        this.setState({tabIndex}, () => {
            if (tabIndex === 1 && this.state.coinPriceListDown.length === 0) {
                this._fetchData(3);
            }
        });
    }

    render() {
        let listData = this.state.tabIndex === 0 ? this.state.coinPriceListUp : this.state.coinPriceListDown;
        return (
            <section className='section'>
                <div className='flex-space-between'>
                    <h3 style={{fontSize: '1.8rem'}} className='margin0'>24H涨跌榜</h3>
                    <SimpleTab onChange={this._onChangeTab}/>
                </div>
                <div className='margin-top-md'>
                    <table border="0" cellSpacing="0" cellPadding="0" className="tablist">
                        <tbody>
                        {
                            listData.map(v => {
                                let trendObj = trendFormat(v.percent_change_24h)
                                return (
                                    <tr key={v.coin_id}>
                                        <td className='td-coin-name'>{v.symbol}</td>
                                        <td>{`￥${v.price_cny}`}</td>
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
                    {this.state.isLoading && <LoadingEff/>}
                </div>

            </section>
        )
    }
}