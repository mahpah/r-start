import { createStore, applyMiddleware } from 'redux';
import { todos } from './reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

/**
 * The function returned by another one called thunk
 */
// const thunk = (store) => next => action =>
//   typeof action === 'function' ?
//     action(next, store.getState) :
//     action;

const configStore = () => {
  const middlewares = [
    thunk,
    createLogger(),
  ];

  const store = createStore(
    todos,
    applyMiddleware(...middlewares)
  );

  return store;
};

export const store = configStore();
