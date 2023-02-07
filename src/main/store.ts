// in the main store
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  forwardToMainWithParams,
  replayActionRenderer,
  triggerAlias,
  replayActionMain,
  getInitialStateRenderer,
} from 'electron-redux';

const initialState = getInitialStateRenderer();
// const todoApp = combineReducers(reducers);

// const store = createStore(
//   todoApp,
//   initialstate,
//   applyMiddleware(
//     triggerAlias,
//     ...otherMiddlewares
//   ),
// );

// replayActionMain()
