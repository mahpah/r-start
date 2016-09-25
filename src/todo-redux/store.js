import { todoApp } from './reducers';
import { createStore } from 'redux';
import { saveState, loadState } from '../lib/localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState() || undefined;

const addLog = (store) => {
  const origDispatch = store.dispatch;

  return (action) => {
    console.group(action.type);
    console.log('Before', store.getState());
    console.log('Action', action);
    const returnValue = origDispatch(action);
    console.log('After', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

export const store = createStore(todoApp, persistedState);
store.dispatch = addLog(store);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));
