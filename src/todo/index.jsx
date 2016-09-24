import { TodoApp } from './TodoApp';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import { Provider } from './Provider';

const host = document.getElementById('app-host');
if (!host) {
  throw new Error('Cannot attach app to DOM');
}

const render = () => ReactDOM.render(
  <Provider store={store} >
    <TodoApp />
  </Provider>,
  host
);

render();
