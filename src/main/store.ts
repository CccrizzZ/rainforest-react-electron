// in the main store
import { configureStore } from '@reduxjs/toolkit';
import {
  forwardToMainWithParams,
  replayActionRenderer,
  triggerAlias,
  replayActionMain,
  getInitialStateRenderer,
} from 'electron-redux';

const initialState = getInitialStateRenderer();

// const store = createStore(
//   todoApp,
//   initialstate,
//   applyMiddleware(
//     triggerAlias,
//     ...otherMiddlewares
//   ),
// );

// replayActionMain()
