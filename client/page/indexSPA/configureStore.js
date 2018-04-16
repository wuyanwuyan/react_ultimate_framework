import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore(initialState = {}) {
    const middlewares = [ReduxThunk];

    let composeEnhancers = compose;
    if (__DEV__ && __CLIENT__) {
        middlewares.push(require('redux-immutable-state-invariant').default(), require('redux-logger').logger);

        if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
    }

    const storeEnhancers = composeEnhancers(
        applyMiddleware(...middlewares)
    );

    let store = createStore(rootReducer, initialState, storeEnhancers);
    return store;
}