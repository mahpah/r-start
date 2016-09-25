import { todoApp } from './reducers';
import { createStore } from 'redux';
import { applyMiddleware } from '../lib/redux';

const logger = (store) => (next) => {
  /* eslint-disable no-console */
  if (!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log('Before', store.getState());
    console.log('Action', action);
    const returnValue = next(action);
    console.log('After', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-enable no-console */
};

const depromisify = () => next => action => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }

  return next(action);
};

const configStore = () => {
  const store = createStore(todoApp);
  const middlewares = [depromisify, logger];
  applyMiddleware(middlewares)(store);
  return store;
};

export const store = configStore();
