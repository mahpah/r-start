import { createStore, applyMiddleware } from 'redux';
import { todoApp } from './reducers';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const configStore = () => {
  const middlewares = [
    promise,
    createLogger(),
  ];

  const store = createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );

  return store;
};

export const store = configStore();
