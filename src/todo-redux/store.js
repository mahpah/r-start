import { todoApp } from './reducers';
import { createStore } from 'redux';

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

const supportThenable = (store) => {
  const isThenable = thing => typeof thing.then === 'function';
  const next = store.dispatch;

  return action => {
    if (isThenable(action)) {
      return action.then(next);
    }

    return next();
  };
};

export const store = createStore(todoApp);
store.dispatch = addLog(store);
store.dispatch = supportThenable(store);
