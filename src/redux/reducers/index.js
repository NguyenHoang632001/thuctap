import { combineReducers } from 'redux';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { userReducer } from './userReducer';
import { appReducer } from './appReducer';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo', 'accessToken'],
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['isLoading'],
};

const reducers = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer)
});

export default (state, action) => reducers(state, action);