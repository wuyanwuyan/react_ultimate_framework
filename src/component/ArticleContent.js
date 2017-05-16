import React from 'react';
import moment from 'moment';
import 'simditor/styles/simditor.css';
export default class ArticleContent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {title,content,category,time} = this.props;
        return (
            <div className="article-plain-content">
                <h1>{title}</h1>
                <div>
                  <span>{moment(time).format('YYYY-MM-DD')}</span>
                    <span>{category}</span>
                </div>
                <div dangerouslySetInnerHTML={{__html:content}}>
                </div>

            </div>
        )
    }
}