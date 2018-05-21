import React from 'react';
import './IndexView.css';
import {fetchPost} from '../../utils/fetchUtil';
import moment from 'moment';
import QrcodeSection from './QrcodeSection';
import HotNews from './HotNews';
import LoadingEff from '../../component/LoadingEff';

export default class IndexView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            page: 1,
            isLoading:true,
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData = (page = 1) => {
        this.setState({isLoading:true});
        fetchPost('/app/getNewsList', {limit: 5, page, userId: 0}, 'form').then(data => {
            data = JSON.parse(data);
            this.setState({newsList: this.state.newsList.concat(data.data.newsList), page,isLoading:false});
        })
    }


    _lookMore = () => {
        this._fetchData(this.state.page + 1);
    }

    render() {
        const state = this.state;
        return (
            <div className='flex'>
                <section className='section left margin-right'>
                    <img className='index-image' src={require('../../assets/1.png')} alt='banner'/>
                    <div className='flex_center_v margin-top-md'>
                        <div className="timel">
                            <h6>{`${moment().format('M')}月`}</h6>
                            <h5>{`${moment().format('D')}日`}</h5>
                        </div>
                        <div className="timez">
                            <h6>今天</h6>
                            <h5>星期*</h5>
                        </div>
                        <label className='time-label'>快讯</label>
                    </div>
                    <div style={{position: 'relative'}}>
                        <div className='news-timeline'></div>
                        {
                            state.newsList.map(v => {
                                return (
                                    <div className='flex news' key={v.newId}>
                                        <span className='news-time'>{moment(v.createTime).format('HH:mm')}</span>
                                        <div className='flex1'>
                                            <h3 className='news-title'>{v.title}</h3>
                                            <p className='news-content'>{v.content}</p>
                                            <div className='flex_center_v'>
                                                <i className='news-rate'>评分</i>
                                                <span className="star-grey margin-left-md">
                                                <span className="star-yellow"
                                                      style={{width: `${20 * v.level}%`}}></span>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {state.isLoading && <LoadingEff/>}
                    <button className="lookMore" onClick={this._lookMore}>查看更多</button>
                </section>

                <div>
                    <QrcodeSection/>
                    <HotNews/>
                </div>

            </div>


        )
    }
}