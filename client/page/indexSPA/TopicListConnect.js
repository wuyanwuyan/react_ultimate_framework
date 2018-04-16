import React from 'react';
import {connect} from 'react-redux';
import TopicList from '../components/TopicList';


function mapStateToProps(state) {
    return {
        topic_list:state.topic_list
    }
}

export default connect(mapStateToProps)(TopicList);