import { todoApp } from './reducers';
import { createStore } from 'redux';

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

const applyMiddleware = (middlewares) => (str) =>
  middlewares.slice().reverse().forEach(m => {
    // eslint-disable-next-line no-param-reassign
    str.dispatch = m(str)(str.dispatch);
  });

const configStore = () => {
  const store = createStore(todoApp);
  const middlewares = [depromisify, logger];
  applyMiddleware(middlewares)(store);
  return store;
};

export const store = configStore();
