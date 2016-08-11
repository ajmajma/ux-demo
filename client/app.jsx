import immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    applyMiddleware,
    createStore,
    compose
} from 'redux';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux-immutable';
import createLogger from 'redux-logger';

import uxDemo from './ux-demo';

// extend middlewares here
const middlewares = [];

function stateTransformer(state) {
    return state.toJS();
}

// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
        duration: true,
        timestamp: true,
        stateTransformer
    });

    middlewares.push(logger);
}

const composed = [applyMiddleware(...middlewares)];

const reducers = combineReducers({
    ...uxDemo.reducers,

});

const enhancer = compose(...composed);
const store = createStore(reducers, immutable.Map(), enhancer);


ReactDOM.render(
    <Provider store={store}>
        <div>
            <uxDemo.Container
                />
        </div>
    </Provider>,
    // eslint-disable-next-line no-undef
    document.getElementById('app')
);
