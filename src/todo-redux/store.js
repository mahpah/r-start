import { todoApp } from './reducers';
import { createStore } from 'redux';
import { saveState, loadState } from '../lib/localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState() || undefined;

export const store = createStore(todoApp, persistedState);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));
