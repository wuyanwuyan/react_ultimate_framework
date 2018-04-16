import {REQUEST_TOPIC_LIST, RECEIVE_TOPIC_LIST} from "../actions/topic";

const defaultState = {
    topic_list: null,
    page: 0,
    tab: null,
}

export function topic(state = defaultState, action) {
    switch (action.type) {
        case REQUEST_TOPIC_LIST:
            return {
                topic_list:null,
                page:action.page,
                tab:action.tab,
            };
        case RECEIVE_TOPIC_LIST:
            return {
                ...state,
                topic_list:action.data
            };
        default:
            return state;
    }
}
