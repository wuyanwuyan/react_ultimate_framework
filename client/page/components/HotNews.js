import React from 'react';
import {fetchPost} from "../../utils/fetchUtil";
import './HotNews.css';
import LoadingEff from '../../component/LoadingEff';

export default class HotNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            isLoading: true,
        }
    }


    componentDidMount() {

        this._fetchData();
    }

    _fetchData = (page = 1) => {
        this.setState({isLoading: true});
        fetchPost('/app/getNewsList', {limit: 100, page, userId: 0}, 'form').then(data => {
            data = JSON.parse(data);

            let newList = data.data.newsList.filter(v => v.isHot == '1')

            this.setState({newsList: this.state.newsList.concat(newList), page, isLoading: false});
        })
    }

    render() {

        const state = this.state;

        return (
            <section className='section'>
                <h3 style={{fontSize: '1.8rem'}} className='margin0'>热门快讯</h3>
                {
                    state.newsList.map((v, index) =>
                        <div key={v.newId} className='flex hot-news margin-vertical-md'>
                            <i className='hot-news-index margin-right-sm'>{index + 1}</i>
                            <p className='hot-news-title'>{v.title}</p>
                        </div>
                    )
                }
                {state.isLoading && <LoadingEff/>}
            </section>
        )
    }
}