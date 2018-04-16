import React from 'react';
import {connect} from 'react-redux';
import TopicList from '../components/TopicList';
import {fetchTopicList} from './actions/topic';

class TopicListWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.dispatch(fetchTopicList(null,1));
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.topic !== this.props.match.params.topic){
            this.props.dispatch(fetchTopicList(nextProps.match.params.topic,1));
        }
    }

    _onChangePage = (page) => {
        this.props.dispatch(fetchTopicList(this.props.match.params.topic,page));
    }

    render() {
        const props = this.props;
        return <TopicList
            topic_list={props.topic_list}
            page={props.page}
            onChangePage={this._onChangePage}
        />
    }
}

function mapStateToProps(state) {
    return {
        topic_list: state.topic.topic_list,
        page: state.topic.page,
    }
}

function mapDispathToProps() {

}

export default connect(mapStateToProps)(TopicListWrapper);