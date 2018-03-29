import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const configureStore = (rootReducers) => {
    /* eslint-disable */
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    /* eslint-enable */
    const composeEnhancers = devTools || compose;

    const middlewares = [thunk];

    const store = createStore(
        rootReducers,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    return store;
};

export default configureStore;
