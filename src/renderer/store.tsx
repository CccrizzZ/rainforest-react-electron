import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  forwardToMain,
  replayActionRenderer,
  getInitialStateRenderer,
} from 'electron-redux';

// const todoApp = combineReducers(reducers);
const initialState = getInitialStateRenderer();

// const store = configureStore(todoApp);
