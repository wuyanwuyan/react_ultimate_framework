import '../../css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import configureStore from '../../store/configureStore';
import IndexView from './indexView';

import {helloSaga} from './sagas';
import {reducer as todo} from './tableList';

const reducer = combineReducers({
    todo,
    a: (state = null) => state,
});


let store = configureStore(reducer, {});
store.runSaga(helloSaga);


if (__CLIENT__) {
    ReactDOM.render(
        <Provider store={store}>
            <IndexView/>
        </Provider>,
        document.getElementById("react-container")
    );
}