import {fetchGet} from "../../../utils/fetchUtil";


export const REQUEST_TOPIC_LIST = Symbol('REQUEST_TOPIC_LIST');
export const RECEIVE_TOPIC_LIST = Symbol('RECEIVE_TOPIC_LIST');


export const fetchTopicList = (tab, page) => (dispatch, getState) => {
    dispatch({
        type: REQUEST_TOPIC_LIST,
        tab,
        page
    });


    fetchGet('https://cnodejs.org/api/v1/topics', {tab, page}).then(data => {
        dispatch({
            type: RECEIVE_TOPIC_LIST,
            data,
        })
    });

};