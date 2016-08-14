import Component from './component';
import container from './container';
import reducers from './reducers';

export default {
    Component,
    container,
    Container: container(),
    combinedReducers: {
        main: reducers
    }
};
