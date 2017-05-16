import React from 'react';
import moment from 'moment';

export default class ArticleContent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {title, content, category, time} = this.props;
        return (
            <div className="article-plain-content section-wrapper">
                <div className="article-title">
                    <h1>{title}</h1>
                    <div className="article-more-info">
                        <span>{moment(time).format('YYYY-MM-DD')}</span>
                        <span>{category}</span>
                    </div>
                </div>
                <div className="simditor">
                    <div className="simditor-body" dangerouslySetInnerHTML={{__html: content}}>
                    </div>
                </div>
            </div>
        )
    }
}