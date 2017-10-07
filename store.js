/* eslint-disable */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reduxPromise from 'redux-promise';

import rootReducer from './reducers';

export const initStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(reduxPromise)));
};
