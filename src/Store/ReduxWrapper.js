import React from 'react';
import {Provider}  from 'react-redux';
// import { createStore as reduxCreateStore } from 'redux';
import {rootReducer} from './reducers';
//import thunk from 'redux-thunk';
import {createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store= createStore(rootReducer,applyMiddleware(thunk));

export default ({ element }) => (
  <Provider store={store}>{element}</Provider>
);