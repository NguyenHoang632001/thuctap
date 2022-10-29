import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import persistStore from 'redux-persist/es/persistStore';
import reducers from './reducers';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(reducers, applyMiddleware(...middleware));
export let persistor = persistStore(store);
export default store;