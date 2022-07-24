import {createStore, applyMiddleware} from 'redux';

// middleware
import logger from 'redux-logger';
import thunk from 'redux-thunk';

//storage
import {allReducers} from './allReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const config = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
  whitelist: ['login'],
};

const persistedReducer = persistReducer(config, allReducers);

const allMiddlewares = applyMiddleware(logger, thunk);

export const store = createStore(persistedReducer, {}, allMiddlewares);

export const persistedStore = persistStore(store);
