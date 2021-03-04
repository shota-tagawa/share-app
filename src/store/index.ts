import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from '../history'

import userReducer from './user';

const reducer = combineReducers({
  user: userReducer,
  router: connectRouter(history),
})

export type RootState = ReturnType<typeof reducer>

const store = configureStore({
  reducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(routerMiddleware(history))
  }
});

export default store;