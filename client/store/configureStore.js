import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';


export default function configureStore(rootReducer, initialState = {}) {

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(require('redux-immutable-state-invariant').default());
    }
    const storeEnhancers = compose(
        applyMiddleware(...middlewares),
        (window && window.devToolsExtension) ? window.devToolsExtension() : f => f,
    );


    let store = createStore(rootReducer, initialState, storeEnhancers);
    store.runSaga = sagaMiddleware.run;
    return store;
}