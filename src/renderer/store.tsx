import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  forwardToMain,
  replayActionRenderer,
  getInitialStateRenderer,
} from 'electron-redux';

interface ActionA {
  type: string;
  a: string;
}

interface ActionB {
  type: string;
  b: string;
}

const initialState = getInitialStateRenderer();

type IAction = ActionA | ActionB;
const reducer = (state: number, action: IAction) => {
  switch (action.type) {
    case 'a':
      console.log('a');
      break;
    case 'b':
      console.log('b');
      break;
    default:
      break;
  }
};

const todoApp = combineReducers(reducer);
// const store = configureStore(todoApp);
// replayActionRenderer(store);
