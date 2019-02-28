import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from './app/reducers/index';

const store = function configureStore(initialState = {}) {

    const middlewares = [
        thunk
    ];

    const enhancers = [
        applyMiddleware(...middlewares)
    ];

    if (process.env.NODE_ENV !== 'production') {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middlewares))
    );

    store.asyncReducers = {};

    return store;
};

export default store;
