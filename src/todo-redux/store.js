import { createStore, applyMiddleware } from 'redux';
import { todos } from './reducers';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const configStore = () => {
  const middlewares = [
    promise,
    createLogger(),
  ];

  const store = createStore(
    todos,
    applyMiddleware(...middlewares)
  );

  return store;
};

export const store = configStore();
